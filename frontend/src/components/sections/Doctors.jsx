import React, { useState, useEffect } from "react";
import { fetchDoctors } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Doctors = ({ isFullPage = false }) => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specializations = [
    { name: "All", icon: "👨‍⚕️" },
    { name: "General Medicine", icon: "🩺" },
    { name: "Cardiology", icon: "❤️" },
    { name: "Pediatrics", icon: "👶" },
    { name: "Orthopedics", icon: "🦴" },
    { name: "Dermatology", icon: "💆" },
    { name: "Neurology", icon: "🧠" },
  ];

  const availabilityOptions = [
    { name: "All", icon: "📅" },
    { name: "Monday", icon: "1️⃣" },
    { name: "Tuesday", icon: "2️⃣" },
    { name: "Wednesday", icon: "3️⃣" },
    { name: "Thursday", icon: "4️⃣" },
    { name: "Friday", icon: "5️⃣" },
    { name: "Saturday", icon: "6️⃣" },
  ];

  // Fetch doctors from API
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const filters = {};
        if (selectedSpecialization !== "All") {
          filters.specialization = selectedSpecialization;
        }

        const response = await fetchDoctors(filters);
        setDoctors(response.doctors || []);
        setError(null);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        console.error("Error loading doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [selectedSpecialization]);

  // Remove hardcoded doctors array - it's now fetched from API

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialization =
      selectedSpecialization === "All" ||
      doctor.specialization === selectedSpecialization;
    const matchesAvailability =
      selectedAvailability === "All" ||
      (doctor.availablity &&
        doctor.availablity
          .toLowerCase()
          .includes(selectedAvailability.substring(0, 3).toLowerCase()));
    return matchesSpecialization && matchesAvailability;
  });

  // Show limited doctors on home page, all on full page
  const displayedDoctors = isFullPage
    ? filteredDoctors
    : filteredDoctors.slice(0, 4);

  return (
    <section
      id="doctors"
      className="w-full py-20 px-8 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Expert Doctors
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of healthcare professionals committed to
            your well-being
          </p>
        </div>

        {/* Filters - Only show on full doctors page */}
        {isFullPage && (
          <>
            {/* Specialization Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Filter by Specialization
              </h3>
              <div className="flex flex-wrap gap-3">
                {specializations.map((spec) => (
                  <button
                    key={spec.name}
                    onClick={() => setSelectedSpecialization(spec.name)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm ${
                      selectedSpecialization === spec.name
                        ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600 shadow-md"
                    }`}
                  >
                    <span className="text-lg">{spec.icon}</span>
                    <span>{spec.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Filter by Availability
              </h3>
              <div className="flex flex-wrap gap-3">
                {availabilityOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedAvailability(option.name)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm ${
                      selectedAvailability === option.name
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 shadow-md"
                    }`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedDoctors.map((doctor) => (
              <div
                key={doctor._id || doctor.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      doctor.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doctor.name
                      )}&background=0d9488&color=fff&size=200`
                    }
                    alt={doctor.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-teal-600 mb-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    <span className="font-semibold text-xs">
                      {doctor.specialization || "General"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 mb-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                    <span className="text-xs">
                      {doctor.experience ? `${doctor.experience} years` : "N/A"}{" "}
                      experience
                    </span>
                  </div>
                  {doctor.hospital && (
                    <div className="flex items-center gap-1.5 text-gray-600 mb-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
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
                      <span className="text-xs">{doctor.hospital}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-gray-600 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-xs">
                      {doctor.availablity || "Check availability"}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/doctor/${doctor._id}`)}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No doctors found for this specialization.
            </p>
          </div>
        )}

        {/* View More Button - Show on home page if there are more than 4 total doctors */}
        {!isFullPage && doctors.length > 4 && (
          <div className="flex justify-center mt-8">
            <a
              href="/doctors"
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 px-12 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View More Doctors
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
