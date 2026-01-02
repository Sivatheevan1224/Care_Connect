import React from 'react'

const About = () => {
  return (
    <section id="about" className="w-full py-20 px-8 bg-white">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About CareConnect</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Digitizing community healthcare to improve accessibility, efficiency, and well-being
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
            <div className="text-teal-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To transform community healthcare centers by providing accessible, efficient digital solutions that improve patient care, reduce waiting times, and promote preventive health awareness.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A future where every community has access to efficient healthcare management systems, enabling better health outcomes and supporting UN SDG 3 (Good Health) and SDG 9 (Innovation).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About