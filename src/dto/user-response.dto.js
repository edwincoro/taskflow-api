export function toUserResponse(user) {
  if (!user) return null;

  return {
    usuarioId: user.id,
    nombre: user.name,
    correo: user.email,
  };
}
