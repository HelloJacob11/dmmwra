import { NavLink } from 'react-router-dom'
import meta from '../meta.json'
import stanfordLogo from '../assets/stanford-cee-logo.png'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark" aria-hidden="true">DM</span>
        <div>
          <div className="sidebar-brand-title">Resident Survey Results</div>
          <div className="sidebar-brand-subtitle">City of Des Moines</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/overview"
          className={({ isActive }) => `sidebar-nav-link${isActive ? ' is-active' : ''}`}
        >
          Overview
        </NavLink>
        {meta.sections.map((section) => (
          <NavLink
            key={section.id}
            to={`/${section.id}`}
            className={({ isActive }) => `sidebar-nav-link${isActive ? ' is-active' : ''}`}
          >
            {section.title}
          </NavLink>
        ))}
        <NavLink
          to="/community-work"
          className={({ isActive }) => `sidebar-nav-link${isActive ? ' is-active' : ''}`}
        >
          Community Work
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        {meta.n_records.toLocaleString()} residents surveyed.
        <br />
        Segment using the filters above.
        <img
          className="sidebar-logo"
          src={stanfordLogo}
          alt="Stanford School of Engineering & Doerr School of Sustainability, Civil & Environmental Engineering"
        />
      </div>
    </aside>
  )
}
