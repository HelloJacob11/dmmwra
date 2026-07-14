import { DEMOGRAPHIC_FIELDS } from '../../data/demographics'
import { useFilters } from '../../context/FilterContext'
import { applyFilters } from '../../utils/filterRecords'
import data from '../../data.json'
import MultiSelect from './MultiSelect'

export default function FilterBar() {
  const { filters, setFilter, resetAll, activeCount } = useFilters()
  const matched = applyFilters(data, filters).length

  return (
    <div className="filter-bar">
      <div className="filter-bar-row">
        <span className="filter-bar-label">Segment by demographics:</span>
        <div className="filter-bar-controls">
          {DEMOGRAPHIC_FIELDS.map((field) => (
            <MultiSelect
              key={field.field}
              label={field.label}
              options={field.options}
              selected={filters[field.field]}
              onChange={(values) => setFilter(field.field, values)}
            />
          ))}
        </div>
        <span className="filter-bar-count">
          <strong>{matched.toLocaleString()}</strong> of {data.length.toLocaleString()} respondents
        </span>
        <button
          type="button"
          className="filter-bar-reset"
          onClick={resetAll}
          disabled={activeCount === 0}
        >
          Reset all{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>
    </div>
  )
}
