// One-time: uploads a hero photo and attaches it to the Site Settings
// singleton's heroImage field. Safe to re-run.
// Usage: node scripts/set-hero-image.js

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
  const filePath = path.join(ROOT, 'public/hero-cover.png')
  console.log('Uploading hero image (hero-cover.png)...')
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: 'hero.png',
  })
  await client.patch('siteSettings-singleton').set({
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  }).commit()
  console.log('✓ Hero image set on Site Settings')
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
