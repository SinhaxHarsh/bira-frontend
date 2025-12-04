// src/services/taskService.js
import api from "./api";

// ===== TASKS =====
export async function fetchTasks() {
  return (await api.get("tasks/")).data;
}

export async function createTask(data) {
  return (await api.post("tasks/", data)).data;
}

export async function updateTask(id, data) {
  return (await api.patch(`tasks/${id}/update/`, data)).data;
}

export async function deleteTask(id) {
  return (await api.delete(`tasks/${id}/delete/`)).data;
}

export async function deleteAllTasks() {
  return (await api.delete("tasks/delete/all/")).data;
}

export async function updateTaskSeverity(id, severity) {
  return (await api.patch(`tasks/${id}/severity/`, { severity })).data;
}

export async function updateTaskDeadline(id, deadline) {
  return (await api.patch(`tasks/${id}/deadline/`, { deadline })).data;
}

export async function updateTaskStartTime(id, start) {
  return (await api.patch(`tasks/${id}/start/`, { start })).data;
}

export async function pinTask(id, pinned) {
  return (await api.patch(`tasks/${id}/pin/`, { pinned_task: pinned })).data;
}

export async function completeTask(id, completed) {
  return (await api.patch(`tasks/${id}/complete/`, { completed })).data;
}

// ===== NOTES =====

export async function fetchNotes(taskId) {
  return (await api.get(`tasks/${taskId}/notes/`)).data;
}

export async function createNote(taskId, content) {
  await initCSRF(); // <-- REFRESH CSRF BEFORE POST (FIX)
  return (await api.post(`tasks/${taskId}/notes/`, { content })).data;
}

export async function updateNote(noteId, content) {
  return (await api.patch(`notes/${noteId}/update/`, { content })).data;
}

export async function deleteNote(noteId) {
  return (await api.delete(`notes/${noteId}/delete/`)).data;
}
