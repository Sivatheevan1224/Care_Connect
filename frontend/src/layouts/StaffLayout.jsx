import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/staff/Sidebar'

const StaffLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default StaffLayout
