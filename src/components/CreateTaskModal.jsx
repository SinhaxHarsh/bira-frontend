import { useState } from "react";
import { motion } from "framer-motion";
import { createTask } from "../services/taskServices";
import toast from "react-hot-toast";

export default function CreateTaskModal({ open, onClose, onCreated }) {
  if (!open) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("P2");
  const [taskType, setTaskType] = useState("PERSONAL");
  const [deadline, setDeadline] = useState("");

  // Slider mapping
  const sliderToSeverity = { 0: "P2", 1: "P1", 2: "P0" };
  const severityToSlider = { P2: 0, P1: 1, P0: 2 };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description,
        severity,
        task_type: taskType,
        deadline,
      });

      toast.success("Task created!");
      onCreated();
      onClose();
    } catch (err) {
      const backend = err.response?.data;

      toast.error(
        backend?.error ||
        backend?.non_field_errors?.[0] ||
        backend?.deadline?.[0] ||
        err.message ||
        "Failed to create task"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

        <form onSubmit={handleCreate} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            className="w-full border p-2 rounded h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* 🔥 SEVERITY SLIDER */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Severity
            </label>

            {/* Badge */}
            <div className="mb-2">
              <span
                className={`
                  px-3 py-1 rounded-full text-white text-sm font-semibold
                  ${severity === "P0" ? "bg-red-600" : ""}
                  ${severity === "P1" ? "bg-yellow-500 text-black" : ""}
                  ${severity === "P2" ? "bg-green-600" : ""}
                `}
              >
                {severity === "P0" && "😬 High Priority (P0)"}
                {severity === "P1" && "🙁 Medium Priority (P1)"}
                {severity === "P2" && "😎 Low Priority (P2)"}
              </span>
            </div>

            {/* Slider */}
            <div className="flex flex-col items-center">
              <input
                type="range"
                min="0"
                max="2"
                value={severityToSlider[severity]}
                onChange={(e) => setSeverity(sliderToSeverity[e.target.value])}
                className="
                  w-full h-2 rounded-lg appearance-none cursor-pointer
                  bg-gradient-to-r from-green-400 via-yellow-400 to-red-500
                  shadow-inner shadow-gray-300
                "
              />

              {/* Labels */}
              <div className="flex justify-between w-full mt-2 text-sm font-medium">
                <span
                  className={severity === "P2" ? "text-green-600 font-bold" : ""}
                >
                  LOW
                </span>
                <span
                  className={severity === "P1" ? "text-yellow-600 font-bold" : ""}
                >
                  MEDIUM
                </span>
                <span
                  className={severity === "P0" ? "text-red-600 font-bold" : ""}
                >
                  HIGH
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-2">
                {severity === "P0" && "Fuck Off, Do this first."}
                {severity === "P1" && "This task should be prioritized."}
                {severity === "P2" && "Chill, this is not a high priority task."}
              </p>
            </div>
          </div>

          {/* Task Type */}
          <div>
            <label className="block text-gray-600 mb-1">Task Type</label>
            <select
              className="w-full border p-2 rounded"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option value="PERSONAL">Personal Work</option>
              <option value="OFFICIAL">Official Work</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-gray-600 mb-1">Deadline</label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
