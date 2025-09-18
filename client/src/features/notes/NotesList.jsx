import React, { useEffect, useState } from "react";
import { Trash2, Edit, Check, X, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNotes() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://note-manager-app-g8id.onrender.com/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data.success && Array.isArray(data.notes) ? data.notes : []);
      } catch (error) {
        console.error("Fetch notes error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Adjust if your login route is different
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://note-manager-app-g8id.onrender.com/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes((prev) => prev.filter((note) => note._id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditDesc(note.description);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim() || !editDesc.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://note-manager-app-g8id.onrender.com/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, description: editDesc }),
      });
      if (!res.ok) throw new Error("Failed to update note");
      setNotes((prev) =>
        prev.map((note) =>
          note._id === id
            ? { ...note, title: editTitle, description: editDesc }
            : note
        )
      );
      cancelEditing();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <div>Loading notes...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/notes")}
          className="flex items-center gap-2 text-purple-300 hover:text-white font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-white mb-6">All Notes</h1>
      {notes.length === 0 ? (
        <p className="text-purple-200">No notes available.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-white/10 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 text-white flex flex-col md:flex-row md:justify-between gap-4"
            >
              {editingNoteId === note._id ? (
                <>
                  <div className="flex-1 flex flex-col">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="mb-2 p-2 rounded text-black"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows="4"
                      className="p-2 rounded text-black resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => saveEdit(note._id)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                      aria-label="Save note"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                      aria-label="Cancel edit"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <p className="mt-1 text-purple-100 whitespace-pre-wrap">
                      {note.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(note)}
                      className="p-2 text-purple-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg"
                      aria-label="Edit note"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(note._id)} // open confirm modal
                      className="p-2 text-purple-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Delete confirmation modal */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="bg-white/10 backdrop-blur-xl p-6 rounded-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-xl mb-4">Confirm Delete</h2>
            <p className="text-purple-200 mb-6">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteNote(confirmDeleteId)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
