export function createProjectDto(body, userId) {
  return {
    name: body.nombre,
    description: body.descripcion,
    status: body.estado,
    userId,
  };
}

export function updateProjectDto(body) {
  const name = body.nombre;
  const description = body.descripcion;
  const status = body.estado;

  return {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(status !== undefined && { status }),
  };
}