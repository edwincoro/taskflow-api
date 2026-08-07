import bcrypt from 'bcrypt';

import * as userRepository from '../repositories/user.repository.js';
import { generateToken } from '../config/jwt.js';
import { AppError } from '../utils/AppError.js';
import { authUserResponseDto } from '../dto/auth.dto.js';
import { sendAccessNotification } from "../services/email.service.js";


export const register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    return await userRepository.create({
      ...data,
      password: hashedPassword,
    });
  } catch (error) {
    // Transformamos el error técnico de DB en un error de negocio
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new AppError('El correo ya está registrado', 409);
    }
    throw error;
  }
};

export const login = async (data) => {
  const user = await userRepository.findByEmail(data.email);

  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const passwordValid = await bcrypt.compare(data.password, user.password);

  if (!passwordValid) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  // TODO: 
  // sendAccessNotification(user.name).catch(error => console.error("Error enviando correo:", error));

  return {
    token,
    user: authUserResponseDto(user),
  };
};

export const getMe = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  return user;
};
