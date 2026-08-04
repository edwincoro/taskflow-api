import * as taskService from '../services/task.service.js';
import { successResponse } from '../utils/response.js';
import { createTaskDto, updateTaskDto } from '../dto/task.dto.js';

export const getAllTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await taskService.findTasksByProject(
    req.params.projectId,
    req.user.id,
    page,
    limit
  );

  return successResponse(res, result, 'Tareas obtenidas');
};

export const createTask = async (req, res) => {
  const dto = createTaskDto(req.params, req.body, req.user.id);
  const task = await taskService.createTask(dto);

  return successResponse(res, task, 'Tarea creada', 201);
};

export const getTask = async (req, res) => {
  const task = await taskService.getTask(req.params.id, req.params.projectId, req.user.id);

  return successResponse(res, task, 'Tarea obtenida');
};

export const updateTask = async (req, res) => {
  const dto = updateTaskDto(req.params, req.body, req.user.id);
  const task = await taskService.updateTask(dto);

  return successResponse(res, task, 'Tarea actualizada');
};

export const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id, req.params.projectId, req.user.id);

  return successResponse(res, null, 'Tarea eliminada');
};

export const completeTask = async (req, res) => {
  const task = await taskService.completeTask(req.params.id, req.params.projectId, req.user.id);

  return successResponse(res, task, 'Tarea completada');
};
