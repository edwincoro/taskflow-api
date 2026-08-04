export function createTaskDto(params, body, userId) {
  return {
    projectId: params.projectId,
    userId,
    title: body.title,
    description: body.description,
  };
}

export function updateTaskDto(params, body, userId) {
  return {
    id: params.id,
    projectId: params.projectId,
    userId,
    ...(body.title !== undefined ? { title: body.title } : {}),
    ...(body.description !== undefined ? { description: body.description } : {}),
  };
}
