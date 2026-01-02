import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDetail from "./pages/DoctorDetail";
import StaffLayout from "./layouts/StaffLayout";
import Dashboard from "./pages/staff/Dashboard";
import AddAppointment from "./pages/staff/AddAppointment";
import DoctorAvailability from "./pages/staff/DoctorAvailability";
import AssignDoctor from "./pages/staff/AssignDoctor";
import AppointmentsList from "./pages/staff/AppointmentsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="doctors/availability" element={<DoctorAvailability />} />
          <Route path="appointments/assign" element={<AssignDoctor />} />
          <Route path="appointments" element={<AppointmentsList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
