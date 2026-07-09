import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import FilterBar from '../components/filters/FilterBar'

export default function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <FilterBar />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
