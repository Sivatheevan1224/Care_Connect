import React, { useRef, useEffect, useState } from 'react'

const Hero = () => {
  const openMenuRef = useRef(null);
  const closeMenuRef = useRef(null);
  const navLinksRef = useRef(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const openMenu = openMenuRef.current;
    const closeMenu = closeMenuRef.current;
    const navLinks = navLinksRef.current;

    const openMenuHandler = () => {
      navLinks.classList.remove("-translate-x-full");
      navLinks.classList.add("translate-x-0");
    };

    const closeMenuHandler = () => {
      navLinks.classList.remove("translate-x-0");
      navLinks.classList.add("-translate-x-full");
    };

    openMenu?.addEventListener("click", openMenuHandler);
    closeMenu?.addEventListener("click", closeMenuHandler);

    return () => {
      openMenu?.removeEventListener("click", openMenuHandler);
      closeMenu?.removeEventListener("click", closeMenuHandler);
    };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle staff login logic here
    console.log({ email, password });
    setShowLoginPopup(false);
    // Reset form
    setEmail("");
    setPassword("");
  };

  return (
    <section className="flex flex-col items-center bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 min-h-screen w-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-4 px-4 md:px-8 lg:px-12 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">CareConnect</span>
        </div>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <a href="#features" className="text-gray-700 hover:text-teal-600 transition font-medium">
            Features
          </a>
          <a href="#services" className="text-gray-700 hover:text-teal-600 transition font-medium">
            Services
          </a>
          <a href="#doctors" className="text-gray-700 hover:text-teal-600 transition font-medium">
            Doctors
          </a>
          <a href="#about" className="text-gray-700 hover:text-teal-600 transition font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-teal-600 transition font-medium">
            Contact
          </a>
        </div>

        <div className="hidden md:block space-x-3">
          <button onClick={() => setShowLoginPopup(true)} className="hover:bg-teal-50 transition px-6 py-2 border-2 border-teal-500 text-teal-600 font-semibold rounded-lg">
            Login
          </button>
        </div>
        <button ref={openMenuRef} className="md:hidden active:scale-90 transition text-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        </button>
      </nav>
      <div ref={navLinksRef} className="fixed inset-0 z-[100] bg-teal-900/95 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 -translate-x-full text-white">
        <a href="#features" className="hover:text-teal-200 transition">
          Features
        </a>
        <a href="#services" className="hover:text-teal-200 transition">
          Services
        </a>
        <a href="#doctors" className="hover:text-teal-200 transition">
          Doctors
        </a>
        <a href="#about" className="hover:text-teal-200 transition">
          About
        </a>
        <a href="#contact" className="hover:text-teal-200 transition">
          Contact
        </a>
        <button ref={closeMenuRef} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-white hover:bg-gray-100 transition text-teal-600 rounded-md flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div className="w-full flex flex-col items-center px-8 pt-24">
        <div className="flex items-center mt-20 gap-2 border-2 border-teal-500 bg-white text-teal-700 rounded-full px-5 py-2.5 shadow-sm">
          <div className="size-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">Supporting SDG 3 & SDG 9 - Community Healthcare</span>
        </div>
        <h1 className="text-center text-5xl leading-tight md:text-6xl md:leading-tight mt-8 font-bold text-gray-800">
          Digitizing Community Healthcare for
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> Better Well-being</span>
        </h1>
        <p className="text-center text-lg mt-6 text-gray-600 leading-relaxed max-w-4xl">
          CareConnect helps community clinics manage appointments, maintain patient records, and share preventive health awareness improving accessibility, efficiency, and community well-being.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button onClick={() => setShowLoginPopup(true)} className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold active:scale-95 rounded-lg px-8 py-3.5 shadow-lg transition">
            Book Appointment Now
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a href="#services" className="border-2 border-teal-500 text-teal-600 font-semibold active:scale-95 hover:bg-teal-50 transition rounded-lg px-8 py-3.5 shadow-md inline-block text-center">
            Learn More
          </a>
        </div>
      </div>
      
      <div className="mt-16 w-full px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Online Appointments</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-600 font-medium">Healthcare Providers</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl">
              <div className="text-4xl font-bold text-cyan-600 mb-2">5000+</div>
              <p className="text-gray-600 font-medium">Patients Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login/Register Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowLoginPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Staff Login
              </h2>
              <p className="text-gray-600">
                Sign in to access the system
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition active:scale-95">
                Sign In
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                For staff access only. Contact admin to get your credentials.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero