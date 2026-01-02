import React from 'react'

const AboutContact = () => {
  return (
    <section id="about" className="w-full py-20 px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* About Section - Left Side */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">About CareConnect</h2>
              <p className="text-lg text-gray-600">
                Digitizing community healthcare to improve accessibility, efficiency, and well-being
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl shadow-md">
                <div className="text-teal-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To transform community healthcare centers by providing accessible, efficient digital solutions that improve patient care, reduce waiting times, and promote preventive health awareness.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-md">
                <div className="text-blue-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A future where every community has access to efficient healthcare management systems, enabling better health outcomes and supporting UN SDG 3 (Good Health) and SDG 9 (Innovation).
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section - Right Side */}
          <div id="contact" className="scroll-mt-20">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600">
                Get in touch with us for any inquiries or support
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">Phone</h4>
                  <p className="text-gray-600 text-xs">+1 234 567 890</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">Email</h4>
                  <p className="text-gray-600 text-xs">support@careconnect.com</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">Location</h4>
                  <p className="text-gray-600 text-xs">Community Health Center</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Send us a Message</h3>
                <form className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition text-sm" />
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition text-sm" />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition text-sm" />
                  <textarea placeholder="Your Message" rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition resize-none text-sm"></textarea>
                  <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md hover:shadow-lg text-sm">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutContact
