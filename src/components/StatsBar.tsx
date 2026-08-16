import type { SiteSettings } from '@/lib/types'

export function StatsBar({ stats }: { stats: SiteSettings['stats'] }) {
  if (!stats?.length) return null

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-navy sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-navy-light">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
