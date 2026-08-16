// One-time migration: pushes the real content currently hardcoded in
// src/lib/placeholder-data.ts into Sanity, including uploading the real
// photos. Safe to re-run — it deletes and recreates its own documents by
// fixed _id, so it won't create duplicates.
//
// Usage: node scripts/migrate-to-sanity.js

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

async function uploadImage(relativePath) {
  const filePath = path.join(ROOT, 'public', relativePath)
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  console.log(`Migrating into project ${env.NEXT_PUBLIC_SANITY_PROJECT_ID} / ${env.NEXT_PUBLIC_SANITY_DATASET}...`)

  // ---- Site Settings ----
  console.log('Uploading logo...')
  const logo = await uploadImage('logo.png')
  await client.createOrReplace({
    _id: 'siteSettings-singleton',
    _type: 'siteSettings',
    companyName: 'MODERN BUILDERS',
    tagline: 'For Your Generation',
    logo,
    heroHeading: 'Building homes, businesses, and trust — for your generation, and the ones that follow.',
    heroSubheading:
      'Since 2000, MODERN BUILDERS has delivered over 200 buildings across Nagapattinam, from design and approvals through construction and handover.',
    foundedYear: 2000,
    founderName: 'Er. K. Karthikesan',
    phone: '+91 98424 58564',
    address: '7B, North Gate East Road, Near Anna Statue, Nagapattinam, Tamil Nadu 611001',
    stats: [
      { _key: 'stat1', label: 'Years Experience', value: '25+' },
      { _key: 'stat2', label: 'Projects Completed', value: '200+' },
      { _key: 'stat3', label: 'Happy Clients', value: '250+' },
    ],
  })
  console.log('✓ Site Settings')

  // ---- Services ----
  const services = [
    { id: 'service-residential', title: 'Residential', slug: 'residential', summary: "Custom homes built to your family's needs, from foundation to handover.", image: 'services/residential.png' },
    { id: 'service-commercial', title: 'Commercial', slug: 'commercial', summary: 'Shops, offices, and institutional buildings delivered on schedule.', image: 'services/commercial.png' },
    { id: 'service-interiors', title: 'Interiors', slug: 'interiors', summary: 'Interior fit-outs and finishing for homes and commercial spaces.', image: 'services/interiors.png' },
    { id: 'service-industrial', title: 'Industrial', slug: 'industrial', summary: 'Warehouses, factories, and industrial facilities built for durability.', image: 'services/industrial.png' },
  ]
  for (const [i, s] of services.entries()) {
    const image = await uploadImage(s.image)
    await client.createOrReplace({
      _id: s.id,
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      summary: s.summary,
      image,
      order: i + 1,
    })
    console.log(`✓ Service: ${s.title}`)
  }

  // ---- Projects / Properties ----
  const projects = [
    { id: 'project-ooviyalayam', title: 'Ooviyalayam', slug: 'ooviyalayam', kind: 'client', category: 'Residential', status: 'completed', location: 'Velippalayam, Nagapattinam', cover: 'projects/ooviyannivas/cover.png', featured: true },
    { id: 'project-lotus-residency', title: 'Lotus Residency', slug: 'lotus-residency', kind: 'client', category: 'Residential', status: 'completed', location: 'Nagapattinam', cover: 'projects/lotus/cover.png' },
    { id: 'project-egs-pillai-medical-campus', title: 'EGS Pillai Medical Campus', slug: 'egs-pillai-medical-campus', kind: 'client', category: 'Industrial', status: 'ongoing', location: 'Thethi, Nagapattinam', cover: 'projects/egsmediaclcampus/cover.png', featured: true },
    { id: 'project-residency-thethi-1', title: 'Residency (Thethi I)', slug: 'residency-thethi-1', kind: 'client', category: 'Residential', status: 'completed', location: 'Thethi, Nagapattinam', cover: 'projects/thethi1/cover.png' },
    { id: 'project-residency-thethi-2', title: 'Residency (Thethi II)', slug: 'residency-thethi-2', kind: 'client', category: 'Residential', status: 'completed', location: 'Thethi, Nagapattinam', cover: 'projects/thethi2/cover.png' },
    { id: 'project-ks-enclave', title: 'KS Enclave', slug: 'ks-enclave', kind: 'rental', category: 'Residential', status: 'available', location: 'Velippalayam, Nagapattinam', cover: 'projects/sangeethaopp/cover.png', featured: true },
    { id: 'project-sri-vivekananda-school', title: 'Sri Vivekananda Nursery and Primary School', slug: 'sri-vivekananda-nursery-and-primary-school', kind: 'client', category: 'Industrial', status: 'completed', location: 'Enangudi, Nagapattinam', cover: 'projects/vivekanandhaschool/cover.png' },
  ]
  for (const p of projects) {
    const coverImage = await uploadImage(p.cover)
    await client.createOrReplace({
      _id: p.id,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      kind: p.kind,
      category: p.category,
      status: p.status,
      location: p.location,
      coverImage,
      featured: Boolean(p.featured),
    })
    console.log(`✓ Project: ${p.title}`)
  }

  // ---- About Page ----
  await client.createOrReplace({
    _id: 'aboutPage-singleton',
    _type: 'aboutPage',
    heading: 'About MODERN BUILDERS',
    intro: 'Founded in 2000 by Er. K. Karthikesan, MODERN BUILDERS has spent over 25 years shaping homes, commercial spaces, and institutions across Nagapattinam.',
    story: [
      {
        _type: 'block',
        _key: 'story1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'story1span', text: "Founded in 2000 by Er. K. Karthikesan, Modern Builders has spent over 25 years shaping homes, commercial spaces, and institutions across Nagapattinam. What started as one builder's commitment to honest work has become a name families trust across generations — more than 200 buildings delivered, and 150+ families who've made our work their home." }],
      },
      {
        _type: 'block',
        _key: 'story2',
        style: 'normal',
        children: [{ _type: 'span', _key: 'story2span', text: 'What sets us apart is simple: the buildings we completed two decades ago still stand as our best advertisement, and many of those families return to build with us again. We handle everything from design and approvals to construction and handover — with transparent, itemised estimates and delivery on the date we commit. For your generation, and the ones that follow.' }],
      },
    ],
    values: [
      { _key: 'value1', title: 'Built to Last', description: 'The buildings we completed two decades ago still stand as our best advertisement — many of those families return to build with us again.' },
      { _key: 'value2', title: 'Transparent Estimates', description: 'Itemised, honest estimates with no surprises along the way.' },
      { _key: 'value3', title: 'On the Date We Commit', description: 'From design and approvals to construction and handover — delivered on schedule.' },
    ],
  })
  console.log('✓ About Page')

  console.log('\nDone. Everything is now live in Sanity — check /studio.')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
