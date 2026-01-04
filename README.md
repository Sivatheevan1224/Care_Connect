# CareConnect - Community Healthcare Platform

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

CareConnect is a comprehensive digital healthcare platform designed to streamline operations for community clinics. It bridges the gap between healthcare providers and patients by facilitating online appointments, patient record management, and administrative oversight.

## 🔗 Links

### Repository Link
[https://github.com/Sivatheevan1224/Care_Connect](https://github.com/Sivatheevan1224/Care_Connect)

### Live Application
- **Patient Frontend:** [https://care-connect-swart.vercel.app/](https://care-connect-swart.vercel.app/)
- **Admin Frontend:** [https://careconnectadmin-liard.vercel.app/](https://careconnectadmin-liard.vercel.app/)
- **Backend API:** [https://care-connectbackend.vercel.app/](https://care-connectbackend.vercel.app/)

## 🚀 Key Features

### For Patients
*   **User Registration & Secure Login:** Create and manage personal accounts securely.
*   **Dashboard:** View personal health summaries and profile details.
*   **Appointment Booking:** Easily schedule appointments with available doctors.
*   **Profile Management:** Update personal information, contact details, and medical history.
*   **Responsive Design:** Accessible on both desktop and mobile devices.

### For Administrators
*   **Admin Dashboard:** Overview of system statistics (patients, doctors, appointments).
*   **Staff Management:** Approve new staff registrations and manage roles.
*   **Doctor Management:** Add, update, and manage doctor profiles and availability.
*   **Patient Management:** View and manage registered patient records.
*   **Appointment Oversight:** Monitor and manage all clinic appointments.

## 🛠️ Technology Stack

The project is built using the **MERN** stack (MongoDB, Express.js, React, Node.js) with a dual-frontend architecture.

### Frontend
*   **React:** UI library for building dynamic user interfaces.
*   **Vite:** fast build tool and development server.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **React Router:** For seamless client-side navigation.
*   **Context API:** For state management (Authentication).

### Backend
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web framework for building the REST API.
*   **MongoDB:** NoSQL database for storing user, appointment, and clinic data.
*   **Mongoose:** ODM for MongoDB validation and query building.
*   **JWT (JSON Web Tokens):** For secure user authentication and authorization.

## 🏗️ System Architecture

The system is divided into three main components:

1.  **Patient Frontend (`/frontend`):** The public-facing application where patients interact with the service.
2.  **Admin Frontend (`/admin/frontend`):** A separate, secure portal for hospital administrators and staff.
3.  **Backend API (`/backend`):** The central server handling business logic, database operations, and API requests from both frontends.

## ⚙️ Installation & Setup

Prerequisites: Node.js and MongoDB installed on your system.

### 1. Backend Setup
```bash
cd backend
npm install
# Create a .env file with PORT, MONGO_URI, and JWT_SECRET
npm run start
# Server runs on http://localhost:5000 (default)
```

### 2. Patient Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### 3. Admin Frontend Setup
```bash
cd admin/frontend
npm install
npm run dev
# App runs on http://localhost:5174
```

## 🔄 System Process Flow

1.  **Onboarding:**
    *   Patients sign up via the main landing page.
    *   Staff/Doctors are registered by admins or must be approved after signing up.
2.  **Authentication:**
    *   Users log in receiving a JWT.
    *   The frontend stores this token to authenticate subsequent requests.
3.  **Appointment Flow:**
    *   Patients browse doctors and select available slots.
    *   The backend reserves the slot and updates the database.
    *   Admins and Doctors can view the new appointment in their dashboard.
4.  **Logout:**
    *   Secure logout functionality with Confirmation Modals ensures users don't accidentally end their session.

## 👥 Collaborators
*   **Sivatheevan** - [GitHub Profile](https://github.com/Sivatheevan1224)
*   **Ben Asher** - [GitHub Profile](https://github.com/Jbenash)
*   **Abinath** - [GitHub Profile](https://github.com/Abinath7)
*   **Abbishanth** - [GitHub Profile](https://github.com/Abbishanth09)


## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.



