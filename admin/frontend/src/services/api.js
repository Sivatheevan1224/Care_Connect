const API_BASE_URL = "http://localhost:5000/api/admin";

// Get admin token from localStorage
const getToken = () => localStorage.getItem("adminToken");

// Dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard-stats`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard statistics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/appointments/${appointmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to update appointment status"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

// Get all patients
export const getAllPatients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch patients");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// Update patient status
export const updatePatientStatus = async (patientId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update patient status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating patient status:', error);
    throw error;
  }
};

// Get all doctors
export const getAllDoctors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

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

// Add a new doctor
export const addDoctor = async (doctorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-doctor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: doctorData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add doctor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error;
  }
};

// Update doctor
export const updateDoctor = async (doctorId, doctorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: doctorData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update doctor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

// Delete doctor
export const deleteDoctor = async (doctorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete doctor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};

// Admin login
export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during admin login:", error);
    throw error;
  }
};

export default {
  getDashboardStats,
  getAllAppointments,
  updateAppointmentStatus,
  getAllPatients,
  getAllDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  adminLogin,
};
