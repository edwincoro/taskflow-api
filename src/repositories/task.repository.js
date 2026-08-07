import Task from '../entities/task.entity.js';
import Project from '../entities/project.entity.js';

export const create = async (projectId, userId, data) => {
  const project = await Project.findOne({ where: { id: projectId, userId } });

  if (!project) {
    throw new Error('Proyecto no encontrado para este usuario');
  }

  return await Task.create({
    ...data,
    projectId,
  });
};

export const countByProject = async (projectId, userId) => {
  return await Task.count({
    where: { projectId },
    include: [{
      model: Project,
      as: 'project',
      where: { userId },
      attributes: [],
    }],
  });
};

export const findAllByProject = async (projectId, userId, offset = 0, limit = 10) => {
  return await Task.findAll({
    where: { projectId },
    include: [{
      model: Project,
      as: 'project',
      where: { userId },
      attributes: [],
    }],
    attributes: ['id', 'title', 'description', 'completed', 'createdAt'],
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  });
};

export const findById = async (id, projectId, userId) => {
  return await Task.findOne({
    where: { id, projectId },
    include: [{
      model: Project,
      as: 'project',
      where: { userId },
      attributes: [],
    }],
    attributes: ['id', 'title', 'description', 'completed', 'createdAt'],
  });
};

export const update = async (task, data) => {
  return await task.update(data);
};

export const remove = async (task) => {
  return await task.destroy();
};
