import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { getAllDoctors, addDoctor, updateDoctor, deleteDoctor } from '../services/api'

const ManageDoctors = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Modal State
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    experience: '',
    hospital: '',
    status: 'Active'
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await getAllDoctors()
      if (response.doctors) {
        setDoctors(response.doctors)
      }
    } catch (err) {
      console.error('Error fetching doctors:', err)
      setError('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddDoctor = async (e) => {
    e.preventDefault()
    try {
      const response = await addDoctor(formData)
      if (response.doctor) {
        await fetchDoctors() // Refresh the list
        setFormData({ name: '', specialization: '', phone: '', email: '', experience: '', hospital: '', status: 'Active' })
        setShowAddForm(false)
      }
    } catch (err) {
      console.error('Error adding doctor:', err)
      alert('Failed to add doctor: ' + err.message)
    }
  }

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor)
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
      experience: doctor.experience,
      hospital: doctor.hospital || '',
      status: doctor.status || 'Active'
    })
    setShowAddForm(true)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUpdateDoctor = async (e) => {
    e.preventDefault()
    try {
      await updateDoctor(editingDoctor._id, formData)
      await fetchDoctors() // Refresh the list
      setFormData({ name: '', specialization: '', phone: '', email: '', experience: '', hospital: '', status: 'Active' })
      setShowAddForm(false)
      setEditingDoctor(null)
    } catch (err) {
      console.error('Error updating doctor:', err)
      alert('Failed to update doctor: ' + err.message)
    }
  }

  const handleDeleteDoctor = (doctorId) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Doctor',
      message: 'Are you sure you want to delete this doctor? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteDoctor(doctorId);
          await fetchDoctors(); // Refresh the list
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        } catch (err) {
          console.error('Error deleting doctor:', err);
          alert('Failed to delete doctor: ' + err.message);
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-gray-600">Loading doctors...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Doctors</h1>
          <p className="text-gray-600">Add, edit, or remove doctor profiles</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingDoctor(null)
            setFormData({ name: '', specialization: '', phone: '', email: '', experience: '', status: 'Active' })
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Doctor
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
          </h2>
          <form onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization*</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 years"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  placeholder="e.g., City General Hospital"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status*</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingDoctor(null)
                  setFormData({ name: '', specialization: '', phone: '', email: '', experience: '', hospital: '', status: 'Active' })
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
            <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Specialization</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Experience</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doctors.map((doctor, index) => (
                <tr key={doctor._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">#{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{doctor.name}</td>
                  <td className="px-6 py-4 text-sm text-purple-600 font-medium">{doctor.specialization}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doctor.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doctor.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doctor.experience}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doctor.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                      {doctor.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditDoctor(doctor)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteDoctor(doctor._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        title={confirmModal.title}
        actions={
          <>
            <button
              onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmModal.onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-gray-600">{confirmModal.message}</p>
      </Modal>
    </div >
  )
}

export default ManageDoctors
