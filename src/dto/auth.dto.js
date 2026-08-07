export function loginUserDto(body) {
  return {
    email: body.correo,
    password: body.contraseña,
  };
}

export function authUserResponseDto(user) {
  return {
    usuarioId: user.id,
    nombre: user.name,
    correo: user.email,
  };
}
