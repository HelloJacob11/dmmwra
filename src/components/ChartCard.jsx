export default function ChartCard({ title, titleExtra, question, description, subtitle, footnote, children, className = '' }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">
            <h3>{title}</h3>
            {titleExtra}
          </div>
          {question && <p className="chart-card-question">{question}</p>}
          {description && <p className="chart-card-description">{description}</p>}
          {subtitle && <p className="chart-card-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="chart-card-body">{children}</div>
      {footnote && <p className="chart-card-footnote">{footnote}</p>}
    </div>
  )
}
