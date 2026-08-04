export function loginUserDto(body) {
  return {
    email: body.email,
    password: body.password,
  };
}

export function authUserResponseDto(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
