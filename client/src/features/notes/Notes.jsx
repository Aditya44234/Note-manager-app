import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      setSaveLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("https://note-manager-app-g8id.onrender.com/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to add note");

      setTitle("");
      setDescription("");
      setSaveLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Add note error:", err);
      setSaveLoading(false);
    }
  };

  return (
    <>
      {saveLoading && (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
      )}

      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
        {/* Header with View Notes button */}
        <div className="flex-shrink-0 p-6 border-b border-purple-800/30 backdrop-blur-sm bg-black/10 flex justify-between items-center">
          <h1 className="text-4xl md:text-2xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            ✨ My Notes
          </h1>
          <button
            onClick={() => navigate("/notes-list")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
          >
            View Notes
          </button>
        </div>

        {/* Add Note Form */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 shadow-2xl">
              <form className="space-y-4" onSubmit={addNote}>
                <input
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-purple-400/30 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 text-lg backdrop-blur-sm"
                />
                <textarea
                  placeholder="Description.."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-purple-400/30 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 text-lg resize-none backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={!title.trim() || !description.trim() || saveLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {saveLoading ? "Adding..." : "Add Note"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-purple-300 mb-4">
              Note Added!
            </h2>
            <p className="text-purple-200 mb-6">
              Your note has been successfully saved.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
