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
}

type RuntimeConfig = {
  databaseUrl: string
  resendApiKey: string
  leadFromEmail: string
  leadToEmail: string
  leadReplyEnabled: boolean
}

const jsonHeaders = {
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

  return {
    name,
    email,
    message,
    locale,
    sourceUrl: sourceUrl || null,
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
      user_agent TEXT,
      delivery_status TEXT NOT NULL DEFAULT 'pending',
      owner_email_id TEXT,
      reply_email_id TEXT,
      delivery_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notified_at TIMESTAMPTZ
    )
  `
}

async function saveLead(sql: any, payload: NormalizedLeadPayload, userAgent: string | null) {
  const insertedRows = (await sql`
    INSERT INTO contact_leads (
      name,
      email,
      message,
      locale,
      source_url,
      user_agent
    ) VALUES (
      ${payload.name},
      ${payload.email},
      ${payload.message},
      ${payload.locale},
      ${payload.sourceUrl},
      ${userAgent}
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

  let runtimeConfig: RuntimeConfig

  try {
    runtimeConfig = getRuntimeConfig()
  } catch {
    return jsonResponse({ ok: false, code: 'server_misconfigured' }, { status: 500 })
  }

  const sql = neon(runtimeConfig.databaseUrl)
  const resend = new Resend(runtimeConfig.resendApiKey)
  const userAgent = request.headers.get('user-agent')
  let leadId: number

  try {
    await ensureTable(sql)
    leadId = await saveLead(sql, normalizedPayload, userAgent)
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
