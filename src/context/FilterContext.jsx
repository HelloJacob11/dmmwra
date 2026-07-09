import { createContext, useContext, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DEMOGRAPHIC_FIELDS } from '../data/demographics'

const FilterContext = createContext(null)

const FIELD_KEYS = DEMOGRAPHIC_FIELDS.map((f) => f.key)

// Filters live in the URL (?zip=50314,50316&income=...) so a council member
// or analyst can share a filtered view of any page with a link.
export function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    const next = {}
    for (const key of FIELD_KEYS) {
      const raw = searchParams.get(key)
      next[key] = raw ? raw.split(',').filter(Boolean) : []
    }
    return next
  }, [searchParams])

  const activeCount = FIELD_KEYS.reduce((sum, key) => sum + filters[key].length, 0)

  function setFilter(key, values) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (values.length) next.set(key, values.join(','))
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  function resetAll() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      for (const key of FIELD_KEYS) next.delete(key)
      return next
    })
  }

  const value = { filters, setFilter, resetAll, activeCount }
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider
export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within a FilterProvider')
  return ctx
}
