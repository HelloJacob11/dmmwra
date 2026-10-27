import { Routes, Route, Navigate } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import AppShell from './layout/AppShell'
import SurveySection from './pages/SurveySection'
import CommunityWork from './pages/CommunityWork'
import Overview from './pages/Overview'
import meta from './meta.json'

function App() {
  return (
    <FilterProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          {meta.sections.map((section) => (
            <Route key={section.id} path={section.id} element={<SurveySection section={section} />} />
          ))}
          <Route path="community-work" element={<CommunityWork />} />
        </Route>
      </Routes>
    </FilterProvider>
  )
}

export default App
