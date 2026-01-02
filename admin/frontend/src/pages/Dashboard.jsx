import React from 'react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Doctors',
      value: '45',
      change: '+5 this month',
      color: 'from-purple-500 to-indigo-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: 'Total Staff',
      value: '12',
      change: '+2 this month',
      color: 'from-blue-500 to-cyan-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      )
    },
    {
      title: 'Active Specializations',
      value: '8',
      change: 'All operational',
      color: 'from-teal-500 to-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    },
    {
      title: 'Appointments Today',
      value: '128',
      change: '+15% from yesterday',
      color: 'from-orange-500 to-red-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    }
  ]

  const recentActivities = [
    { action: 'New doctor added', name: 'Dr. James Wilson', time: '2 hours ago', type: 'doctor' },
    { action: 'Staff member updated', name: 'Sarah Johnson', time: '3 hours ago', type: 'staff' },
    { action: 'Doctor profile edited', name: 'Dr. Emily Roberts', time: '5 hours ago', type: 'doctor' },
    { action: 'New staff added', name: 'Michael Chen', time: '1 day ago', type: 'staff' }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className={`bg-gradient-to-r ${stat.color} p-6`}>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-xs font-semibold uppercase tracking-wide mb-2">{stat.title}</p>
                  <h3 className="text-white text-4xl font-bold">{stat.value}</h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {stat.icon}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white">
              <p className="text-sm text-gray-600 font-medium">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
            Recent Activities
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <div className={`p-3 rounded-xl ${activity.type === 'doctor' ? 'bg-purple-100' : 'bg-blue-100'} flex-shrink-0`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activity.type === 'doctor' ? '#7c3aed' : '#2563eb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-base">{activity.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.name}</p>
                </div>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span className="font-bold text-base">Add Doctor</span>
            </button>
            <button className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span className="font-bold text-base">Add Staff</span>
            </button>
            <button className="p-6 bg-gradient-to-br from-teal-500 to-green-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              <span className="font-bold text-base">View Reports</span>
            </button>
            <button className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="font-bold text-base">Schedules</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
