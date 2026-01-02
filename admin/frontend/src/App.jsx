import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ManageDoctors from "./pages/ManageDoctors";
import ManagePatients from "./pages/ManagePatients";
import ManageAppointments from "./pages/ManageAppointments";

function TokenHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token to localStorage
      localStorage.setItem("adminToken", token);
      // Remove token from URL for security
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <TokenHandler />
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
  );
}

export default App;
