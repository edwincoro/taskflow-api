import * as repository from '../repositories/project.repository.js';
import { AppError } from '../utils/AppError.js';
import { toProjectResponse, toProjectListResponse } from '../dto/project-response.dto.js';

export const createProject = async (data) => {
  const project = await repository.create(data);
  return toProjectResponse(project);
};

export const findAllProjects = async (userId) => {
  const projects = await repository.findAllByUser(userId);
  return toProjectListResponse(projects);
};

export const getProjectById = async (id, userId) => {
  const project = await repository.findByIdWithTasks(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  return toProjectResponse(project);
};

export const updateProject = async (id, userId, data) => {
  const project = await repository.findByIdWithTasks(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  const updated = await repository.update(project, data);
  return toProjectResponse(updated);
};

export const deleteProject = async (id, userId) => {
  const project = await repository.findByIdWithTasks(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  await repository.remove(project);
};
