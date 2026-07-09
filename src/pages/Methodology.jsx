import { DEMOGRAPHIC_FIELDS } from '../data/demographics'
import ChartCard from '../components/ChartCard'

export default function Methodology() {
  return (
    <>
      <div className="page-header">
        <h1>Data &amp; Methodology</h1>
        <p>
          What this dashboard shows, where the numbers will come from, and
          the current status of each data source.
        </p>
      </div>

      <div className="callout">
        <strong>All figures in this dashboard are currently sample/placeholder
        data</strong>, generated to demonstrate the dashboard framework. No
        page reflects a real, published measurement yet. Replace the sources
        in <code>src/data/mockCsoData.js</code> with the feeds below before
        sharing externally.
      </div>

      <ChartCard title="Planned Data Sources" sample={false}>
        <DataSourceTable />
      </ChartCard>

      <ChartCard title="Demographic Filter Definitions" sample={false}>
        <div className="grid grid-3">
          {DEMOGRAPHIC_FIELDS.map((field) => (
            <div key={field.key}>
              <h3>{field.label}</h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 4 }}>
                {field.options.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </ChartCard>
    </>
  )
}

function DataSourceTable() {
  const rows = [
    { metric: 'CSO event count & volume', source: 'DMMWRA outfall monitoring / telemetry', status: 'Not yet connected' },
    { metric: 'Overflow location & receiving water', source: 'DMMWRA outfall registry (NPDES permit)', status: 'Not yet connected' },
    { metric: 'Health complaint / exposure survey data', source: 'Polk County Health Dept. + resident survey', status: 'Not yet connected' },
    { metric: 'Demographic composition by zip', source: 'U.S. Census / ACS 5-Year Estimates', status: 'Not yet connected' },
    { metric: 'Capital project status & budget', source: 'City of Des Moines CIP tracker', status: 'Not yet connected' },
  ]
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Intended Source</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.metric}>
            <td style={{ whiteSpace: 'normal' }}>{row.metric}</td>
            <td style={{ whiteSpace: 'normal' }}>{row.source}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
