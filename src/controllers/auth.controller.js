import * as authService from '../services/auth.service.js';
import { successResponse } from '../utils/response.js';
import { toUserResponse } from '../dto/user-response.dto.js';
import { createUserDto } from '../dto/create-user.dto.js';
import { loginUserDto, authUserResponseDto } from '../dto/auth.dto.js';

export const register = async (req, res) => {
  const dto = createUserDto(req.body);
  const user = await authService.register(dto);

  return successResponse(res, authUserResponseDto(user), 'Usuario registrado', 201);
};

export const login = async (req, res) => {
  const dto = loginUserDto(req.body);
  const result = await authService.login(dto);

  return successResponse(res, result, 'Inicio de sesión exitoso');
};

export const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  const userResponse = toUserResponse(user);

  return successResponse(res, userResponse, 'Usuario autenticado');
};
