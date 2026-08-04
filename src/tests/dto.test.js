import test from 'node:test';
import assert from 'node:assert/strict';

import { loginUserDto } from '../dto/auth.dto.js';
import { createProjectDto, updateProjectDto } from '../dto/project.dto.js';
import { createTaskDto, updateTaskDto } from '../dto/task.dto.js';
import { toUserResponse } from '../dto/user-response.dto.js';

test('loginUserDto maps auth request data', () => {
  const dto = loginUserDto({ email: 'ana@example.com', password: 'secret' });

  assert.deepEqual(dto, {
    email: 'ana@example.com',
    password: 'secret',
  });
});

test('createProjectDto adds authenticated user id', () => {
  const dto = createProjectDto({ name: 'Roadmap', description: 'Plan' }, 'user-1');

  assert.deepEqual(dto, {
    name: 'Roadmap',
    description: 'Plan',
    userId: 'user-1',
  });
});

test('updateProjectDto only keeps editable fields', () => {
  const dto = updateProjectDto({ name: 'Nuevo', description: 'Desc', extra: true });

  assert.deepEqual(dto, {
    name: 'Nuevo',
    description: 'Desc',
  });
});

test('createTaskDto maps project and current user context', () => {
  const dto = createTaskDto({ projectId: 'project-1' }, { title: 'Task', description: 'Body' }, 'user-1');

  assert.deepEqual(dto, {
    projectId: 'project-1',
    userId: 'user-1',
    title: 'Task',
    description: 'Body',
  });
});

test('updateTaskDto drops undefined values', () => {
  const dto = updateTaskDto({ id: 'task-1', projectId: 'project-1' }, { title: 'Updated' }, 'user-1');

  assert.deepEqual(dto, {
    id: 'task-1',
    projectId: 'project-1',
    userId: 'user-1',
    title: 'Updated',
  });
});

test('toUserResponse maps entity fields for controller responses', () => {
  const response = toUserResponse({ id: '1', name: 'Ana', email: 'ana@example.com' });

  assert.deepEqual(response, {
    id: '1',
    name: 'Ana',
    email: 'ana@example.com',
  });
});
