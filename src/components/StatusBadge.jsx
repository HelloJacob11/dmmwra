const STATUS_MAP = {
  'On Track': 'good',
  'Delayed': 'warning',
  'At Risk': 'critical',
}

// Status is always icon + label, never color alone.
export default function StatusBadge({ status }) {
  const tone = STATUS_MAP[status] ?? 'good'
  return (
    <span className={`status-badge status-badge-${tone}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {status}
    </span>
  )
}
