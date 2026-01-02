import React, { useState } from 'react'

const ManageStaff = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Receptionist',
      phone: '+1 234 567 8904',
      email: 'john.smith@careconnect.com',
      joinDate: '2024-01-15',
      status: 'Active',
      password: 'password123'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Nurse',
      phone: '+1 234 567 8905',
      email: 'sarah.williams@careconnect.com',
      joinDate: '2024-03-20',
      status: 'Active',
      password: 'careconnect_secure'
    },
    {
      id: 3,
      name: 'David Brown',
      role: 'Administrator',
      phone: '+1 234 567 8906',
      email: 'david.brown@careconnect.com',
      joinDate: '2023-11-10',
      status: 'Active',
      password: 'admin_pass_2024'
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    joinDate: '',
    status: 'Active'
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddStaff = (e) => {
    e.preventDefault()
    
    // Generate a random password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newStaff = {
      id: staff.length + 1,
      ...formData,
      password: password // In a real app, send to backend to hash
    }
    
    setStaff([...staff, newStaff])
    setFormData({ name: '', role: '', phone: '', email: '', joinDate: '', status: 'Active' })
    setShowAddForm(false)
    
    // Show the generated password to the admin
    alert(`Staff Member Added Automatically!\n\nCredentials for Login:\nEmail: ${formData.email}\nPassword: ${password}\n\nPlease share this password with the staff member securely.`);
  }

  const handleEditStaff = (member) => {
    setEditingStaff(member)
    setFormData(member)
    setShowAddForm(true)
  }

  const handleUpdateStaff = (e) => {
    e.preventDefault()
    setStaff(staff.map(s => s.id === editingStaff.id ? { ...formData, id: editingStaff.id } : s))
    setFormData({ name: '', role: '', phone: '', email: '', joinDate: '', status: 'Active' })
    setShowAddForm(false)
    setEditingStaff(null)
  }

  const handleToggleStatus = (id) => {
    if (window.confirm('Are you sure you want to change the status of this staff member?')) {
      setStaff(staff.map(s => {
        if (s.id === id) {
          return {
            ...s,
            status: s.status === 'Active' ? 'Inactive' : 'Active'
          }
        }
        return s
      }))
    }
  }

  const handleViewCredentials = (member) => {
    alert(`Staff Credentials:\n\nName: ${member.name}\nRole: ${member.role}\nEmail: ${member.email}\nPassword: ${member.password || 'Not set'}`);
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Staff</h1>
          <p className="text-gray-600">Add, edit, or remove staff members</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingStaff(null)
            setFormData({ name: '', role: '', phone: '', email: '', joinDate: '', status: 'Active' })
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add New Staff
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h2>
          <form onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role*</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Pharmacist">Pharmacist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date*</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status*</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {editingStaff ? 'Update Staff' : 'Add Staff'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingStaff(null)
                  setFormData({ name: '', role: '', phone: '', email: '', joinDate: '', status: 'Active' })
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">#{member.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewCredentials(member)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        title="View Credentials"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditStaff(member)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleToggleStatus(member.id)}
                        className={`p-2 rounded-lg transition ${member.status === 'Active' ? 'text-orange-500 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                        title={member.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                      >
                        {member.status === 'Active' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageStaff
