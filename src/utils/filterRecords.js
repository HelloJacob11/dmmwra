// Applies the active demographic filter selections to the resident records.
// A dimension with no selections is treated as "all" (no restriction).
export function applyFilters(records, filters) {
  const activeKeys = Object.keys(filters).filter((key) => filters[key]?.length)
  if (activeKeys.length === 0) return records
  return records.filter((record) =>
    activeKeys.every((key) => filters[key].includes(String(record[key]))),
  )
}

export function rate(records, predicate) {
  if (records.length === 0) return 0
  return records.filter(predicate).length / records.length
}

export function average(records, selector) {
  if (records.length === 0) return 0
  return records.reduce((sum, r) => sum + selector(r), 0) / records.length
}

// Groups records by a demographic field and computes a rate per group,
// preserving the field's authored option order (not sorted by value).
export function rateByField(records, field, options, predicate) {
  return options.map((option) => {
    const group = records.filter((r) => String(r[field]) === option)
    return {
      label: option,
      value: rate(group, predicate),
      count: group.length,
    }
  })
}
