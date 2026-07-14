// Applies the active demographic filter selections to the resident records.
// Filter keys are raw coded column names (e.g. cov_age), matched against the
// raw coded value on each record. A dimension with no selections is treated
// as "all" (no restriction).
export function applyFilters(records, filters) {
  const activeFields = Object.keys(filters).filter((field) => filters[field]?.length)
  if (activeFields.length === 0) return records
  return records.filter((record) =>
    activeFields.every((field) => filters[field].includes(String(record[field]))),
  )
}

function isMissing(value) {
  return value === null || value === undefined
}

// Single-select question: % of non-null respondents choosing each option.
// Denominator excludes missing values, not the full filtered set.
export function singleQuestionStats(records, field, options) {
  const answered = records.filter((r) => !isMissing(r[field]))
  const denom = answered.length
  const data = options.map((opt) => {
    const count = answered.filter((r) => Number(r[field]) === Number(opt.value)).length
    return { label: opt.label, count, pct: denom ? count / denom : 0 }
  })
  return { data, denom }
}

// Multiselect question: % of non-null respondents who selected each member
// (member === 1). Members are independent — not mutually exclusive.
export function multiselectStats(records, members) {
  const data = members.map((member) => {
    const answered = records.filter((r) => !isMissing(r[member.field]))
    const denom = answered.length
    const count = answered.filter((r) => Number(r[member.field]) === 1).length
    return { label: member.label, count, denom, pct: denom ? count / denom : 0 }
  })
  return data.sort((a, b) => b.pct - a.pct)
}

// Constructed index (standardized factor score): mean + a histogram of the
// non-null distribution for the current filtered selection.
export function indexStats(records, field, binCount = 12) {
  const values = records
    .map((r) => r[field])
    .filter((v) => !isMissing(v) && !Number.isNaN(v))
  const denom = values.length
  if (denom === 0) return { mean: null, denom: 0, histogram: [] }

  const mean = values.reduce((sum, v) => sum + v, 0) / denom
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const binWidth = span / binCount

  const bins = Array.from({ length: binCount }, (_, i) => {
    const start = min + i * binWidth
    const end = i === binCount - 1 ? max : start + binWidth
    return { start, end, count: 0 }
  })
  for (const v of values) {
    let idx = Math.floor((v - min) / binWidth)
    if (idx >= binCount) idx = binCount - 1
    if (idx < 0) idx = 0
    bins[idx].count += 1
  }

  return { mean, denom, histogram: bins }
}
