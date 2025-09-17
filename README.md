 
# Notes Manager App (MERN Stack)

## Description
A simple full-stack web application allowing users to register, log in, and manage personal notes with create, read, update, and delete (CRUD) operations. The backend uses Node.js, Express, MongoDB, and JWT for authentication, while the frontend is built with React and Vite.

## Features
- User registration and login with email and password
- Secure JWT-based authentication
- Add, view, edit, and delete personal notes
- Protected API routes for authenticated users
- Optional admin features to monitor users and notes (bonus)

## Installation

### Backend
1. Navigate to the `server` directory
2. Run `npm install` to install dependencies
3. Create a `.env` file with necessary environment variables (e.g., MongoDB URI, JWT secret)
4. Run `npm run dev` or `node app.js` to start the backend server

### Frontend
1. Navigate to the `client` directory
2. Run `npm install` to install frontend dependencies
3. Run `npm run dev` to start the React Vite development server

## Usage
- Open the frontend app in your browser (usually at `http://localhost:5173`)
- Register a new user or login
- Use the dashboard to create, view, edit, or delete notes

## APIs Overview
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user and get JWT
- `POST /api/notes` — Create a new note (protected)
- `GET /api/notes` — Get all notes of logged-in user (protected)
- `PUT /api/notes/:id` — Update a note (protected)
- `DELETE /api/notes/:id` — Delete a note (protected)

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JSON Web Tokens (JWT)
- React, Vite
- Axios for API requests

## Deployment
- Frontend and backend can be deployed separately on platforms like Netlify, Vercel (frontend), and Heroku, Render, or DigitalOcean (backend).
- Make sure environment variables are set appropriately in the hosting environment.

## Future Improvements
- Add user roles for admin and standard users
- Implement pagination and search for notes
- Add rich text editor to notes
- Improve UI/UX and add mobile responsiveness

## Author
- Created by Aditya Joshi

## License
This project is licensed under the MIT License.
