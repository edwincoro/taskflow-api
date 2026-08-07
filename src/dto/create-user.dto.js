export function createUserDto(body) {
  return {
    name: body.nombre,
    email: body.correo,
    password: body.contraseña,
  };
}
