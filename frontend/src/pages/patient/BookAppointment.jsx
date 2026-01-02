import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BookAppointment = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Redirect if no doctor selected
  useEffect(() => {
    if (!location.state?.doctorName) {
      navigate('/patient/doctors/check')
    }
  }, [location, navigate])

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: location.state?.doctorName || '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    priority: 'Normal'
  })

  if (!location.state?.doctorName) {
    return null // or a loading spinner while redirecting
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Appointment Data:', formData)
    // Handle form submission
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book New Appointment</h1>
        <p className="text-gray-600">Scheduling visit with <span className="font-semibold text-teal-600">{formData.doctor}</span></p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Name Display */}
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-full text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" /></svg>
            </div>
            <div>
              <p className="text-sm text-teal-600 font-medium">Selected Specialist</p>
              <p className="text-lg font-bold text-teal-900">{formData.doctor}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time *
              </label>
              <select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
              >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
            >
              <option value="Normal">Normal Checkup</option>
              <option value="Urgent">Urgent Issue</option>
              <option value="Follow-up">Follow-up Visit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reason for Visit *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition resize-none"
              placeholder="Please briefly describe your symptoms or reason for visiting"
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookAppointment
