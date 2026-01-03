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
  const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    experience: '',
    hospital: '',
    status: 'Active'
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddDoctor = async (e) => {
    e.preventDefault()
    try {
      const doctorFormData = new FormData()
      doctorFormData.append('name', formData.name)
      doctorFormData.append('specialization', formData.specialization)
      doctorFormData.append('phone', formData.phone)
      doctorFormData.append('email', formData.email)
      doctorFormData.append('experience', formData.experience)
      doctorFormData.append('hospital', formData.hospital)
      doctorFormData.append('status', formData.status)
      if (imageFile) {
        doctorFormData.append('image', imageFile)
      }

      const response = await addDoctor(doctorFormData)
      if (response.doctor) {
        await fetchDoctors() // Refresh the list
        setFormData({ name: '', specialization: '', phone: '', email: '', experience: '', hospital: '', status: 'Active' })
        setImageFile(null)
        setImagePreview(null)
        setShowAddForm(false)
        setSuccessModal({ isOpen: true, message: 'Doctor added successfully!' })
      }
    } catch (err) {
      console.error('Error adding doctor:', err)
      setErrorModal({ isOpen: true, message: err.message || 'Failed to add doctor. Please try again.' })
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
    setImagePreview(doctor.image || null)
    setImageFile(null)
    setShowAddForm(true)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUpdateDoctor = async (e) => {
    e.preventDefault()
    try {
      const doctorFormData = new FormData()
      doctorFormData.append('name', formData.name)
      doctorFormData.append('specialization', formData.specialization)
      doctorFormData.append('phone', formData.phone)
      doctorFormData.append('email', formData.email)
      doctorFormData.append('experience', formData.experience)
      doctorFormData.append('hospital', formData.hospital)
      doctorFormData.append('status', formData.status)
      if (imageFile) {
        doctorFormData.append('image', imageFile)
      }

      await updateDoctor(editingDoctor._id, doctorFormData)
      await fetchDoctors() // Refresh the list
      setFormData({ name: '', specialization: '', phone: '', email: '', experience: '', hospital: '', status: 'Active' })
      setImageFile(null)
      setImagePreview(null)
      setShowAddForm(false)
      setEditingDoctor(null)
      setSuccessModal({ isOpen: true, message: 'Doctor updated successfully!' })
    } catch (err) {
      console.error('Error updating doctor:', err)
      setErrorModal({ isOpen: true, message: err.message || 'Failed to update doctor. Please try again.' })
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
          setSuccessModal({ isOpen: true, message: 'Doctor deleted successfully!' });
        } catch (err) {
          console.error('Error deleting doctor:', err);
          setErrorModal({ isOpen: true, message: err.message || 'Failed to delete doctor. Please try again.' });
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
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
                  <div className="flex items-center gap-6">
                    {imagePreview ? (
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-purple-200 shadow-md">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null)
                            setImagePreview(editingDoctor?.image || null)
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border-2 border-dashed border-purple-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="file"
                          id="imageUpload"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="imageUpload"
                          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          {imagePreview ? 'Change Image' : 'Upload Image'}
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        <span className="font-semibold">Supported formats:</span> JPG, PNG, GIF (Max 5MB)
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Recommended size: 400x400px for best results
                      </p>
                    </div>
                  </div>
                </div>
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
                  setImageFile(null)
                  setImagePreview(null)
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

      {/* Success Modal */}
      <Modal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: '' })}
        title="Success"
        actions={
          <button
            onClick={() => setSuccessModal({ isOpen: false, message: '' })}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            OK
          </button>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <p className="text-gray-600 text-lg">{successModal.message}</p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        title="Error"
        actions={
          <button
            onClick={() => setErrorModal({ isOpen: false, message: '' })}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            OK
          </button>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <p className="text-gray-600 text-lg">{errorModal.message}</p>
        </div>
      </Modal>
    </div >
  )
}

export default ManageDoctors
