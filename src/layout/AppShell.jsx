import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import FilterBar from '../components/filters/FilterBar'

// Pages with no survey data to segment, so the filter bar is hidden.
const NO_FILTER_PATHS = ['/overview']

export default function AppShell() {
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        {!NO_FILTER_PATHS.includes(pathname) && <FilterBar />}
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
