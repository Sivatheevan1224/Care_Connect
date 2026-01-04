const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch all doctors
export const fetchDoctors = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.specialization)
      queryParams.append("specialization", filters.specialization);
    if (filters.hospital) queryParams.append("hospital", filters.hospital);

    const url = `${API_BASE_URL}/doctor/list${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// Fetch single doctor by ID
export const fetchDoctorById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/doctors/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch doctor details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};

// Admin login
export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Admin login failed");
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error.message || "Login failed");
  }
};

// Patient registration
export const patientRegister = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patient/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error(error.message || "Registration failed");
  }
};

// Patient login
export const patientLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patient/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Patient login failed");
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error.message || "Error in patient login");
  }
};

// Book appointment
export const bookAppointment = async (appointmentData, token) => {
  try {
    console.log("API: Booking appointment with data:", appointmentData);
    console.log("API: Using token:", token ? "Token exists" : "No token");

    const response = await fetch(`${API_BASE_URL}/patient/appointment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });

    console.log("API: Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API: Error response:", errorData);
      throw new Error(errorData.message || "Failed to book appointment");
    }

    const data = await response.json();
    console.log("API: Success response:", data);
    return data;
  } catch (error) {
    console.error("API: Error booking appointment:", error);
    throw error;
  }
};

// Get patient appointments
export const getAppointments = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patient/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch appointments");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// Cancel appointment
export const cancelAppointment = async (appointmentId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/patient/appointment/${appointmentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to cancel appointment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

// Get list of doctors (public endpoint)
export const getDoctorList = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.specialization && filters.specialization !== "All") {
      queryParams.append("specialization", filters.specialization);
    }
    if (filters.hospital) {
      queryParams.append("hospital", filters.hospital);
    }

    const url = `${API_BASE_URL}/doctor/list${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch doctors");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    throw error;
  }
};

export default {
  fetchDoctors,
  fetchDoctorById,
  adminLogin,
  patientRegister,
  patientLogin,
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getDoctorList,
};
