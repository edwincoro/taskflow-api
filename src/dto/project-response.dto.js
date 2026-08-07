import { toTaskListResponse } from './task-response.dto.js';

export function toProjectResponse(project) {
  if (!project) return null;

  return {
    proyectoId: project.id,
    nombre: project.name,
    descripcion: project.description,
    estado: project.status,
    usuarioId: project.userId,
    tareas: project.tasks ? toTaskListResponse(project.tasks) : [],
    creadoEn: project.createdAt,
  };
}

export function toProjectListResponse(projects) {
  return projects.map((p) => toProjectResponse(p));
}
