import { client } from './client'
import { isSanityConfigured } from './env'

/**
 * Runs a Sanity GROQ query, but only if a real project is connected.
 * Before Sanity is set up (or if a query fails) this returns null so
 * pages can fall back to placeholder content instead of crashing.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } })
  } catch (err) {
    console.error('Sanity fetch failed:', err)
    return null
  }
}
