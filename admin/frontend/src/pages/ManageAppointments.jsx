import React, { useState } from 'react'
import Modal from '../components/Modal'

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: 'John Smith',
            doctor: 'Dr. Sarah Johnson',
            date: '2024-01-20',
            time: '10:00 AM',
            status: 'Scheduled',
            reason: 'Regular Checkup'
        },
        {
            id: 2,
            patientName: 'Sarah Williams',
            doctor: 'Dr. Michael Chen',
            date: '2024-01-21',
            time: '02:00 PM',
            status: 'Pending',
            reason: 'Cardiology Consultation'
        },
        {
            id: 3,
            patientName: 'David Brown',
            doctor: 'Dr. Emily Roberts',
            date: '2024-01-22',
            time: '11:00 AM',
            status: 'Completed',
            reason: 'Pediatric Checkup'
        }
    ])

    const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null })

    const handleStatusChange = (appointment, newStatus) => {
        setConfirmModal({
            isOpen: true,
            title: 'Update Appointment Status',
            message: `Are you sure you want to change the status to ${newStatus}?`,
            onConfirm: () => {
                setAppointments(appointments.map(app =>
                    app.id === appointment.id ? { ...app, status: newStatus } : app
                ))
                setConfirmModal({ ...confirmModal, isOpen: false })
            }
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Scheduled': return 'bg-blue-100 text-blue-600'
            case 'Completed': return 'bg-green-100 text-green-600'
            case 'Pending': return 'bg-yellow-100 text-yellow-600'
            case 'Cancelled': return 'bg-red-100 text-red-600'
            default: return 'bg-gray-100 text-gray-600'
        }
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
                            {appointments.map((appointment) => (
                                <tr key={appointment.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">#{appointment.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{appointment.patientName}</td>
                                    <td className="px-6 py-4 text-sm text-teal-600 font-medium">{appointment.doctor}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {appointment.date}<br />
                                        <span className="text-xs">{appointment.time}</span>
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
                                                    onClick={() => handleStatusChange(appointment, 'Scheduled')}
                                                    className="px-3 py-1 bg-green-100 text-green-600 hover:bg-green-200 rounded text-xs font-semibold transition"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {appointment.status !== 'Cancelled' && (
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
