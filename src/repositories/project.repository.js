import Project from '../entities/project.entity.js';
import Task from '../entities/task.entity.js';

export const create = async (data) => {
  return await Project.create(data);
};

export const findAllByUser = async (userId) => {
  return await Project.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
};

export const findByIdWithTasks = async (id, userId) => {
  return await Project.findOne({
    where: { id, userId },
    include: [
      {
        model: Task,
        as: 'tasks',
        attributes: ['id', 'title', 'description', 'completed', 'createdAt'],
      },
    ],
  });
};

export const update = async (project, data) => {
  return await project.update(data);
};

export const remove = async (project) => {
  return await project.destroy();
};
