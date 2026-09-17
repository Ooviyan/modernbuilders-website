// Uploads the Interiors catalogue PDF + cover image and creates the
// brochure document in Sanity. Safe to re-run (replaces by fixed _id).
// Usage: node scripts/upload-brochure.js

const fs = require('fs')
const path = require('path')
const os = require('os')
const { createClient } = require('@sanity/client')

const ROOT = path.resolve(__dirname, '..')

function readEnvLocal() {
  const raw = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8')
  const env = {}
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)="?([^"\n]*)"?$/)
    if (m) env[m[1]] = m[2]
  }
  return env
}

function readCliToken() {
  const configPath = path.join(os.homedir(), '.config/sanity/config.json')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  if (!config.authToken) throw new Error('No Sanity CLI auth token found — run `npx sanity login` first.')
  return config.authToken
}

const env = readEnvLocal()
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: readCliToken(),
  useCdn: false,
})

async function main() {
  console.log('Uploading cover image...')
  const coverAsset = await client.assets.upload(
    'image',
    fs.createReadStream(path.join(ROOT, 'public/brochures/interiors-cover.png')),
    { filename: 'interiors-cover.png' }
  )

  console.log('Uploading PDF (this may take a moment, ~6.4MB)...')
  const pdfAsset = await client.assets.upload(
    'file',
    fs.createReadStream(path.join(ROOT, 'public/brochures/interiors-catalogue.pdf')),
    { filename: 'InteriorsCatalogue.pdf' }
  )

  await client.createOrReplace({
    _id: 'brochure-interiors',
    _type: 'brochure',
    title: 'Interiors',
    slug: { _type: 'slug', current: 'interiors' },
    summary: 'Living spaces, kitchens, bedrooms, wardrobes, and feature walls — designed and delivered turnkey.',
    coverImage: { _type: 'image', asset: { _type: 'reference', _ref: coverAsset._id } },
    pdfFile: { _type: 'file', asset: { _type: 'reference', _ref: pdfAsset._id } },
    pageCount: 66,
    order: 1,
  })
  console.log('✓ Brochure: Interiors')
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
