export function createProjectDto(body, userId) {
  return {
    name: body.name,
    description: body.description,
    userId,
  };
}

export function updateProjectDto(body) {
  return {
    ...(body.name !== undefined ? { name: body.name } : {}),
    ...(body.description !== undefined ? { description: body.description } : {}),
  };
}
