import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAppointments, cancelAppointment } from "../../services/api";

const AppointmentsList = () => {
  const { token } = useAuth();
  const [filterStatus, setFilterStatus] = useState("All");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments(token);
      setAppointments(data.appointments);
      setError(null);
    } catch (err) {
      setError("Failed to load appointments");
      console.error("Error loading appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      setCancellingId(appointmentId);
      await cancelAppointment(appointmentId, token);
      // Refresh appointments list
      await fetchAppointments();
      alert("Appointment cancelled successfully");
    } catch (err) {
      alert(err.message || "Failed to cancel appointment");
    } finally {
      setCancellingId(null);
    }
  };

  const filteredAppointments =
    filterStatus === "All"
      ? appointments
      : appointments.filter((app) => app.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Appointments
        </h1>
        <p className="text-gray-600">Track your medical visits</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">
            Filter by Status:
          </span>
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  filterStatus === status
                    ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500">
            You haven't booked any appointments yet.
          </p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {filterStatus.toLowerCase()} appointments
          </h3>
          <p className="text-gray-500">
            You don't have any appointments with this status.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Doctor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-teal-600">
                        {appointment.doctor?.name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {appointment.doctor?.specialization || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(appointment.date)}
                      <br />
                      <span className="text-xs font-semibold text-teal-600">
                        {appointment.timeSlot}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {appointment.reason || "Not specified"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {(appointment.status === "Pending" ||
                          appointment.status === "Confirmed") && (
                          <button
                            onClick={() =>
                              handleCancelAppointment(appointment._id)
                            }
                            disabled={cancellingId === appointment._id}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                              cancellingId === appointment._id
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            {cancellingId === appointment._id
                              ? "Cancelling..."
                              : "Cancel"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
