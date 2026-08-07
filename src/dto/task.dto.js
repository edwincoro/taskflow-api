export function createTaskDto(params, body, userId) {
  return {
    projectId: params.projectId,
    userId,
    title: body.titulo,
    description: body.descripcion,
    completed: body.completado,
  };
}

export function updateTaskDto(params, body, userId) {
  return {
    id: params.id,
    projectId: params.projectId,
    userId,
    ...(body.titulo !== undefined && { title: body.titulo }),
    ...(body.descripcion !== undefined && { description: body.descripcion }),
    ...(body.completado !== undefined && { completed: body.completado }),
  };
}
