import React, { useState } from 'react'

const AssignDoctor = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  const pendingAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2026-01-03',
      time: '10:00 AM',
      reason: 'General Checkup',
      priority: 'Normal'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2026-01-03',
      time: '11:00 AM',
      reason: 'Heart Pain',
      priority: 'Urgent'
    },
    {
      id: 3,
      patientName: 'Bob Wilson',
      date: '2026-01-03',
      time: '02:00 PM',
      reason: 'Child Vaccination',
      priority: 'Normal'
    }
  ]

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      nextAvailable: '10:00 AM',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0d9488&color=fff&size=100'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      nextAvailable: '11:00 AM',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2563eb&color=fff&size=100'
    },
    {
      id: 3,
      name: 'Dr. Emily Roberts',
      specialization: 'Pediatrics',
      nextAvailable: '02:00 PM',
      image: 'https://ui-avatars.com/api/?name=Emily+Roberts&background=0891b2&color=fff&size=100'
    }
  ]

  const handleAssign = (doctorId) => {
    console.log(`Assigned appointment ${selectedAppointment} to doctor ${doctorId}`)
    setSelectedAppointment(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Assign Doctors</h1>
        <p className="text-gray-600">Assign available doctors to pending appointments</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Appointments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Pending Appointments
          </h2>
          <div className="space-y-3">
            {pendingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => setSelectedAppointment(appointment.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  selectedAppointment === appointment.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{appointment.patientName}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    appointment.priority === 'Urgent'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {appointment.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Doctors */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Available Doctors
          </h2>
          {!selectedAppointment ? (
            <div className="text-center py-12 text-gray-500">
              <p>Select an appointment to see available doctors</p>
            </div>
          ) : (
            <div className="space-y-3">
              {availableDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-4 rounded-lg border-2 border-gray-200 hover:border-teal-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-teal-600 font-semibold">{doctor.specialization}</p>
                      <p className="text-xs text-gray-500">Next available: {doctor.nextAvailable}</p>
                    </div>
                    <button
                      onClick={() => handleAssign(doctor.id)}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-lg transition text-sm"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignDoctor
