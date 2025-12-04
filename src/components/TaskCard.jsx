// src/components/TaskCard.jsx
import { useState } from "react";
import {
  pinTask,
  deleteTask,
  completeTask,
  fetchNotes,
  createNote,
} from "../services/taskServices";
import toast from "react-hot-toast";

export default function TaskCard({ task, reload, onClick }) {
  // ================================
  // STATE
  // ================================
  const [showInfo, setShowInfo] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // ================================
  // SEVERITY CONFIG
  // ================================
  const severityColors = {
    P0: "bg-red-600 text-white",
    P1: "bg-yellow-500 text-black",
    P2: "bg-green-600 text-white",
  };

  const severityInfo = {
    P0: "Highest priority — finish ASAP.",
    P1: "Medium priority — important but not urgent.",
    P2: "Low priority — can be delayed.",
  };

  // ================================
  // HELPERS
  // ================================
  const stop = (e) => e.stopPropagation();

  const pinnedBg = task.pinned_task
    ? "bg-yellow-50 border-yellow-300"
    : "bg-white";

  // ================================
  // LOAD NOTES
  // ================================
  const loadNotes = async (e) => {
    stop(e);
    const data = await fetchNotes(task.id);
    setNotes(data);
    setShowNotes(true);
  };

  // ================================
  // ADD NOTE
  // ================================
  const addNote = async (e) => {
    stop(e);
    if (!newNote.trim()) return;

    await createNote(task.id, newNote);
    setNewNote("");

    const data = await fetchNotes(task.id);
    setNotes(data);

    toast.success("Note added");

    // Auto close
    setShowNotes(false);
  };

  // ================================
  // MAIN RETURN
  // ================================
  return (
    <div
      onClick={(e) => {
        setShowNotes(false); 
        onClick?.(task);     // 🔥 This opens the EditTaskModal
      }}
  className={`p-4 rounded-xl shadow border hover:shadow-lg cursor-pointer transition 
        flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 ${pinnedBg}`}
>


      {/* ================================
          LEFT SECTION (TITLE, INFO, NOTES)
         ================================ */}
      <div className="relative flex-1">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {task.title}

          {/* SEVERITY BADGE */}
          <span
            className={`px-2 py-0.5 rounded text-xs ${severityColors[task.severity]}`}
          >
            {task.severity}
          </span>

          {/* ℹ️ INFO BUTTON */}
          <span
            className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
            onMouseEnter={(e) => {
              stop(e);
              setShowInfo(true);
            }}
            onMouseLeave={(e) => {
              stop(e);
              setShowInfo(false);
            }}
          >
            ℹ️
          </span>

          {/* COMPLETED CHECK */}
          {task.completed && <span className="text-green-600">✔</span>}
        </h2>

        {/* ================================
            SEVERITY INFO POPUP
            (Appears on hover)
           ================================ */}
        {showInfo && (
          <div
            onClick={stop}
            className="absolute bg-white border rounded-lg shadow p-3 w-48 text-sm mt-2 z-40"
          >
            <strong>{task.severity} Meaning:</strong>
            <p className="text-gray-600 mt-1">{severityInfo[task.severity]}</p>
          </div>
        )}

        {/* DESCRIPTION */}
        <p className="text-gray-600 mt-1">{task.description}</p>

        {/* DEADLINE */}
        {task.deadline && (
          <p className="text-sm text-gray-500 mt-1">
            ⏳ Deadline: {new Date(task.deadline).toLocaleString()}
          </p>
        )}

        <p className="mt-1 text-xs text-gray-400">Type: {task.task_type}</p>

        {/* ================================
            NOTES BOX
           ================================ */}
        {showNotes && (
          <div
            onClick={stop}
            className="mt-3 bg-gray-50 border rounded-lg p-3 w-full sm:w-72 shadow-lg z-40"
          >
            <h4 className="font-semibold text-sm mb-2">Notes</h4>

            {/* NO NOTES */}
            {notes.length === 0 && (
              <p className="text-xs text-gray-500">No notes yet.</p>
            )}

            {/* NOTES LIST */}
            {notes.map((n) => (
              <p key={n.id} className="text-sm text-gray-700 mb-1">
                • {n.content}
              </p>
            ))}

            {/* ADD NOTE INPUT */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 border p-2 rounded text-sm"
                placeholder="Add a note..."
              />
              <button
                onClick={addNote}
                className="bg-blue-600 text-white px-3 rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================================
          RIGHT ACTION BUTTONS
         ================================ */}
      <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 self-start sm:self-auto">

        {/* PIN */}
        <button
          onClick={async (e) => {
            stop(e);
            await pinTask(task.id, !task.pinned_task);
            reload();
          }}
          className="text-yellow-600 hover:text-yellow-800 text-xl"
          title="Pin"
        >
          📌
        </button>

        {/* COMPLETE */}
        <button
          onClick={async (e) => {
            stop(e);
            await completeTask(task.id, !task.completed);
            reload();
          }}
          className="text-green-600 hover:text-green-800 text-xl"
          title="Mark Complete"
        >
          ✔
        </button>

        {/* NOTES BUTTON */}
        <button
          onClick={(e) => {
            stop(e);
            loadNotes(e);
          }}
          className="text-blue-600 hover:text-blue-800 text-xl"
          title="Notes"
        >
          📝
        </button>

        {/* DELETE */}
        <button
          onClick={async (e) => {
            stop(e);
            await deleteTask(task.id);
            reload();
          }}
          className="text-red-600 hover:text-red-800 text-xl"
          title="Delete"
        >
          🗑
        </button>

      </div>
    </div>
  );
}
