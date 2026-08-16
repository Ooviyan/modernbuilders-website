export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// True once a real Sanity project has been connected. Pages check this
// before querying so the site still renders (with placeholder content)
// before Sanity is set up.
export const isSanityConfigured = Boolean(projectId)
