import { createContext, useContext, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DEMOGRAPHIC_FIELDS } from '../data/demographics'

const FilterContext = createContext(null)

const FIELDS = DEMOGRAPHIC_FIELDS.map((f) => f.field)

// Filters live in the URL (?cov_zip_code=50314,50316&cov_household_income=...)
// so a filtered view of any section can be shared via link. Keys are the raw
// coded column names from data.json, so filter matching never needs a lookup.
export function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => {
    const next = {}
    for (const field of FIELDS) {
      const raw = searchParams.get(field)
      next[field] = raw ? raw.split(',').filter(Boolean) : []
    }
    return next
  }, [searchParams])

  const activeCount = FIELDS.reduce((sum, field) => sum + filters[field].length, 0)

  function setFilter(field, values) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (values.length) next.set(field, values.join(','))
        else next.delete(field)
        return next
      },
      { replace: true },
    )
  }

  function resetAll() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      for (const field of FIELDS) next.delete(field)
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
