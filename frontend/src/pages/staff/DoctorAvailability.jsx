import React, { useState } from 'react'

const DoctorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All')

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      availability: {
        Monday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        Wednesday: ['09:00', '10:00', '14:00', '15:00', '16:00'],
        Friday: ['09:00', '10:00', '11:00', '14:00']
      },
      status: 'Available'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      availability: {
        Tuesday: ['10:00', '11:00', '14:00', '15:00'],
        Thursday: ['09:00', '10:00', '14:00', '15:00', '16:00'],
        Saturday: ['09:00', '10:00', '11:00']
      },
      status: 'Available'
    },
    {
      id: 3,
      name: 'Dr. Emily Roberts',
      specialization: 'Pediatrics',
      availability: {
        Monday: ['10:00', '11:00', '14:00', '15:00'],
        Wednesday: ['09:00', '10:00', '11:00', '14:00'],
        Friday: ['10:00', '11:00', '14:00', '15:00', '16:00']
      },
      status: 'Busy'
    }
  ]

  const specializations = ['All', 'General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics']

  const filteredDoctors = selectedSpecialization === 'All'
    ? doctors
    : doctors.filter(doc => doc.specialization === selectedSpecialization)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Availability</h1>
        <p className="text-gray-600">Check and manage doctor schedules</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization
            </label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4">
              <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
              <p className="text-teal-100 text-sm">{doctor.specialization}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  doctor.status === 'Available' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {doctor.status}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Weekly Schedule:</h4>
                <div className="space-y-2">
                  {Object.entries(doctor.availability).map(([day, slots]) => (
                    <div key={day} className="bg-gray-50 p-2 rounded">
                      <span className="text-xs font-semibold text-teal-600">{day}:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {slots.map(slot => (
                          <span key={slot} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm">
                View Full Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAvailability
