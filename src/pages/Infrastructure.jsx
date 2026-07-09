import { INFRASTRUCTURE_PROJECTS } from '../data/mockCsoData'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'

function formatUsd(n) {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

const columns = [
  { key: 'id', label: 'Project ID' },
  { key: 'name', label: 'Project' },
  { key: 'zip', label: 'Zip' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  { key: 'budgetUsd', label: 'Budget', render: (row) => formatUsd(row.budgetUsd) },
  {
    key: 'percentComplete',
    label: 'Progress',
    render: (row) => (
      <div className="progress-cell">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${row.percentComplete}%` }} />
        </div>
        <span>{row.percentComplete}%</span>
      </div>
    ),
  },
  { key: 'estCompletion', label: 'Est. Completion' },
]

export default function Infrastructure() {
  const totalBudget = INFRASTRUCTURE_PROJECTS.reduce((sum, p) => sum + p.budgetUsd, 0)
  const onTrack = INFRASTRUCTURE_PROJECTS.filter((p) => p.status === 'On Track').length
  const delayed = INFRASTRUCTURE_PROJECTS.filter((p) => p.status === 'Delayed').length
  const atRisk = INFRASTRUCTURE_PROJECTS.filter((p) => p.status === 'At Risk').length

  return (
    <>
      <div className="page-header">
        <h1>Infrastructure &amp; Investment</h1>
        <p>
          Capital improvement projects underway to reduce CSO frequency and
          volume, drawn from the current CIP (Capital Improvement Plan).
        </p>
      </div>

      <div className="grid grid-stats">
        <StatCard label="Total CIP Investment" value={formatUsd(totalBudget)} sublabel={`across ${INFRASTRUCTURE_PROJECTS.length} active projects`} />
        <StatCard label="On Track" value={onTrack} status="good" sublabel="projects on schedule" />
        <StatCard label="Delayed" value={delayed} status="warning" sublabel="projects behind schedule" />
        <StatCard label="At Risk" value={atRisk} status="critical" sublabel="projects needing attention" />
      </div>

      <ChartCard title="Capital Improvement Projects">
        <DataTable columns={columns} rows={INFRASTRUCTURE_PROJECTS} />
      </ChartCard>
    </>
  )
}
