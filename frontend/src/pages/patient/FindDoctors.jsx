import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FindDoctors = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
      experience: '15+ Years',
      education: 'MBBS, MD - General Medicine',
      languages: ['English', 'Spanish'],
      bio: 'Dr. Sarah Johnson is a compassionate General Physician with over 15 years of experience. She specializes in preventive medicine and managing chronic conditions.',
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
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
      experience: '12+ Years',
      education: 'MBBS, DM - Cardiology',
      languages: ['English', 'Mandarin'],
      bio: 'Dr. Michael Chen is a renowned Interventional Cardiologist. He has performed over 1000 successful cardiac procedures and is an expert in managing heart failure.',
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
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
      experience: '10+ Years',
      education: 'MBBS, MD - Pediatrics',
      languages: ['English', 'German'],
      bio: 'Dr. Emily Roberts loves working with children. Her friendly approach makes her a favorite among kids. She has extensive experience in neonatal care.',
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

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const handleProceedToBook = () => {
    if (selectedDoctor) {
      navigate('/patient/appointments/book', { state: { doctorName: selectedDoctor.name } })
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find a Doctor</h1>
        <p className="text-gray-600">Browse our specialists and check their availability</p>
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
          <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4">
              <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
              <p className="text-teal-100 text-sm">{doctor.specialization}</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doctor.status === 'Available'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-yellow-100 text-yellow-600'
                  }`}>
                  {doctor.status}
                </span>
              </div>

              <div className="mb-4 flex-1">
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{doctor.bio}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {doctor.experience} Experience
                </div>
              </div>

              <button
                onClick={() => handleBookNow(doctor)}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm mt-auto"
              >
                View Profile & Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedDoctor(null)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto">

            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white relative">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <div className="flex items-center gap-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-24 h-24 rounded-full border-4 border-white/30 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                  <p className="text-teal-100 text-lg">{selectedDoctor.specialization}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Education</h3>
                  <p className="text-gray-800 font-medium">{selectedDoctor.education}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Experience</h3>
                  <p className="text-gray-800 font-medium">{selectedDoctor.experience}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Languages</h3>
                  <p className="text-gray-800 font-medium">{selectedDoctor.languages.join(', ')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Consultation Fee</h3>
                  <p className="text-gray-800 font-medium">$150 / Visit</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">About Doctor</h3>
                <p className="text-gray-600 leading-relaxed">{selectedDoctor.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Availability</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.keys(selectedDoctor.availability).map((day) => (
                    <div key={day} className="border border-gray-200 rounded-lg p-3 text-center">
                      <span className="block text-sm font-bold text-teal-600 mb-1">{day}</span>
                      <span className="text-xs text-gray-500">{selectedDoctor.availability[day].length} Slots</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleProceedToBook}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition transform active:scale-95"
                >
                  Book Appointment
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default FindDoctors
