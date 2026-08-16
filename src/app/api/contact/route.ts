import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  inquiryType?: string
  message?: string
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // TODO: wire this up to an email provider (e.g. Resend, Postmark, SendGrid)
  // or forward it to WhatsApp/a CRM. For now, submissions are just logged so
  // the form works end-to-end during development.
  console.log('New contact form submission:', body)

  return NextResponse.json({ ok: true })
}
