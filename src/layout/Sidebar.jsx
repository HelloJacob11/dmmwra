import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/overflow-events', label: 'Overflow Events' },
  { to: '/health-impact', label: 'Public Health Impact' },
  { to: '/infrastructure', label: 'Infrastructure & Investment' },
  { to: '/equity', label: 'Equity & Demographics' },
  { to: '/methodology', label: 'Data & Methodology' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark" aria-hidden="true">DM</span>
        <div>
          <div className="sidebar-brand-title">CSO Impact Dashboard</div>
          <div className="sidebar-brand-subtitle">City of Des Moines</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-nav-link${isActive ? ' is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        Prepared for City Council &amp; policy analysts.
        <br />
        Data shown is illustrative pending live integration.
      </div>
    </aside>
  )
}
