import { Routes, Route, Navigate } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import AppShell from './layout/AppShell'
import SurveySection from './pages/SurveySection'
import meta from './meta.json'

function App() {
  return (
    <FilterProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to={`/${meta.sections[0].id}`} replace />} />
          {meta.sections.map((section) => (
            <Route key={section.id} path={section.id} element={<SurveySection section={section} />} />
          ))}
        </Route>
      </Routes>
    </FilterProvider>
  )
}

export default App
