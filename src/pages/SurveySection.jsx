import { useFilters } from '../context/FilterContext'
import { applyFilters } from '../utils/filterRecords'
import data from '../data.json'
import SectionQuestion from '../components/survey/SectionQuestion'
import FloodMap from '../components/map/FloodMap'

// Generic renderer for one meta.json section: header + a ZIP map per index +
// every question, dispatched by kind. A new section or question in
// meta.json appears here automatically — nothing else needs to change.
export default function SurveySection({ section }) {
  const { filters, activeCount } = useFilters()
  const records = applyFilters(data, filters)
  const indices = section.indices ?? (section.index ? [section.index] : [])

  return (
    <>
      <div className="page-header">
        <span className="survey-part-badge">{section.survey_part}</span>
        <h1>{section.title}</h1>
        <p>{section.blurb}</p>
        <p className="page-header-count">
          {records.length.toLocaleString()} of {data.length.toLocaleString()} respondents
          {activeCount ? ' match the current filters' : ' (no filters applied)'}
        </p>
      </div>

      {indices.length > 0 && (
        <div className={`grid ${indices.length === 3 ? 'grid-3' : 'grid-2'} index-maps`}>
          {indices.map((indexDef) => (
            <FloodMap key={indexDef.field} rows={records} indexDef={indexDef} />
          ))}
        </div>
      )}

      <div className="question-stack">
        {section.questions.map((question) => (
          <SectionQuestion key={question.field} question={question} records={records} />
        ))}
      </div>
    </>
  )
}
