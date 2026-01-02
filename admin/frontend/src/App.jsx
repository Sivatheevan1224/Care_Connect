import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import ManageDoctors from './pages/ManageDoctors'
import ManagePatients from './pages/ManagePatients'
import ManageAppointments from './pages/ManageAppointments'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<ManageDoctors />} />
          <Route path="/patients" element={<ManagePatients />} />
          <Route path="/appointments" element={<ManageAppointments />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
