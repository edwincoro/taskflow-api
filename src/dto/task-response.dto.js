export function toTaskResponse(task) {
  if (!task) return null;

  return {
    id: task.id,
    titulo: task.title,
    descripcion: task.description,
    completado: task.completed,
    creadoEn: task.createdAt,
  };
}

export function toTaskListResponse(tasks) {
  return tasks.map((t) => toTaskResponse(t));
}
