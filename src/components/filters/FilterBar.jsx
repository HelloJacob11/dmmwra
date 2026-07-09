import { DEMOGRAPHIC_FIELDS } from '../../data/demographics'
import { useFilters } from '../../context/FilterContext'
import MultiSelect from './MultiSelect'

export default function FilterBar() {
  const { filters, setFilter, resetAll, activeCount } = useFilters()

  return (
    <div className="filter-bar">
      <div className="filter-bar-row">
        <span className="filter-bar-label">Segment by demographics:</span>
        <div className="filter-bar-controls">
          {DEMOGRAPHIC_FIELDS.map((field) => (
            <MultiSelect
              key={field.key}
              label={field.label}
              options={field.options}
              selected={filters[field.key]}
              onChange={(values) => setFilter(field.key, values)}
            />
          ))}
        </div>
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
