import React from 'react'

const HealthResources = () => {
  return (
    <section className="w-full py-20 px-8 bg-white">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Personal Health Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Essential health information and tips to keep you and your family healthy
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto mt-16">
          {/* Health Tips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl border border-teal-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Heart Health</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>Monitor blood pressure regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>Exercise 30 minutes daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>Maintain healthy diet with less salt</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Mental Wellness</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Practice stress management techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Get 7-8 hours of sleep daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Stay connected with loved ones</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl border border-cyan-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <path d="M14 2v6h6"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Preventive Care</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Schedule regular health check-ups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Stay up-to-date with vaccinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>Early screening saves lives</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                    <path d="M6 1v3M10 1v3M14 1v3"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Nutrition</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Eat 5 servings of fruits & vegetables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Stay hydrated - drink 8 glasses water</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Limit processed and sugary foods</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Diabetes Care</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Monitor blood sugar levels regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Follow prescribed medication schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Maintain healthy weight</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Emergency Info</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Keep emergency contacts handy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Know your blood type and allergies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Keep first aid kit at home</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HealthResources
