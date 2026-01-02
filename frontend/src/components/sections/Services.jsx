import React from 'react'

const Services = () => {
  return (
    <section id="services" className="w-full py-20 px-8 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare management solutions for community clinics
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Appointment Management</h3>
            <p className="text-gray-600">
              Book, manage, and track appointments easily. Reduce wait times and improve patient flow.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Patient Records</h3>
            <p className="text-gray-600">
              Maintain secure digital patient records with visit history and basic health information.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <div className="bg-gradient-to-br from-cyan-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Health Awareness</h3>
            <p className="text-gray-600">
              Share verified health tips, preventive care info, and community health alerts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services