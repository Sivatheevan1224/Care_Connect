import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { getAllAppointments, updateAppointmentStatus } from '../services/api'

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null })

    useEffect(() => {
        fetchAppointments()
    }, [])

    const fetchAppointments = async () => {
        try {
            setLoading(true)
            const response = await getAllAppointments()
            if (response.appointments) {
                setAppointments(response.appointments)
            }
        } catch (err) {
            console.error('Error fetching appointments:', err)
            setError('Failed to load appointments')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = (appointment, newStatus) => {
        setConfirmModal({
            isOpen: true,
            title: 'Update Appointment Status',
            message: `Are you sure you want to change the status to ${newStatus}?`,
            onConfirm: async () => {
                try {
                    await updateAppointmentStatus(appointment._id, newStatus)
                    await fetchAppointments() // Refresh the list
                    setConfirmModal({ ...confirmModal, isOpen: false })
                } catch (err) {
                    console.error('Error updating appointment:', err)
                    alert('Failed to update appointment status')
                    setConfirmModal({ ...confirmModal, isOpen: false })
                }
            }
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-600'
            case 'Completed': return 'bg-green-100 text-green-600'
            case 'Pending': return 'bg-yellow-100 text-yellow-600'
            case 'Cancelled': return 'bg-red-100 text-red-600'
            default: return 'bg-gray-100 text-gray-600'
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-xl text-gray-600">Loading appointments...</div>
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Appointments</h1>
                <p className="text-gray-600">View and manage patient appointments</p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Patient</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Doctor</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Date & Time</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {appointments.map((appointment, index) => (
                                <tr key={appointment._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">#{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                                        {appointment.patient?.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-teal-600 font-medium">
                                        {appointment.doctor?.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(appointment.date).toLocaleDateString()}<br />
                                        <span className="text-xs">{appointment.time || 'N/A'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {appointment.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleStatusChange(appointment, 'Confirmed')}
                                                    className="px-3 py-1 bg-green-100 text-green-600 hover:bg-green-200 rounded text-xs font-semibold transition"
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                            {appointment.status === 'Confirmed' && (
                                                <button
                                                    onClick={() => handleStatusChange(appointment, 'Completed')}
                                                    className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded text-xs font-semibold transition"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                                                <button
                                                    onClick={() => handleStatusChange(appointment, 'Cancelled')}
                                                    className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded text-xs font-semibold transition"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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
                            No, Keep it
                        </button>
                        <button
                            onClick={confirmModal.onConfirm}
                            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-medium"
                        >
                            Yes, Update
                        </button>
                    </>
                }
            >
                <p className="text-gray-600">{confirmModal.message}</p>
            </Modal>
        </div>
    )
}

export default ManageAppointments
