import React, { useState } from 'react'

const AppointmentsList = () => {
  const [filterStatus, setFilterStatus] = useState('All')

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      doctor: 'Dr. Sarah Johnson',
      date: '2026-01-03',
      time: '10:00 AM',
      status: 'Scheduled',
      reason: 'General Checkup'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctor: 'Dr. Michael Chen',
      date: '2026-01-03',
      time: '11:00 AM',
      status: 'Completed',
      reason: 'Heart Pain'
    },
    {
      id: 3,
      patientName: 'Bob Wilson',
      doctor: 'Dr. Emily Roberts',
      date: '2026-01-03',
      time: '02:00 PM',
      status: 'Pending',
      reason: 'Child Vaccination'
    },
    {
      id: 4,
      patientName: 'Alice Brown',
      doctor: 'Dr. Sarah Johnson',
      date: '2026-01-04',
      time: '09:00 AM',
      status: 'Scheduled',
      reason: 'Follow-up'
    },
    {
      id: 5,
      patientName: 'Charlie Davis',
      doctor: 'Dr. Michael Chen',
      date: '2026-01-04',
      time: '10:00 AM',
      status: 'Cancelled',
      reason: 'Chest Pain'
    }
  ]

  const filteredAppointments = filterStatus === 'All'
    ? appointments
    : appointments.filter(app => app.status === filterStatus)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-600'
      case 'Completed': return 'bg-green-100 text-green-600'
      case 'Pending': return 'bg-yellow-100 text-yellow-600'
      case 'Cancelled': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
        <p className="text-gray-600">Track your medical visits</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Filter by Status:</span>
          {['All', 'Scheduled', 'Pending', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${filterStatus === status
                  ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Reason</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">#{appointment.id}</td>
                  <td className="px-6 py-4 text-sm text-teal-600 font-medium">{appointment.doctor}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {appointment.date}<br />
                    <span className="text-xs">{appointment.time}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsList
