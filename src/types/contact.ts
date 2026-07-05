import type { Locale } from './portfolio'

export type ContactLeadPayload = {
  name: string
  email: string
  message: string
  locale: Locale
  sourceUrl?: string
  company?: string
}

export type ContactApiSuccess = {
  ok: true
  leadId: number
  deliveryStatus: 'sent'
}

export type ContactApiFailure = {
  ok: false
  code:
    | 'invalid_request'
    | 'origin_not_allowed'
    | 'rate_limited'
    | 'server_misconfigured'
    | 'lead_saved_email_failed'
    | 'server_error'
  saved?: boolean
  leadId?: number
}

export type ContactApiResponse = ContactApiSuccess | ContactApiFailure
