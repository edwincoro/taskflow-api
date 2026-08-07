import test from 'node:test';
import assert from 'node:assert/strict';

import { loginUserDto } from '../dto/auth.dto.js';
import { createProjectDto, updateProjectDto } from '../dto/project.dto.js';
import { createTaskDto, updateTaskDto } from '../dto/task.dto.js';
import { toUserResponse } from '../dto/user-response.dto.js';

test('loginUserDto maps auth request data', () => {
  const dto = loginUserDto({ correo: 'ana@example.com', contraseña: 'secret' });

  assert.deepEqual(dto, {
    email: 'ana@example.com',
    password: 'secret',
  });
});

test('createProjectDto adds authenticated user id', () => {
  const dto = createProjectDto({ nombre: 'Roadmap', descripcion: 'Plan', estado: 'active' }, 'user-1');

  assert.deepEqual(dto, {
    name: 'Roadmap',
    description: 'Plan',
    status: 'active',
    userId: 'user-1',
  });
});

test('updateProjectDto only keeps editable fields', () => {
  const dto = updateProjectDto({ nombre: 'Nuevo', descripcion: 'Desc', estado: 'inactive', extra: true });

  assert.deepEqual(dto, {
    name: 'Nuevo',
    description: 'Desc',
    status: 'inactive',
  });
});

test('createTaskDto maps project and current user context', () => {
  const dto = createTaskDto(
    { projectId: 'project-1' },
    { titulo: 'Task', descripcion: 'Body', completado: true },
    'user-1'
  );

  assert.deepEqual(dto, {
    projectId: 'project-1',
    userId: 'user-1',
    title: 'Task',
    description: 'Body',
    completed: true,
  });
});

test('updateTaskDto drops undefined values', () => {
  const dto = updateTaskDto(
    { id: 'task-1', projectId: 'project-1' },
    { titulo: 'Updated', completado: true },
    'user-1'
  );

  assert.deepEqual(dto, {
    id: 'task-1',
    projectId: 'project-1',
    userId: 'user-1',
    title: 'Updated',
    completed: true,
  });
});

test('toUserResponse maps entity fields for controller responses', () => {
  const response = toUserResponse({ id: '1', name: 'Ana', email: 'ana@example.com' });

  assert.deepEqual(response, {
    usuarioId: '1',
    nombre: 'Ana',
    correo: 'ana@example.com',
  });
});
