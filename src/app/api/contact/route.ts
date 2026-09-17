import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  inquiryType?: string
  message?: string
}

// Submissions get emailed here. Must match the address that owns the Resend
// account until a domain is verified at resend.com/domains — Resend's test
// mode only delivers to that one address. Once a domain is verified, this
// can be any address.
const NOTIFY_EMAIL = 'modernbuildersofficial@gmail.com'

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Not configured yet — log so the form still works end-to-end locally,
    // but this means no one actually gets notified. See README for setup.
    console.error('RESEND_API_KEY is not set — contact submission was not emailed:', body)
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'MODERN BUILDERS Website <onboarding@resend.dev>',
    to: NOTIFY_EMAIL,
    replyTo: body.email,
    subject: `New inquiry from ${body.name}`,
    text: [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      body.phone ? `Phone: ${body.phone}` : null,
      body.inquiryType ? `Interested in: ${body.inquiryType}` : null,
      '',
      body.message,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  if (error) {
    console.error('Failed to send contact notification email:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
