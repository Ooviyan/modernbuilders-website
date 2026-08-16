import type { AboutPage, Project, Service, SiteSettings } from './types'

// Real MODERN BUILDERS content, shown until it's entered into the Sanity
// Studio (or edited here directly). Services and Projects below are
// generic placeholders — swap them for the real list/portfolio whenever
// it's ready.

export const placeholderSiteSettings: SiteSettings = {
  companyName: 'MODERN BUILDERS',
  tagline: 'For Your Generation',
  heroHeading: 'Building homes, businesses, and trust — for your generation, and the ones that follow.',
  heroSubheading:
    'Since 2000, MODERN BUILDERS has delivered over 200 buildings across Nagapattinam, from design and approvals through construction and handover.',
  foundedYear: 2000,
  founderName: 'Er. K. Karthikesan',
  phone: '+91 98424 58564',
  address: '7B, North Gate East Road, Near Anna Statue, Nagapattinam, Tamil Nadu 611001',
  stats: [
    { label: 'Years Experience', value: '25+' },
    { label: 'Projects Completed', value: '200+' },
    { label: 'Happy Clients', value: '250+' },
  ],
}

export const placeholderServices: Service[] = [
  {
    _id: 'placeholder-1',
    title: 'Residential',
    slug: 'residential',
    summary: 'Custom homes built to your family\'s needs, from foundation to handover.',
    image: '/services/residential.png',
  },
  {
    _id: 'placeholder-2',
    title: 'Commercial',
    slug: 'commercial',
    summary: 'Shops, offices, and institutional buildings delivered on schedule.',
    image: '/services/commercial.png',
  },
  {
    _id: 'placeholder-3',
    title: 'Interiors',
    slug: 'interiors',
    summary: 'Interior fit-outs and finishing for homes and commercial spaces.',
    image: '/services/interiors.png',
  },
  {
    _id: 'placeholder-4',
    title: 'Industrial',
    slug: 'industrial',
    summary: 'Warehouses, factories, and industrial facilities built for durability.',
    image: '/services/industrial.png',
  },
]

export const placeholderProjects: Project[] = [
  {
    _id: 'ooviyalayam',
    title: 'Ooviyalayam',
    slug: 'ooviyalayam',
    kind: 'client',
    category: 'Residential',
    status: 'completed',
    location: 'Velippalayam, Nagapattinam',
    coverImage: '/projects/ooviyannivas/cover.png',
    featured: true,
  },
  {
    _id: 'lotus-residency',
    title: 'Lotus Residency',
    slug: 'lotus-residency',
    kind: 'client',
    category: 'Residential',
    status: 'completed',
    location: 'Nagapattinam',
    coverImage: '/projects/lotus/cover.png',
  },
  {
    _id: 'egs-pillai-medical-campus',
    title: 'EGS Pillai Medical Campus',
    slug: 'egs-pillai-medical-campus',
    kind: 'client',
    category: 'Industrial',
    status: 'ongoing',
    location: 'Thethi, Nagapattinam',
    coverImage: '/projects/egsmediaclcampus/cover.png',
    featured: true,
  },
  {
    _id: 'residency-thethi-1',
    title: 'Residency (Thethi I)',
    slug: 'residency-thethi-1',
    kind: 'client',
    category: 'Residential',
    status: 'completed',
    location: 'Thethi, Nagapattinam',
    coverImage: '/projects/thethi1/cover.png',
  },
  {
    _id: 'residency-thethi-2',
    title: 'Residency (Thethi II)',
    slug: 'residency-thethi-2',
    kind: 'client',
    category: 'Residential',
    status: 'completed',
    location: 'Thethi, Nagapattinam',
    coverImage: '/projects/thethi2/cover.png',
  },
  {
    _id: 'ks-enclave',
    title: 'KS Enclave',
    slug: 'ks-enclave',
    kind: 'rental',
    category: 'Residential',
    status: 'available',
    location: 'Velippalayam, Nagapattinam',
    coverImage: '/projects/sangeethaopp/cover.png',
    featured: true,
  },
  {
    _id: 'sri-vivekananda-nursery-and-primary-school',
    title: 'Sri Vivekananda Nursery and Primary School',
    slug: 'sri-vivekananda-nursery-and-primary-school',
    kind: 'client',
    category: 'Industrial',
    status: 'completed',
    location: 'Enangudi, Nagapattinam',
    coverImage: '/projects/vivekanandhaschool/cover.png',
  },
]

export const placeholderAboutPage: AboutPage = {
  heading: 'About MODERN BUILDERS',
  intro:
    'Founded in 2000 by Er. K. Karthikesan, MODERN BUILDERS has spent over 25 years shaping homes, commercial spaces, and institutions across Nagapattinam.',
  values: [
    {
      title: 'Built to Last',
      description:
        'The buildings we completed two decades ago still stand as our best advertisement — many of those families return to build with us again.',
    },
    {
      title: 'Transparent Estimates',
      description: 'Itemised, honest estimates with no surprises along the way.',
    },
    {
      title: 'On the Date We Commit',
      description: 'From design and approvals to construction and handover — delivered on schedule.',
    },
  ],
}

// The two about paragraphs as given, for pages that want the full story as
// plain text rather than the shorter `intro` above.
export const placeholderAboutStory = [
  "Founded in 2000 by Er. K. Karthikesan, Modern Builders has spent over 25 years shaping homes, commercial spaces, and institutions across Nagapattinam. What started as one builder's commitment to honest work has become a name families trust across generations — more than 200 buildings delivered, and 150+ families who've made our work their home.",
  "What sets us apart is simple: the buildings we completed two decades ago still stand as our best advertisement, and many of those families return to build with us again. We handle everything from design and approvals to construction and handover — with transparent, itemised estimates and delivery on the date we commit. For your generation, and the ones that follow.",
]
