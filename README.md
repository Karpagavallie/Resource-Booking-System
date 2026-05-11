 Resource Booking System

A full-stack web application that allows students to book resources and enables administrators to manage bookings and user access efficiently.


 ✨ Features

* 👤 User Authentication (Student & Admin Login)
* 📋 Resource Booking Management
* 📅 Booking Request System
* ✅ Admin Access and Controls
* 📊 Separate Student and Admin Dashboards
* 🔒 Secure Backend with Node.js and Express.js
* 💾 MySQL Database Connectivity
* 🎨 Responsive Frontend UI


🏗️ Technologies Used

 Frontend

* HTML
* CSS
* JavaScript

 Backend

* Node.js
* Express.js

 Database

* MySQL

---

🛠️ Requirements

Before running the project, install the following:

* Node.js (v16 or above)
* MySQL
* npm

---

 ▶️ Installation & Setup

 1. Clone the Repository
git clone https://github.com/Karpagavallie/Resource-Booking-System.git

 2. Navigate to Project Folder
cd Resource-Booking-System

 3. Install Dependencies
npm install

4. Configure MySQL Database

Create a MySQL database and update your database credentials inside:
backend/db.js

5. Start the Backend Server
node backend/server.js

Server will run at:
http://localhost:3000

📂 Project Structure

Resource-Booking-System/
│
├── backend/
│   ├── routes/
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── admin.html
│   ├── admin.js
│   ├── auth.js
│   ├── login.html
│   ├── register.html
│   ├── student.html
│   ├── student.js
│   └── style.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

 🔐 User Roles

 Student

* Login/Register
* View resources
* Book resources

 Admin

* Manage resources
* Monitor bookings
* Handle user access


 🚀 Future Improvements

* Email Notifications
* Prevents Double Booking

 📄 License

This project is licensed under the MIT License.

👩‍💻 Author
Karpagavallie 
