# 🎉 Event Management Platform

A full-stack web application designed to help universities manage events for students, faculty, and staff. This platform allows users to create, manage, and attend events with ease, while administrators can validate registrations and generate insightful reports.

---

## 🚀 Features

- User authentication and authorization
- Event creation and registration
- Event calendar with date/time/location info
- Admin panel for validation and reporting
- Responsive UI built with React and Vite
- Backend powered by Node.js and MongoDB

---

## 🧱 Tech Stack

**Frontend**  
- React (via Vite)  
- Tailwind CSS (if used)  

**Backend**  
- Node.js  
- Express.js  
- MongoDB (via Mongoose)  
- RESTful API  

**Utilities**  
- dotenv  
- cors  
- validator  

---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm
- MongoDB

### Backend Setup

```bash
cd Event-Management-Platform/backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd Event-Management-Platform/frontend
npm install
npm run dev
```

---

## 🗃️ Folder Structure

```
Event-Management-Platform/
├── backend/
│   ├── server.js
│   ├── app.js
│   └── routes/, models/, controllers/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
├── .env
├── README.md
```

---

## 🛡️ Security & Validation

- Input validation using `validator`
- Secure password handling (e.g., bcrypt)
- Authentication using JWT (assumed)

---

## 📈 Future Improvements

- Email notifications
- Event image uploads
- Integration with campus calendar APIs
- QR code check-ins for events

---

## 📄 License

This project is licensed under the MIT License.
