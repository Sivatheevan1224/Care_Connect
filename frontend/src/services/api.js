const API_BASE_URL = "http://localhost:5000/api";

// Fetch all doctors
export const fetchDoctors = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.specialization)
      queryParams.append("specialization", filters.specialization);
    if (filters.hospital) queryParams.append("hospital", filters.hospital);

    const url = `${API_BASE_URL}/admin/doctors${
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

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export default {
  fetchDoctors,
  fetchDoctorById,
  adminLogin,
  patientRegister,
  patientLogin,
};
