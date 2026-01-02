import React from 'react'

const Features = () => {
  return (
    <section id="features" className="w-full py-20 px-8 bg-white">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage community healthcare efficiently
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">
          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Easy to Use</h4>
            <p className="text-sm text-gray-600">Simple interface for staff and patients</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Secure & Private</h4>
            <p className="text-sm text-gray-600">Patient data protection guaranteed</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-cyan-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Fast & Reliable</h4>
            <p className="text-sm text-gray-600">Quick response and uptime</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Multi-User</h4>
            <p className="text-sm text-gray-600">For staff, doctors, and patients</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features