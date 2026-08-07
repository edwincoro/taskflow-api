import * as projectService from '../services/project.service.js';
import { successResponse } from '../utils/response.js';
import { createProjectDto, updateProjectDto } from '../dto/project.dto.js';

export const getAllProjects = async (req, res) => {
  const projects = await projectService.findAllProjects(req.user.id);
  return successResponse(res, projects, 'Proyectos obtenidos');
};

export const createProject = async (req, res) => {
  const dto = createProjectDto(req.body, req.user.id);
  const project = await projectService.createProject(dto);

  return successResponse(res, project, 'Proyecto creado', 201);
};

export const getProject = async (req, res) => {
  const project = await projectService.getProjectById(req.params.id, req.user.id);
  return successResponse(res, project, 'Proyecto obtenido');
};

export const updateProject = async (req, res) => {
  const dto = updateProjectDto(req.body);
  const project = await projectService.updateProject(req.params.id, req.user.id, dto);
  return successResponse(res, project, 'Proyecto actualizado');
};

export const deleteProject = async (req, res) => {
  await projectService.deleteProject(req.params.id, req.user.id);
  return successResponse(res, null, 'Proyecto eliminado');
};
