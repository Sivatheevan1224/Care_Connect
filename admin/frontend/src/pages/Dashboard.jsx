import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    appointmentsToday: 0,
    activeSpecializations: 0,
    doctorsThisMonth: 0,
    patientsThisMonth: 0,
    appointmentChange: "0%",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem("adminToken");
    if (!token) {
      // Redirect to main app login if no token
      window.location.href = "http://localhost:5173";
      return;
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data.stats);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard statistics");
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      change: `+${stats.doctorsThisMonth} this month`,
      color: "from-purple-500 to-indigo-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Total Patients",
      value: stats.totalPatients,
      change: `+${stats.patientsThisMonth} this month`,
      color: "from-blue-500 to-cyan-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      title: "Active Specializations",
      value: stats.activeSpecializations,
      change: "All operational",
      color: "from-teal-500 to-green-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: "Appointments Today",
      value: stats.appointmentsToday,
      change: `${stats.appointmentChange} from yesterday`,
      color: "from-orange-500 to-red-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-r ${stat.color} p-6`}>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-xs font-semibold uppercase tracking-wide mb-2">
                    {stat.title}
                  </p>
                  <h3 className="text-white text-4xl font-bold">
                    {stat.value}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">{stat.icon}</div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white">
              <p className="text-sm text-gray-600 font-medium">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
