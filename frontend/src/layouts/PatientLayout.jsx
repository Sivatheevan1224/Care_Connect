import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/patient/Sidebar'

const PatientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-40 px-4 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-1.5 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
               <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
             </svg>
           </div>
           <span className="font-bold text-gray-800">CareConnect</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 w-full md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-hidden transition-all duration-300">
        <Outlet />
      </main>
    </div>
  )
}

export default PatientLayout
