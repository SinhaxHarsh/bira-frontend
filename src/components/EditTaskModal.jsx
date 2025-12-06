import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  updateTask,
  fetchNotes,
  createNote,
  deleteNote,
} from "../services/taskServices";

// Convert backend datetime → input format
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

  // Severity slider mapping
  const sliderToSeverity = { 0: "P2", 1: "P1", 2: "P0" };
  const severityToSlider = { P2: 0, P1: 1, P0: 2 };

  // Load task into fields
  useEffect(() => {
    if (task) {
      setSeverity(task.severity || "P2");
      setTaskType(task.task_type || "PERSONAL");
      setStart(toInputDateTime(task.start));
      setDeadline(toInputDateTime(task.deadline));
      setPinned(Boolean(task.pinned_task));
    }
  }, [task]);

  // Load notes
  useEffect(() => {
    if (!open || !task.id) return;

    const loadNotes = async () => {
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

    loadNotes();
  }, [open, task]);

  // Update task
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

      toast.success("Task updated!");
      onUpdated?.();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.error ??
          err.response?.data?.detail ??
          "Update failed"
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
      setNotes((n) => [created, ...n]);
      setNewNote("");
    } catch {
      toast.error("Unable to add note");
    } finally {
      setAddingNote(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setDeletingNoteId(id);
      await deleteNote(id);
      setNotes((n) => n.filter((x) => x.id !== id));
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setDeletingNoteId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start md:items-center z-50 overflow-y-auto pt-10 md:pt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Task</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">×</button>
        </div>

        {/* BODY SPLIT GRID */}
        <div className="grid md:grid-cols-2">

          {/* ============================== */}
          {/* LEFT PANEL — MAIN FIELDS     */}
          {/* ============================== */}
          <div className="px-6 py-6 space-y-6">

            {/* Title box */}
            <div className="p-4 rounded-xl bg-gray-50 border">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              {task.description && (
                <p className="text-xs text-gray-600 mt-1">{task.description}</p>
              )}
            </div>

            {/* Task Type */}
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

            {/* Pin Toggle */}
            <div>
              <label className="block text-sm font-medium mb-1">Pin Task</label>
              <button
                type="button"
                onClick={() => setPinned((p) => !p)}
                className="w-full flex items-center justify-between border px-4 py-2 rounded-lg"
              >
                <span className="text-sm">{pinned ? "Pinned" : "Not pinned"}</span>
                <div
                  className={`w-11 h-6 rounded-full p-1 flex items-center transition ${
                    pinned ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition ${
                      pinned ? "translate-x-5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-medium mb-1">Severity</label>

              <div className="mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${severity === "P0" ? "bg-red-600 text-white" : ""}
                    ${severity === "P1" ? "bg-yellow-400 text-black" : ""}
                    ${severity === "P2" ? "bg-green-600 text-white" : ""}`}
                >
                  {severity === "P0" && "😬 High Priority (P0)"}
                  {severity === "P1" && "🙁 Medium Priority (P1)"}
                  {severity === "P2" && "😎 Low Priority (P2)"}
                </span>
              </div>

              <div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={severityToSlider[severity]}
                  onChange={(e) =>
                    setSeverity(sliderToSeverity[e.target.value])
                  }
                  className="w-full h-2 rounded-lg cursor-pointer bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 shadow-inner"
                />

                <div className="flex justify-between w-full mt-2 text-xs font-medium">
                  <span className={severity === "P2" ? "text-green-600 font-bold" : ""}>LOW</span>
                  <span className={severity === "P1" ? "text-yellow-600 font-bold" : ""}>MEDIUM</span>
                  <span className={severity === "P0" ? "text-red-600 font-bold" : ""}>HIGH</span>
                </div>
              </div>
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="datetime-local"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={start}
                onChange={(e) => {
                  const newStart = e.target.value;
                  if (deadline && new Date(newStart) > new Date(deadline)) {
                    toast.error("Start cannot be after deadline");
                    return;
                  }
                  setStart(newStart);
                }}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <input
                type="datetime-local"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={deadline}
                onChange={(e) => {
                  const newDeadline = e.target.value;
                  if (start && new Date(newDeadline) < new Date(start)) {
                    toast.error("Deadline cannot be before start");
                    return;
                  }
                  setDeadline(newDeadline);
                }}
              />
            </div>
          </div>

          {/* ============================== */}
          {/* RIGHT PANEL — NOTES           */}
          {/* ============================== */}
          <div className="px-6 py-6 bg-gray-50 space-y-4">

            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800 text-md">Notes</h3>
              {notesLoading && <span className="text-xs text-gray-500">Loading...</span>}
            </div>

            {/* Add note */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={handleAddNote}
                disabled={addingNote}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                {addingNote ? "..." : "Add"}
              </button>
            </div>

            {/* Notes list */}
            <div className="space-y-2 max-h-[330px] overflow-y-auto pr-1">
              {notes.length === 0 ? (
                <p className="text-xs text-gray-500">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white border rounded-lg px-3 py-2 flex justify-between items-start"
                  >
                    <p className="text-sm text-gray-800">{note.content}</p>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      disabled={deletingNoteId === note.id}
                      className="text-xs text-red-500 ml-3"
                    >
                      {deletingNoteId === note.id ? "..." : "✕"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
