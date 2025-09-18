import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Notes from "./features/notes/Notes";
import NotesList from "./features/notes/NotesList";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/notes"
        element={
          <RequireAuth>
            <Notes />
          </RequireAuth>
        }
      />
      <Route path="/notes-list" element={<NotesList />} />
    </Routes>
  );
}
