'use client'

import * as React from 'react'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === activeTab))
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const selectTab = (index: number) => {
      onTabChange?.(tabs[index].id)
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let next: number | null = null
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length
      else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = tabs.length - 1
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        selectTab(index)
        return
      }
      if (next !== null) {
        e.preventDefault()
        selectTab(next)
        tabRefs.current[next]?.focus()
      }
    }

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {/* Pill-shaped filter row, styled after Herzog & de Meuron's
            category strip — the active filter is a solid pill rather than
            an underline, with a thin gold ring as the one accent touch. */}
        <div role="tablist" className="flex flex-wrap items-center gap-2">
          {tabs.map((tab, index) => {
            const active = index === activeIndex
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={active ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                className={cn(
                  'cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2',
                  active
                    ? 'bg-navy text-white ring-1 ring-gold ring-offset-2'
                    : hoveredIndex === index
                      ? 'bg-surface text-navy'
                      : 'text-navy-light'
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => selectTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'

export { Tabs }
