// Demographic filter dimensions, derived directly from meta.json so the
// filter bar always matches the survey's real coded fields and options.
import meta from '../meta.json'

function normalizeOptions(options) {
  // Zip is a flat array of strings; every other filter is [{ value, label }].
  return options.map((opt) =>
    typeof opt === 'object' ? { value: String(opt.value), label: opt.label } : { value: opt, label: opt },
  )
}

export const DEMOGRAPHIC_FIELDS = meta.filters.map((filter) => ({
  field: filter.field,
  label: filter.label,
  options: normalizeOptions(filter.options),
}))
