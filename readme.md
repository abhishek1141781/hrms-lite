# HRMS Lite - Human Resource Management System

📌 Project Overview
HRMS Lite is a lightweight, professional internal tool designed for HR administrators to manage employee records and track daily attendance. The application focuses on clean UX, robust server-side validation, and a stable full-stack architecture. It addresses core HR needs like employee onboarding, record management, and historical attendance tracking.

## 🛠 Tech Stack
Frontend: React.js with Vite for high-performance development and bundling.

Styling: Tailwind CSS (v4) for a modern, responsive, and utility-first UI design.

Icons & Notifications: Lucide-React for professional iconography and React-Toastify for non-blocking UI notifications.

Backend: Python FastAPI for building high-performance, asynchronous RESTful APIs.

Database: MySQL with SQLAlchemy ORM for reliable data persistence and modeling.

Validation: Pydantic for strict server-side data validation (email formats, required fields, and constraints).

## 🚀 Features
Employee Management: Add new employees with unique IDs, view the directory, and remove records.

Attendance Tracking: Mark daily status (Present/Absent) for any registered employee.

Historical View: Filter and view the specific attendance history for any individual employee.

Real-time Feedback: Meaningful UI states including loading spinners, empty state illustrations, and toast notifications for success/error events.

## ⚙️ Steps to Run Locally
1. Prerequisites
Python 3.9+

Node.js 18+

MySQL Server running locally or via a cloud provider.

2. Backend Setup
Navigate to the backend directory:

Bash
cd fastapi-HRMS
Create and activate a virtual environment:

Bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
Install dependencies:

Bash
pip install -r requirements.txt
Configure Environment: Create a .env file in the backend root and add your MySQL credentials (see .env.example).

Start the server:

Bash
uvicorn main:app --reload
3. Frontend Setup
Navigate to the frontend directory:

Bash
cd hrms-frontend
Install packages:

Bash
npm install
Start the development server:

Bash
npm run dev
Open your browser to the URL provided by Vite (typically http://localhost:5173).

## 📝 Assumptions & Limitations
Admin Access: The system assumes a single-user admin environment; therefore, authentication and authorization (JWT/Login) are out of scope for this version.

Data Integrity: Deleting an employee currently removes their record from the directory, but historical attendance is persisted in the database unless cascading deletes are manually triggered in the DB layer.

Employee IDs: IDs are assumed to be unique alphanumeric strings (e.g., EMP01) and are validated as unique by the backend.

## URLs
Live Application URL: [Your Hosted Frontend URL]

Backend API URL: [Your Hosted Backend URL]

GitHub Repository: https://github.com/abhishek1141781/hrms-lite