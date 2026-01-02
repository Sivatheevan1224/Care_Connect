import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Wait for auth to load before checking
    if (authLoading) return;

    if (!user || !token) {
      navigate("/");
      return;
    }
    fetchProfile();
  }, [user, token, navigate, authLoading]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/patient/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setPatient(data.patient);
      setFormData({
        name: data.patient.name || "",
        email: data.patient.email || "",
        phone: data.patient.phone || "",
        address: data.patient.address || "",
        dateOfBirth: data.patient.dateOfBirth
          ? new Date(data.patient.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: data.patient.gender || "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to load profile");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setSuccessMessage("");
    setUpdateLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/patient/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      setPatient(data.patient);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
      </div>
    );
  }

  if (error && !patient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {successMessage}
        </div>
      )}
      {updateError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {updateError}
        </div>
      )}

      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        <button
          onClick={() => {
            if (isEditing) {
              setFormData({
                name: patient?.name || "",
                email: patient?.email || "",
                phone: patient?.phone || "",
                address: patient?.address || "",
                dateOfBirth: patient?.dateOfBirth
                  ? new Date(patient.dateOfBirth).toISOString().split("T")[0]
                  : "",
                gender: patient?.gender || "",
              });
              setUpdateError("");
            }
            setIsEditing(!isEditing);
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isEditing
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center p-8">
            <div className="w-32 h-32 bg-teal-100 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-teal-600 mb-4">
              {patient?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {patient?.name || "User"}
            </h2>
            <p className="text-gray-500 mb-4">{patient?.email || "No email"}</p>

            <div className="flex justify-center gap-2 mb-6">
              {patient?.gender && (
                <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold capitalize">
                  {patient.gender}
                </span>
              )}
              {patient?.dateOfBirth && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  {new Date().getFullYear() -
                    new Date(patient.dateOfBirth).getFullYear()}{" "}
                  Years
                </span>
              )}
            </div>

            <div className="border-t pt-6 text-left">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Member Since
              </p>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="p-2 bg-white rounded-full shadow-sm">
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
                    className="text-teal-600"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">
                  {patient?.createdAt
                    ? new Date(patient.createdAt).toLocaleDateString()
                    : "Recently"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form/View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
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
                className="text-teal-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Personal Details
            </h3>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={isEditing ? formData.name : patient?.name || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? "border-teal-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={isEditing ? formData.email : patient?.email || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? "border-teal-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={isEditing ? formData.phone : patient?.phone || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? "border-teal-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    isEditing
                      ? formData.dateOfBirth
                      : patient?.dateOfBirth
                      ? new Date(patient.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? "border-teal-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-teal-500 rounded-lg focus:outline-none bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={
                      patient?.gender
                        ? patient.gender.charAt(0).toUpperCase() +
                          patient.gender.slice(1)
                        : "Not specified"
                    }
                    readOnly
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={isEditing ? formData.address : patient?.address || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  rows="2"
                  placeholder="Enter your address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? "border-teal-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              {isEditing && (
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
