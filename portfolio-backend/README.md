# Portfolio Backend (Assignment 04)

This is the Node.js + Express backend for a personal portfolio website. It supports full CRUD for managing:

- 🎓 Education
- 💼 Work Experience
- 🛠️ Skills (core and exploring)
- 📁 Projects
- 📬 Contact form messages (optional extension)

Data is stored in MongoDB using Mongoose.

---

## 🚀 Features

- RESTful API for all entities
- MongoDB integration using Mongoose
- CORS support (frontend: `http://localhost:3000`)
- Clean modular folder structure (controllers, routes, models)
- Environment variable support (`.env`)
- Error handling and 404 responses

---

## 📁 Project Structure

portfolio-backend/
├── config/
│ └── db.js
├── controllers/
├── models/
├── routes/
├── .env
├── package.json
├── README.md
└── server.js


---

## 🧑‍💻 Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local or Atlas)
- [Postman](https://www.postman.com/) (for testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-project.git
   cd portfolio-project/portfolio-backend
npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
npm run dev

---

