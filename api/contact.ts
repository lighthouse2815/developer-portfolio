import { neon } from '@neondatabase/serverless'
import { Resend } from 'resend'
import type { ContactApiResponse, ContactLeadPayload } from '../src/types/contact'
import type { Locale } from '../src/types/portfolio'

type LeadRow = {
  id: number
}

type DeliveryStatus = 'pending' | 'sent' | 'failed'

type NormalizedLeadPayload = {
  name: string
  email: string
  message: string
  locale: Locale
  sourceUrl: string | null
  company: string
}

type RuntimeConfig = {
  databaseUrl: string
  resendApiKey: string
  leadFromEmail: string
  leadToEmail: string
  leadReplyEnabled: boolean
}

const jsonHeaders = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
}

function jsonResponse(body: ContactApiResponse, init: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...(init.headers ?? {}),
    },
  })
}

function getRuntimeConfig(): RuntimeConfig {
  const databaseUrl = process.env.DATABASE_URL
  const resendApiKey = process.env.RESEND_API_KEY
  const leadFromEmail = process.env.LEAD_FROM_EMAIL
  const leadToEmail = process.env.LEAD_TO_EMAIL

  if (!databaseUrl || !resendApiKey || !leadFromEmail || !leadToEmail) {
    throw new Error('Missing required contact endpoint environment variables')
  }

  return {
    databaseUrl,
    resendApiKey,
    leadFromEmail,
    leadToEmail,
    leadReplyEnabled: process.env.LEAD_REPLY_ENABLED !== 'false',
  }
}

function normalizePayload(payload: ContactLeadPayload): NormalizedLeadPayload | null {
  const name = payload.name?.trim()
  const email = payload.email?.trim().toLowerCase()
  const message = payload.message?.trim()
  const locale = payload.locale === 'en' ? 'en' : payload.locale === 'vi' ? 'vi' : null
  const sourceUrl = payload.sourceUrl?.trim()
  const company = payload.company?.trim() ?? ''

  if (!name || !email || !message || !locale) {
    return null
  }

  if (name.length < 2 || name.length > 120) {
    return null
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    return null
  }

  if (message.length < 16 || message.length > 5000) {
    return null
  }

  if (sourceUrl && sourceUrl.length > 2048) {
    return null
  }

  if (company.length > 240) {
    return null
  }

  return {
    name,
    email,
    message,
    locale,
    sourceUrl: sourceUrl || null,
    company,
  }
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const connecting = request.headers.get('cf-connecting-ip')
  const realIp = request.headers.get('x-real-ip')
  const rawIp = forwarded?.split(',')[0]?.trim() || connecting?.trim() || realIp?.trim() || null

  return rawIp && rawIp.length <= 80 ? rawIp : null
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin')

  if (!origin) {
    return true
  }

  try {
    const originUrl = new URL(origin)
    const requestUrl = new URL(request.url)
    return originUrl.host === requestUrl.host
  } catch {
    return false
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatSubmittedAt(locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date())
}

function buildOwnerEmail(payload: NormalizedLeadPayload) {
  const submittedAt = formatSubmittedAt(payload.locale)

  return {
    subject: `[Portfolio] New contact lead from ${payload.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2 style="margin:0 0 16px">New portfolio lead</h2>
        <p style="margin:0 0 12px"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p style="margin:0 0 12px"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p style="margin:0 0 12px"><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
        <p style="margin:0 0 12px"><strong>Source URL:</strong> ${escapeHtml(payload.sourceUrl ?? 'N/A')}</p>
        <p style="margin:16px 0 8px"><strong>Message</strong></p>
        <div style="padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(payload.message)}</div>
      </div>
    `,
  }
}

function buildVisitorReply(payload: NormalizedLeadPayload) {
  if (payload.locale === 'vi') {
    return {
      subject: 'Da nhan thong tin tu portfolio cua Duong',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2 style="margin:0 0 16px">Cam on ban da lien he</h2>
          <p style="margin:0 0 12px">Duong da nhan duoc thong tin cua ban va se phan hoi som nhat co the.</p>
          <p style="margin:0 0 12px"><strong>Noi dung ban gui:</strong></p>
          <div style="padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(payload.message)}</div>
        </div>
      `,
    }
  }

  return {
    subject: 'Duong received your message',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2 style="margin:0 0 16px">Thanks for reaching out</h2>
        <p style="margin:0 0 12px">Duong has received your message and will get back to you as soon as possible.</p>
        <p style="margin:0 0 12px"><strong>Your message:</strong></p>
        <div style="padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(payload.message)}</div>
      </div>
    `,
  }
}

async function ensureTable(sql: any) {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      locale TEXT NOT NULL,
      source_url TEXT,
      ip_address TEXT,
      user_agent TEXT,
      spam_trap TEXT,
      rejected_reason TEXT,
      delivery_status TEXT NOT NULL DEFAULT 'pending',
      owner_email_id TEXT,
      reply_email_id TEXT,
      delivery_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notified_at TIMESTAMPTZ
    )
  `

  await sql`ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS ip_address TEXT`
  await sql`ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS spam_trap TEXT`
  await sql`ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS rejected_reason TEXT`
  await sql`
    CREATE INDEX IF NOT EXISTS contact_leads_ip_created_at_idx
    ON contact_leads (ip_address, created_at DESC)
  `
  await sql`
    CREATE INDEX IF NOT EXISTS contact_leads_email_created_at_idx
    ON contact_leads (email, created_at DESC)
  `
}

async function isRateLimited(sql: any, email: string, ipAddress: string | null) {
  const rows = (await sql`
    SELECT
      COALESCE(SUM(
        CASE
          WHEN ${ipAddress} IS NOT NULL
            AND ip_address = ${ipAddress}
            AND created_at > NOW() - INTERVAL '10 minutes'
          THEN 1
          ELSE 0
        END
      ), 0)::int AS ip_hits_10m,
      COALESCE(SUM(
        CASE
          WHEN email = ${email}
            AND created_at > NOW() - INTERVAL '30 minutes'
          THEN 1
          ELSE 0
        END
      ), 0)::int AS email_hits_30m
    FROM contact_leads
    WHERE created_at > NOW() - INTERVAL '30 minutes'
      AND (
        email = ${email}
        OR (${ipAddress} IS NOT NULL AND ip_address = ${ipAddress})
      )
  `) as Array<{ ip_hits_10m: number | string; email_hits_30m: number | string }>

  const summary = rows[0] ?? { ip_hits_10m: 0, email_hits_30m: 0 }
  return Number(summary.ip_hits_10m) >= 4 || Number(summary.email_hits_30m) >= 3
}

async function saveLead(
  sql: any,
  payload: NormalizedLeadPayload,
  userAgent: string | null,
  ipAddress: string | null,
) {
  const insertedRows = (await sql`
    INSERT INTO contact_leads (
      name,
      email,
      message,
      locale,
      source_url,
      ip_address,
      user_agent,
      spam_trap
    ) VALUES (
      ${payload.name},
      ${payload.email},
      ${payload.message},
      ${payload.locale},
      ${payload.sourceUrl},
      ${ipAddress},
      ${userAgent},
      ${payload.company || null}
    )
    RETURNING id
  `) as LeadRow[]

  const lead = insertedRows[0]
  return lead.id
}

async function updateLeadDelivery(
  sql: any,
  leadId: number,
  deliveryStatus: DeliveryStatus,
  ownerEmailId: string | null,
  replyEmailId: string | null,
  deliveryError: string | null,
) {
  await sql`
    UPDATE contact_leads
    SET
      delivery_status = ${deliveryStatus},
      owner_email_id = ${ownerEmailId},
      reply_email_id = ${replyEmailId},
      delivery_error = ${deliveryError},
      notified_at = CASE
        WHEN ${deliveryStatus} = 'sent' THEN NOW()
        ELSE notified_at
      END
    WHERE id = ${leadId}
  `
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ ok: false, code: 'origin_not_allowed' }, { status: 403 })
  }

  let payload: ContactLeadPayload

  try {
    payload = (await request.json()) as ContactLeadPayload
  } catch {
    return jsonResponse({ ok: false, code: 'invalid_request' }, { status: 400 })
  }

  const normalizedPayload = normalizePayload(payload)

  if (!normalizedPayload) {
    return jsonResponse({ ok: false, code: 'invalid_request' }, { status: 400 })
  }

  if (normalizedPayload.company) {
    return jsonResponse({ ok: true, leadId: 0, deliveryStatus: 'sent' }, { status: 200 })
  }

  let runtimeConfig: RuntimeConfig

  try {
    runtimeConfig = getRuntimeConfig()
  } catch {
    return jsonResponse({ ok: false, code: 'server_misconfigured' }, { status: 500 })
  }

  const sql = neon(runtimeConfig.databaseUrl)
  const resend = new Resend(runtimeConfig.resendApiKey)
  const userAgent = request.headers.get('user-agent')
  const ipAddress = getClientIp(request)
  let leadId: number

  try {
    await ensureTable(sql)

    if (await isRateLimited(sql, normalizedPayload.email, ipAddress)) {
      return jsonResponse({ ok: false, code: 'rate_limited' }, { status: 429 })
    }

    leadId = await saveLead(sql, normalizedPayload, userAgent, ipAddress)
  } catch {
    return jsonResponse({ ok: false, code: 'server_error' }, { status: 500 })
  }

  try {
    const ownerEmail = buildOwnerEmail(normalizedPayload)
    const ownerResult = await resend.emails.send({
      from: runtimeConfig.leadFromEmail,
      to: [runtimeConfig.leadToEmail],
      replyTo: normalizedPayload.email,
      subject: ownerEmail.subject,
      html: ownerEmail.html,
    })

    if (ownerResult.error) {
      throw new Error(ownerResult.error.message)
    }

    let replyEmailId: string | null = null

    if (runtimeConfig.leadReplyEnabled) {
      const visitorReply = buildVisitorReply(normalizedPayload)
      const replyResult = await resend.emails.send({
        from: runtimeConfig.leadFromEmail,
        to: [normalizedPayload.email],
        subject: visitorReply.subject,
        html: visitorReply.html,
      })

      if (replyResult.error) {
        throw new Error(replyResult.error.message)
      }

      replyEmailId = replyResult.data?.id ?? null
    }

    await updateLeadDelivery(
      sql,
      leadId,
      'sent',
      ownerResult.data?.id ?? null,
      replyEmailId,
      null,
    )

    return jsonResponse({ ok: true, leadId, deliveryStatus: 'sent' }, { status: 200 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message.slice(0, 500) : 'Unknown delivery error'

    await updateLeadDelivery(sql, leadId, 'failed', null, null, message)

    return jsonResponse(
      {
        ok: false,
        code: 'lead_saved_email_failed',
        saved: true,
        leadId,
      },
      { status: 502 },
    )
  }
}

export function GET() {
  return jsonResponse(
    { ok: false, code: 'invalid_request' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
