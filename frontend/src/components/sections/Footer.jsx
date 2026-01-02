import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-teal-900 to-blue-900 text-white py-16" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Left Side: Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <a href="#" className="flex items-center gap-3 hover:opacity-80 transition mb-6">
              <div className="bg-white p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                </svg>
              </div>
              <span className="text-2xl font-bold">CareConnect</span>
            </a>
            <p className="text-gray-200 leading-relaxed mb-6">
              CareConnect is a comprehensive platform dedicated to bridging the gap in healthcare accessibility. We ensure quality care reaches everyone, everywhere, supporting global health initiatives.
            </p>
          </div>

          {/* Menu Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6">Menu</h3>
            <div className="flex flex-col items-start gap-4 text-sm font-medium text-gray-200">
              <a href="/" className="hover:text-teal-300 transition">
                Home
              </a>
              <a href="#about" className="hover:text-teal-300 transition">
                About Us
              </a>
              <a href="#services" className="hover:text-teal-300 transition">
                Services
              </a>
              <a href="#contact" className="hover:text-teal-300 transition">
                Contact
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6">Support</h3>
            <div className="flex flex-col items-start gap-4 text-sm font-medium text-gray-200">
              <a href="mailto:help@careconnect.com" className="hover:text-teal-300 transition">
                help@careconnect.com
              </a>
              <a href="tel:+94 77 433 5698" className="hover:text-teal-300 transition">
                +94 77 433 5698
              </a>

            </div>
          </div>

          {/* Locations Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6">Locations</h3>
            <div className="flex flex-col items-start gap-4 text-sm font-medium text-gray-200">
              <span className="hover:text-teal-300 transition cursor-pointer">
                Colombo
              </span>
              <span className="hover:text-teal-300 transition cursor-pointer">
                Kandy
              </span>
              <span className="hover:text-teal-300 transition cursor-pointer">
                Jaffna
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <p>© 2026 CareConnect. Supporting SDG 3 & SDG 9. All rights reserved Binary Breakers❤️.</p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:-translate-y-1 transition-all duration-300 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#" className="hover:-translate-y-1 transition-all duration-300 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#" className="hover:-translate-y-1 transition-all duration-300 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer