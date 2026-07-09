import SampleDataBadge from './SampleDataBadge'

export default function ChartCard({ title, subtitle, footnote, sample = true, children, className = '' }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p className="chart-card-subtitle">{subtitle}</p>}
        </div>
        {sample && <SampleDataBadge />}
      </div>
      <div className="chart-card-body">{children}</div>
      {footnote && <p className="chart-card-footnote">{footnote}</p>}
    </div>
  )
}
