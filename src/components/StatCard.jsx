// Small KPI tile. `status` (good|warning|serious|critical) tints the value
// and must always be paired with the text itself — never color alone.
export default function StatCard({ label, value, unit, sublabel, status }) {
  return (
    <div className="stat-card">
      <div className="stat-card-label">{label}</div>
      <div className={`stat-card-value${status ? ` status-${status}` : ''}`}>
        {value}
        {unit && <span className="stat-card-unit">{unit}</span>}
      </div>
      {sublabel && <div className="stat-card-sublabel">{sublabel}</div>}
    </div>
  )
}
