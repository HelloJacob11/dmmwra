import { Routes, Route } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import AppShell from './layout/AppShell'
import Overview from './pages/Overview'
import OverflowEvents from './pages/OverflowEvents'
import HealthImpact from './pages/HealthImpact'
import Infrastructure from './pages/Infrastructure'
import EquityDemographics from './pages/EquityDemographics'
import Methodology from './pages/Methodology'

function App() {
  return (
    <FilterProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Overview />} />
          <Route path="/overflow-events" element={<OverflowEvents />} />
          <Route path="/health-impact" element={<HealthImpact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/equity" element={<EquityDemographics />} />
          <Route path="/methodology" element={<Methodology />} />
        </Route>
      </Routes>
    </FilterProvider>
  )
}

export default App
