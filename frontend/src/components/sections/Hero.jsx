import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { patientLogin, patientRegister, adminLogin } from "../../services/api";
import Modal from "../Modal";

const Hero = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const openMenuRef = useRef(null);
  const closeMenuRef = useRef(null);
  const navLinksRef = useRef(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!isSignUp) {
        // Login flow
        // Try admin login first
        try {
          const adminResponse = await adminLogin({ email, password });
          // If admin login succeeds, redirect to admin dashboard with token in URL
          setShowAuthPopup(false);
          setTimeout(() => {
            // Redirect to admin frontend (running on different port) with token as query param
            window.location.href = `http://localhost:5174?token=${adminResponse.token}`;
          }, 100);
          return;
        } catch (adminError) {
          // If admin login fails, try patient login
          const response = await patientLogin({ email, password });
          login(response.patient, response.token);
          setShowAuthPopup(false);
          // Redirect to patient dashboard
          setTimeout(() => {
            navigate("/patient/dashboard");
          }, 100);
        }
      } else {
        // Handle registration (patients only)
        const response = await patientRegister({ 
          name, 
          email, 
          password, 
          phone, 
          dateOfBirth, 
          gender, 
          address 
        });
        login(response.patient, response.token);
        setShowAuthPopup(false);
        // Redirect to patient dashboard
        setTimeout(() => {
          navigate("/patient/dashboard");
        }, 100);
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDateOfBirth("");
      setGender("");
      setAddress("");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <section
      className="flex flex-col items-center bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 min-h-screen w-full"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-4 px-4 md:px-8 lg:px-12 bg-white/80 backdrop-blur-sm shadow-sm">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="bg-white p-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">CareConnect</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <a
            href="#"
            className="text-gray-700 hover:text-teal-600 transition font-medium"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-700 hover:text-teal-600 transition font-medium"
          >
            Features
          </a>
          <a
            href="#services"
            className="text-gray-700 hover:text-teal-600 transition font-medium"
          >
            Services
          </a>
          <a
            href="#doctors"
            className="text-gray-700 hover:text-teal-600 transition font-medium"
          >
            Doctors
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-teal-600 transition font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-teal-600 transition font-medium"
          >
            Contact
          </a>
        </div>

        <div className="hidden md:block space-x-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <Link
                to="/patient/dashboard"
                className="hover:bg-teal-50 transition px-6 py-2 border-2 border-teal-500 text-teal-600 font-semibold rounded-lg"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogoutClick}
                className="hover:bg-red-50 transition px-6 py-2 border-2 border-red-500 text-red-600 font-semibold rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAuthPopup(true);
                setIsSignUp(false);
              }}
              className="hover:bg-teal-50 transition px-6 py-2 border-2 border-teal-500 text-teal-600 font-semibold rounded-lg"
            >
              Login
            </button>
          )}
        </div>
        <button
          ref={openMenuRef}
          className="md:hidden active:scale-90 transition text-teal-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>
      <div
        ref={navLinksRef}
        className="fixed inset-0 z-[100] bg-teal-900/95 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 -translate-x-full text-white"
      >
        <a href="#" className="hover:text-teal-200 transition">
          Home
        </a>
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

        {user && (
          <Link
            to="/patient/dashboard"
            className="hover:text-teal-200 transition font-semibold border-2 border-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </Link>
        )}

        <button
          ref={closeMenuRef}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-white hover:bg-gray-100 transition text-teal-600 rounded-md flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="w-full flex flex-col items-center px-8 pt-24">
        <div className="flex items-center mt-20 gap-2 border-2 border-teal-500 bg-white text-teal-700 rounded-full px-5 py-2.5 shadow-sm">
          <div className="size-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">
            Supporting SDG 3 & SDG 9 - Community Healthcare
          </span>
        </div>
        <h1 className="text-center text-5xl leading-tight md:text-6xl md:leading-tight mt-8 font-bold text-gray-800">
          Digitizing Community Healthcare for
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            {" "}
            Better Well-being
          </span>
        </h1>
        <p className="text-center text-lg mt-6 text-gray-600 leading-relaxed max-w-4xl">
          CareConnect helps community clinics manage appointments, maintain
          patient records, and share preventive health awareness improving
          accessibility, efficiency, and community well-being.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={() => {
              setShowAuthPopup(true);
              setIsSignUp(false);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold active:scale-95 rounded-lg px-8 py-3.5 shadow-lg transition"
          >
            Book Appointment Now
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <a
            href="#services"
            className="border-2 border-teal-500 text-teal-600 font-semibold active:scale-95 hover:bg-teal-50 transition rounded-lg px-8 py-3.5 shadow-md inline-block text-center"
          >
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

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        actions={
          <>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        }
      >
        <p className="text-gray-600">Are you sure you want to log out?</p>
      </Modal>

      {/* Login/Register Popup */}
      {showAuthPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowAuthPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-600 transition bg-white rounded-full p-2 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                  <circle cx="200" cy="200" r="150" fill="currentColor" />
                  <circle cx="600" cy="600" r="200" fill="currentColor" />
                  <circle cx="700" cy="200" r="100" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <svg className="w-24 h-24 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                </svg>
                <h1 className="text-4xl font-bold mb-4">Welcome to CareConnect</h1>
                <p className="text-lg text-teal-50 mb-6">
                  {isSignUp 
                    ? "Join our healthcare platform and take control of your health journey" 
                    : "Access your health records and manage appointments"}
                </p>
                <div className="flex items-center justify-center gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm text-teal-100">Support</div>
                  </div>
                  <div className="h-16 w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-teal-100">Doctors</div>
                  </div>
                  <div className="h-16 w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm text-teal-100">Secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 overflow-y-auto p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-gray-600">
                    {isSignUp
                      ? "Fill in your details to get started"
                      : "Sign in to access your portal"}
                  </p>
                </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                  placeholder="Enter your password"
                />
              </div>

              {isSignUp && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                        placeholder="Phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
                    >
                      <option value="">Not specified</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="2"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition resize-none"
                      placeholder="Enter your address"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3.5 rounded-lg shadow-lg transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
              </button>

              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-teal-600 font-semibold hover:underline"
                  >
                    {isSignUp ? "Login" : "Sign Up"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
      )}
    </section>
  );
};

export default Hero;
