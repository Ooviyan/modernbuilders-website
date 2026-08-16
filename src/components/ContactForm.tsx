'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-lg font-semibold text-navy">Thanks — we got your message.</p>
        <p className="mt-2 text-sm text-navy-light">We&apos;ll be in touch within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-navy">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="inquiryType" className="text-sm font-medium text-navy">
          I&apos;m interested in
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        >
          <option>Building a new project</option>
          <option>Renovating an existing space</option>
          <option>Renting one of your properties</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-maroon">Something went wrong. Please try again or call/WhatsApp us directly.</p>
      )}
    </form>
  )
}
