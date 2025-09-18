import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  FileText,
  X,
  MoreHorizontal,
} from "lucide-react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedNotes, setExpandedNotes] = useState(new Set());
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch notes from API on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        if (data.success && Array.isArray(data.notes)) {
          setNotes(data.notes);
        } else {
          setNotes([]);
          console.warn("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Fetch notes error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const toggleExpanded = (id) => {
    setExpandedNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Add note to DB and update UI
  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/notes", {
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

      setLoading(true);
      const fetchRes = await fetch("http://localhost:3000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchData = await fetchRes.json();
      if (fetchData.success && Array.isArray(fetchData.notes)) {
        setNotes(fetchData.notes);
      }
      setLoading(false);
    } catch (err) {
      console.error("Add note error:", err);
    }
  };

  // Delete note from DB and update UI
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete note");

      setNotes((prev) => prev.filter((note) => note._id !== id));
      setExpandedNotes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setSelectedNote(null);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Delete note error:", err);
    }
  };

  const handleNoteClick = (note) => setSelectedNote(note);

  const closeSelectedNote = () => setSelectedNote(null);

  const handleDeleteClick = (e, noteId) => {
    e.stopPropagation();
    setShowDeleteConfirm(noteId);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) deleteNote(showDeleteConfirm);
  };

  const cancelDelete = () => setShowDeleteConfirm(null);

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-purple-800/30 backdrop-blur-sm bg-black/10">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
          ✨ My Notes
        </h1>
      </div>

      {/* Add Note Form */}
      <div className="flex-shrink-0 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-purple-400/30 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 text-lg backdrop-blur-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.shiftKey === false) {
                      e.preventDefault();
                      if (title.trim() && description.trim()) addNote(e);
                    }
                  }}
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder="Tell me more..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-purple-400/30 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 text-lg resize-none backdrop-blur-sm"
                />
              </div>
              <button
                onClick={addNote}
                disabled={!title.trim() || !description.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="relative mb-6">
                  <FileText className="w-16 h-16 text-purple-400/60 animate-pulse" />
                  <div className="absolute -inset-4 bg-purple-400/10 rounded-full animate-ping"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-purple-300 animate-bounce">
                    No Notes Added Yet
                  </h3>
                  <p className="text-purple-400/70 text-lg">
                    Start capturing your thoughts and ideas above! ✨
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Recent Notes (Top 3) */}
                {(showAllNotes ? notes : notes.slice(0, 3)).map((note) => (
                  <div
                    key={note._id}
                    onClick={() => handleNoteClick(note)}
                    className="bg-white/10 backdrop-blur-xl border border-purple-400/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Note Header */}
                    <div className="p-6 border-b border-purple-400/10">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white truncate flex-1 mr-4">
                          {note.title}
                        </h2>
                        <button
                          onClick={(e) => handleDeleteClick(e, note._id)}
                          className="p-2 text-purple-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 flex-shrink-0"
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Note Preview */}
                    <div className="p-6 pt-4">
                      <div className="text-purple-100/90 leading-relaxed">
                        {truncateText(note.description)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show More Notes Button */}
                {!showAllNotes && notes.length > 3 && (
                  <button
                    onClick={() => setShowAllNotes(true)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl p-6 transition-all duration-300 flex items-center justify-center gap-2 text-purple-300 hover:text-white"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                    <span>Show {notes.length - 3} More Notes</span>
                  </button>
                )}

                {/* Show Less Button */}
                {showAllNotes && notes.length > 3 && (
                  <button
                    onClick={() => setShowAllNotes(false)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl p-6 transition-all duration-300 flex items-center justify-center gap-2 text-purple-300 hover:text-white"
                  >
                    <ChevronUp className="w-5 h-5" />
                    <span>Show Less</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Note Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-400/20">
              <h1 className="text-3xl font-bold text-white pr-4">
                {selectedNote.title}
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleDeleteClick(e, selectedNote._id)}
                  className="p-3 text-purple-300 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
                <button
                  onClick={closeSelectedNote}
                  className="p-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  aria-label="Close note"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-purple-100 leading-relaxed whitespace-pre-wrap text-lg">
                {selectedNote.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-60">
          <div className="bg-white/10 backdrop-blur-xl border border-red-400/30 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Delete Note?
              </h2>
              <p className="text-purple-200/80 mb-6">
                This action cannot be undone. Are you sure you want to delete
                this note?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
