import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Modal from './Modal'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  
  const [showLogoutModal, setShowLogoutModal] = React.useState(false)

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      name: 'Manage Doctors',
      path: '/doctors',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      name: 'Manage Patients',
      path: '/patients',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
  ]

  const navigate = useNavigate()

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.href = import.meta.env.VITE_PATIENT_APP_URL || 'http://localhost:5173/'
  }

  return (
    <>
      <aside className={`w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">CareConnect</h2>
                <p className="text-xs text-purple-300">Admin Portal</p>
              </div>
            </Link>
            <button onClick={onClose} className="md:hidden text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                   if (window.innerWidth < 768) onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${location.pathname === item.path
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/10'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/20">
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        actions={
          <>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </>
        }
      >
        <p className="text-gray-600">Are you sure you want to log out of the admin portal?</p>
      </Modal>
    </>
  )
}

export default Sidebar
