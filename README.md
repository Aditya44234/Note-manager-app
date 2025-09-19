# 📚 Notes Manager App (MERN Stack)

A simple and secure **full-stack web application** where users can register, log in, and manage personal notes with full **CRUD (Create, Read, Update, Delete)** functionality.  

Built using **React (Vite)** for the frontend and **Node.js, Express, MongoDB, and JWT authentication** for the backend.

---

## 🚀 Features
- User registration and login with email + password  
- Secure JWT-based authentication  
- Create, view, edit, and delete personal notes  
- Protected API routes for authenticated users  
- Logout option  
- (Bonus - Not implemented due to time) Admin features: view all users & notes, delete inappropriate notes  

---

## 🛠 Tech Stack
**Frontend:** React (Vite), React Router, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT  
**Deployment Support:** Netlify / Vercel (frontend), Render / Heroku (backend)  

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js and npm installed  
- MongoDB instance (local or Atlas cloud)  

### Backend Setup
1. Navigate to backend folder:  
2. Install dependencies:  
3. Create `.env` file in the `server` directory with:  

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4. Run the backend server:  
    # npm run dev

    API will run on: `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend folder:  
2. Install dependencies:  
React app runs on: `http://localhost:5173`

---

## 📖 Usage
1. Open frontend in browser: `http://localhost:5173`  
2. Register a new account (email + password) or login with existing credentials  
3. On dashboard, you can:  
- Create notes with **title + description**  
- View your notes list  
- Edit or delete any note  
- Logout anytime  

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user & get JWT  

### Notes
- `POST /api/notes` → Create a new note (protected)  
- `GET /api/notes` → Get all notes of logged-in user (protected)  
- `PUT /api/notes/:id` → Update note by ID (protected)  
- `DELETE /api/notes/:id` → Delete note by ID (protected)  

---

## 🌐 Deployment
- **Frontend** → Deploy on [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)  
- **Backend** → Deploy on [Render](https://render.com/), [Heroku](https://www.heroku.com/), or similar platforms  
- Set proper `.env` values for production (MongoDB URI, JWT secret, frontend URL CORS, etc.)  

---

## 🔮 Future Improvements
- Add admin role & dashboard  
- Pagination & search for notes  
- Rich text editor support  
- Mobile responsive UI with better styling  

---

## 👨‍💻 Author
Developed by **Aditya Joshi**  

---

## 📜 License
This project is licensed under the MIT License.  
