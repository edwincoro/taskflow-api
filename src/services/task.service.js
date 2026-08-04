import * as repository from '../repositories/task.repository.js';
import { AppError } from '../utils/AppError.js';
import { buildPaginationData } from '../utils/pagination.js';

export const createTask = async (data) => {
  return await repository.create(data.projectId, data.userId, {
    title: data.title,
    description: data.description,
  });
};

export const findTasksByProject = async (projectId, userId, page = 1, limit = 10) => {
  const totalItems = await repository.countByProject(projectId, userId);
  const offset = (page - 1) * limit;
  const items = await repository.findAllByProject(projectId, userId, offset, limit);

  return {
    items,
    pagination: buildPaginationData(page, limit, totalItems),
  };
};

export const getTask = async (id, projectId, userId) => {
  const task = await repository.findById(id, projectId, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return task;
};

export const updateTask = async (data) => {
  const task = await repository.findById(data.id, data.projectId, data.userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, {
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
  });
};

export const deleteTask = async (id, projectId, userId) => {
  const task = await repository.findById(id, projectId, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  await repository.remove(task);
};

export const completeTask = async (id, projectId, userId) => {
  const task = await repository.findById(id, projectId, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, {
    completed: true,
  });
};
