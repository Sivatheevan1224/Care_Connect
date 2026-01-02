import React, { useState } from 'react'

const Doctors = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('All')

  const specializations = [
    { name: 'All', icon: '👨‍⚕️' },
    { name: 'General Medicine', icon: '🩺' },
    { name: 'Cardiology', icon: '❤️' },
    { name: 'Pediatrics', icon: '👶' },
    { name: 'Orthopedics', icon: '🦴' },
    { name: 'Dermatology', icon: '💆' },
    { name: 'Neurology', icon: '🧠' },
  ]

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      experience: '12 years',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0d9488&color=fff&size=200',
      available: 'Mon, Wed, Fri'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      experience: '15 years',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2563eb&color=fff&size=200',
      available: 'Tue, Thu, Sat'
    },
    {
      id: 3,
      name: 'Dr. Emily Roberts',
      specialization: 'Pediatrics',
      experience: '10 years',
      image: 'https://ui-avatars.com/api/?name=Emily+Roberts&background=0891b2&color=fff&size=200',
      available: 'Mon, Wed, Fri'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialization: 'Orthopedics',
      experience: '18 years',
      image: 'https://ui-avatars.com/api/?name=James+Wilson&background=0d9488&color=fff&size=200',
      available: 'Mon - Fri'
    },
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      specialization: 'Dermatology',
      experience: '8 years',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=2563eb&color=fff&size=200',
      available: 'Tue, Thu, Sat'
    },
    {
      id: 6,
      name: 'Dr. David Martinez',
      specialization: 'Neurology',
      experience: '14 years',
      image: 'https://ui-avatars.com/api/?name=David+Martinez&background=0891b2&color=fff&size=200',
      available: 'Mon, Wed, Fri'
    },
    {
      id: 7,
      name: 'Dr. Lisa Anderson',
      specialization: 'General Medicine',
      experience: '9 years',
      image: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=0d9488&color=fff&size=200',
      available: 'Tue - Sat'
    },
    {
      id: 8,
      name: 'Dr. Robert Lee',
      specialization: 'Cardiology',
      experience: '16 years',
      image: 'https://ui-avatars.com/api/?name=Robert+Lee&background=2563eb&color=fff&size=200',
      available: 'Mon, Wed, Fri'
    },
  ]

  const filteredDoctors = selectedSpecialization === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialization === selectedSpecialization)

  return (
    <section id="doctors" className="w-full py-20 px-8 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Expert Doctors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of healthcare professionals committed to your well-being
          </p>
        </div>

        {/* Specialization Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {specializations.map((spec) => (
            <button
              key={spec.name}
              onClick={() => setSelectedSpecialization(spec.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedSpecialization === spec.name
                  ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600 shadow-md'
              }`}
            >
              <span className="text-xl">{spec.icon}</span>
              <span>{spec.name}</span>
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                <div className="flex items-center gap-2 text-teal-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  <span className="font-semibold text-sm">{doctor.specialization}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span className="text-sm">{doctor.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="text-sm">{doctor.available}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found for this specialization.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Doctors
