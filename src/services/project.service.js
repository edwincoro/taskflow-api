import * as repository from '../repositories/project.repository.js';
import { AppError } from '../utils/AppError.js';

export const createProject = async (data) => {
  return await repository.create(data);
};

export const findAllProjects = async (userId) => {
  return await repository.findAllByUser(userId);
};

export const getProjectById = async (id, userId) => {
  const project = await repository.findByIdWithTasks(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  return project;
};

export const updateProject = async (id, userId, data) => {
  const project = await repository.findByIdWithTasks(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  return await repository.update(project, data);
};

export const deleteProject = async (id, userId) => {
  const project = await repository.findByIdWithTasks(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  await repository.remove(project);
};
