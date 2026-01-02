import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { getAllPatients, updatePatientStatus } from '../services/api'

const ManagePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Modal States
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await getAllPatients()
      if (response.patients) {
        setPatients(response.patients)
      }
    } catch (err) {
      console.error('Error fetching patients:', err)
      setError('Failed to load patients')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = (id) => {
    const patient = patients.find(p => p._id === id);
    const newStatus = patient.status === 'Active' ? 'Inactive' : 'Active';
    
    setConfirmModal({
      isOpen: true,
      title: 'Change Status',
      message: `Are you sure you want to change this patient's status to ${newStatus}?`,
      onConfirm: async () => {
        try {
          await updatePatientStatus(id, newStatus);
          // Update local state
          setPatients(patients.map(p => 
            p._id === id ? { ...p, status: newStatus } : p
          ));
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error('Error updating patient status:', error);
          alert('Failed to update patient status. Please try again.');
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-gray-600">Loading patients...</div>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Patients</h1>
        <p className="text-gray-600">View and manage registered patients</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((member, index) => (
                <tr key={member._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">#{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                      {member.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleStatus(member._id)}
                        className={`p-2 rounded-lg transition ${member.status === 'Active' ? 'text-orange-500 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                        title={member.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                      >
                        {member.status === 'Active' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
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
              Confirm
            </button>
          </>
        }
      >
        <p className="text-gray-600">{confirmModal.message}</p>
      </Modal>
    </div >
  )
}

export default ManagePatients
