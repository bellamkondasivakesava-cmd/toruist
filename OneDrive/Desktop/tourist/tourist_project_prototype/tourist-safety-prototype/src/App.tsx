import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { Incidents } from './pages/Incidents'
import { GeoFencing } from './pages/GeoFencing'
import { DigitalID } from './pages/DigitalID'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'
import { About } from './pages/About'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/geo-fencing" element={<GeoFencing />} />
        <Route path="/digital-id" element={<DigitalID />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  )
}

export default App
