// ======================================================
// EditTaskModal.jsx (Professional Two-Column Layout)
// ======================================================

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  updateTask,
  fetchNotes,
  createNote,
  deleteNote,
} from "../services/taskServices";

function toInputDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}

export default function EditTaskModal({ open, onClose, task, onUpdated }) {
  if (!open || !task) return null;

  const [severity, setSeverity] = useState("P2");
  const [taskType, setTaskType] = useState("PERSONAL");
  const [start, setStart] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pinned, setPinned] = useState(false);
  const [saving, setSaving] = useState(false);

  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  const sliderToSeverity = { 0: "P2", 1: "P1", 2: "P0" };
  const severityToSlider = { P2: 0, P1: 1, P0: 2 };

  useEffect(() => {
    if (task) {
      setSeverity(task.severity || "P2");
      setTaskType(task.task_type || "PERSONAL");
      setStart(toInputDateTime(task.start));
      setDeadline(toInputDateTime(task.deadline));
      setPinned(Boolean(task.pinned_task));
    }
  }, [task]);

  useEffect(() => {
    if (!open || !task.id) return;

    const load = async () => {
      try {
        setNotesLoading(true);
        const data = await fetchNotes(task.id);
        setNotes(data);
      } catch {
        toast.error("Failed to load notes");
      } finally {
        setNotesLoading(false);
      }
    };
    load();
  }, [open, task]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateTask(task.id, {
        severity,
        task_type: taskType,
        start: start || null,
        deadline: deadline || null,
        pinned_task: pinned,
      });

      toast.success("Task updated");
      onUpdated?.();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Failed to update task"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return toast.error("Note cannot be empty");

    try {
      setAddingNote(true);
      const created = await createNote(task.id, newNote.trim());
      setNotes((prev) => [created, ...prev]);
      setNewNote("");
    } catch {
      toast.error("Failed to add note");
    } finally {
      setAddingNote(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setDeletingNoteId(id);
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setDeletingNoteId(null);
    }
  };

  // ======================================================
  // PROFESSIONAL TWO-COLUMN UI
  // ======================================================

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center overflow-y-auto py-10 z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">Edit Task</h2>
            <p className="text-sm text-gray-500">
              Modify task settings, schedule & notes.
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 text-3xl -mt-2"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* TITLE BLOCK */}
        <div className="border rounded-xl bg-gray-50 px-4 py-3 mb-6">
          <h3 className="text-base font-semibold">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SIDE — SETTINGS */}
          <form onSubmit={handleUpdate} className="space-y-6">

            {/* TASK TYPE & PIN */}
            <div className="grid grid-cols-1 gap-5">

              <div>
                <label className="block text-sm font-medium mb-1">Task Type</label>
                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="PERSONAL">Personal Work</option>
                  <option value="OFFICIAL">Official Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pin Task</label>

                <button
                  type="button"
                  onClick={() => setPinned((p) => !p)}
                  className="flex items-center justify-between px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 w-full"
                >
                  <span className="text-sm">{pinned ? "Pinned" : "Not pinned"}</span>

                  <div
                    className={`w-11 h-6 rounded-full flex items-center p-1 transition ${
                      pinned ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full transition ${
                        pinned ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* SEVERITY */}
            <div>
              <label className="text-sm font-medium mb-1">Severity</label>

              <div className="mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    severity === "P0"
                      ? "bg-red-100 text-red-700"
                      : severity === "P1"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {severity} Priority
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="2"
                value={severityToSlider[severity]}
                onChange={(e) =>
                  setSeverity(sliderToSeverity[e.target.value])
                }
                className="w-full h-2 rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 cursor-pointer"
              />
            </div>

            {/* TIME */}
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* RIGHT SIDE — NOTES */}
          <div className="border rounded-xl p-4 bg-gray-50 h-full flex flex-col">

            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold">Notes</h3>
              {notesLoading && <span className="text-xs">Loading...</span>}
            </div>

            {/* ADD NOTE */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={handleAddNote}
                disabled={addingNote}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                {addingNote ? "..." : "Add"}
              </button>
            </div>

            {/* NOTES LIST */}
            <div className="space-y-2 overflow-y-auto pr-1 flex-1">
              {notes.length === 0 ? (
                <p className="text-xs text-gray-500">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex justify-between items-start bg-white border rounded-lg px-3 py-2"
                  >
                    <p className="text-xs text-gray-800">{note.content}</p>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      disabled={deletingNoteId === note.id}
                      className="text-xs text-red-500 ml-2"
                    >
                      {deletingNoteId === note.id ? "..." : "✕"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
