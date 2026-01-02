import React from 'react'
import Doctors from '../components/sections/Doctors'

const DoctorsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      {/* Simple Header */}
      <nav className="flex items-center justify-between w-full py-4 px-4 md:px-8 lg:px-12 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">CareConnect</span>
        </div>
        <a href="/" className="text-gray-700 hover:text-teal-600 transition font-medium">
          ← Back to Home
        </a>
      </nav>
      
      {/* Doctors Section - Full Page */}
      <Doctors isFullPage={true} />
    </div>
  )
}

export default DoctorsPage
