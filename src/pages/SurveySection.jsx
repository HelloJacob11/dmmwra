import { useFilters } from '../context/FilterContext'
import { applyFilters } from '../utils/filterRecords'
import data from '../data.json'
import SectionQuestion from '../components/survey/SectionQuestion'
import IndexChart from '../components/survey/IndexChart'
import FloodMap from '../components/map/FloodMap'

// Sections that get a ZIP choropleth alongside one of their indices.
const MAP_METRICS = {
  flooding: 'flood_exposure_index',
  tapwater: 'water_trust_sensory',
}

// Generic renderer for one meta.json section: header + its index/indices +
// every question, dispatched by kind. A new section or question in
// meta.json appears here automatically — nothing else needs to change.
export default function SurveySection({ section }) {
  const { filters, activeCount } = useFilters()
  const records = applyFilters(data, filters)
  const indices = section.indices ?? (section.index ? [section.index] : [])

  const mapMetric = MAP_METRICS[section.id]
  const mappedIndex = mapMetric ? indices.find((i) => i.field === mapMetric) : null
  const otherIndices = mappedIndex ? indices.filter((i) => i !== mappedIndex) : indices

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

      {mappedIndex && (
        <div className="grid grid-2">
          <IndexChart indexDef={mappedIndex} records={records} fill />
          <FloodMap rows={records} metric={mappedIndex.field} label={`${mappedIndex.label} by ZIP`} />
        </div>
      )}

      {otherIndices.length > 0 && (
        <div className="grid grid-3">
          {otherIndices.map((indexDef) => (
            <IndexChart key={indexDef.field} indexDef={indexDef} records={records} />
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
