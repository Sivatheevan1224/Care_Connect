import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import DoctorsPage from './pages/DoctorsPage'
import PatientLayout from './layouts/PatientLayout'
import Dashboard from './pages/patient/Dashboard'
import BookAppointment from './pages/patient/BookAppointment'
import FindDoctors from './pages/patient/FindDoctors'
import MyAppointments from './pages/patient/MyAppointments'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorsPage />} />

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments/book" element={<BookAppointment />} />
          <Route path="doctors/check" element={<FindDoctors />} />
          <Route path="appointments" element={<MyAppointments />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
