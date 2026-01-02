import React, { useState } from 'react'

const PatientDashboard = () => {
  // Mock data based on provided schema
  const [patient, setPatient] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    age: 32,
    gender: 'Male',
    address: '123 Health St, Wellness City',
    medicalHistory: ['Hypertension', 'Seasonal Allergies'],
    doctor: 'Dr. Sarah Johnson'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...patient })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setPatient(formData)
    setIsEditing(false)
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and medical history</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${isEditing
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center p-8">
            <div className="w-32 h-32 bg-teal-100 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-teal-600 mb-4">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
            <p className="text-gray-500 mb-4">{patient.email}</p>

            <div className="flex justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                {patient.gender}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                {patient.age} Years Old
              </span>
            </div>

            <div className="border-t pt-6 text-left">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Assigned Doctor</p>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <span className="font-medium text-gray-700">{patient.doctor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form/View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              Personal Details
            </h3>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={isEditing ? formData.name : patient.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing ? 'border-teal-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={isEditing ? formData.email : patient.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing ? 'border-teal-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={isEditing ? formData.phone : patient.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing ? 'border-teal-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={isEditing ? formData.age : patient.age}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing ? 'border-teal-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-teal-500 rounded-lg focus:outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={patient.gender}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={isEditing ? formData.address : patient.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  rows="2"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing ? 'border-teal-500 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Medical History</label>
                <div className={`w-full px-4 py-3 border rounded-lg ${isEditing ? 'border-teal-500 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                        {item}
                      </span>
                    ))}
                    {patient.medicalHistory.length === 0 && <span className="text-gray-400 italic">No history recorded</span>}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PatientDashboard
