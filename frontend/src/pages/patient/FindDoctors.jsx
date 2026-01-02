import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorList } from "../../services/api";

const FindDoctors = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specializations, setSpecializations] = useState(["All"]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getDoctorList();
      setDoctors(data.doctors || []);

      // Extract unique specializations
      const uniqueSpecs = [
        "All",
        ...new Set(data.doctors.map((doc) => doc.specialization)),
      ];
      setSpecializations(uniqueSpecs);

      setError(null);
    } catch (err) {
      setError("Failed to load doctors");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors =
    selectedSpecialization === "All"
      ? doctors
      : doctors.filter((doc) => doc.specialization === selectedSpecialization);

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleProceedToBook = () => {
    if (selectedDoctor) {
      // Navigate to doctor detail page with the doctor ID
      navigate(`/doctor/${selectedDoctor._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find a Doctor</h1>
        <p className="text-gray-600">
          Browse our specialists and check their availability
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization
            </label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none transition"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4">
              <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
              <p className="text-teal-100 text-sm">{doctor.specialization}</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    doctor.availability
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {doctor.availability ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {doctor.experience || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  {doctor.hospital || "N/A"}
                </div>
              </div>

              <button
                onClick={() => handleBookNow(doctor)}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm mt-auto"
              >
                View Profile & Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDoctor(null)}
          ></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white relative">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="flex items-center gap-6">
                {selectedDoctor.image ? (
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-24 h-24 rounded-full border-4 border-white/30 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedDoctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                  <p className="text-teal-100 text-lg">
                    {selectedDoctor.specialization}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Experience
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {selectedDoctor.experience || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Hospital
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {selectedDoctor.hospital || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Email
                  </h3>
                  <p className="text-gray-800 font-medium text-sm">
                    {selectedDoctor.email || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {selectedDoctor.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Availability Status
                </h3>
                {selectedDoctor.availability ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-700 font-semibold">
                      Doctor is available for appointments
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-700 font-semibold">
                      Doctor is currently unavailable
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleProceedToBook}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition transform active:scale-95"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDoctors;
