// src/pages/Tasks.jsx
import { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskServices";
import toast from "react-hot-toast";

import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  // Edit modal state
  const [editingTask, setEditingTask] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Filter state – includes COMPLETED
  const [filterType, setFilterType] = useState("ALL");

  // ----------------------------------------------------
  // Load tasks
  // ----------------------------------------------------
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ----------------------------------------------------
  // FILTER LOGIC (correct + stable)
  // ----------------------------------------------------
  const filteredTasks =
    filterType === "ALL"
      ? tasks.filter((t) => !t.completed) // SHOW ONLY ACTIVE
      : filterType === "COMPLETED"
      ? tasks.filter((t) => t.completed) // SHOW ONLY COMPLETED
      : tasks.filter(
          (t) => t.task_type === filterType && !t.completed // ACTIVE + FILTER
        );

  // Pinned + Others inside filtered list
  const pinned = filteredTasks.filter((t) => t.pinned_task);
  const others = filteredTasks.filter((t) => !t.pinned_task);

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-0 pt-6">

      {/* =======================================================
          HEADER
      ======================================================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create Task
        </button>
      </div>

      {/* =======================================================
          FILTER BUTTONS
      ======================================================= */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["ALL", "PERSONAL", "OFFICIAL", "COMPLETED"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1 rounded-lg border transition ${
              filterType === type
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* =======================================================
          PINNED TASKS (HIDDEN IN COMPLETED TAB)
      ======================================================= */}
      {filterType !== "COMPLETED" && pinned.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">📌 Pinned Tasks</h3>

          <div className="space-y-3 mb-8">
            {pinned.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                reload={loadTasks}
                onClick={() => {
                  setEditingTask(task);
                  setOpenEditModal(true);
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* =======================================================
          MAIN TASK LIST (Others or Completed)
      ======================================================= */}
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="space-y-3">
          {others.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              reload={loadTasks}
              onClick={() => {
                setEditingTask(task);
                setOpenEditModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* =======================================================
          MODALS
      ======================================================= */}

      {/* CREATE TASK */}
      <CreateTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={loadTasks}
      />

      {/* EDIT TASK */}
      <EditTaskModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        task={editingTask}
        onUpdated={loadTasks}
      />
    </div>
  );
}
