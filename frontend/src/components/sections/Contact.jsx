import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="w-full py-20 px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any inquiries or support
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Phone</h4>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Email</h4>
              <p className="text-gray-600">support@careconnect.com</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Location</h4>
              <p className="text-gray-600">Community Health Center</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" />
              </div>
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" />
              <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"></textarea>
              <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact