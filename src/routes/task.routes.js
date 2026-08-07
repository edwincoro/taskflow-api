import { Router } from 'express';

import * as taskController from '../controllers/task.controller.js';
import {
  createTaskValidator,
  updateTaskValidator,
} from '../validators/task.validator.js';
import { validate } from '../middlewares/validation.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uuidParamValidator } from '../validators/common.validator.js';

const router = Router();

/**
 * @swagger
 * /tasks/{projectId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener todas las tareas de un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: paginado
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limite
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de tareas
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Crear una tarea en un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               completado:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.get('/:projectId', authenticate, taskController.getAllTasks);

router.post(
  '/:projectId',
  authenticate,
  createTaskValidator,
  validate,
  taskController.createTask
);

/**
 * @swagger
 * /tasks/{projectId}/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener una tarea por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Actualizar una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               completado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Eliminar una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */
router.get(
  '/:projectId/:id',
  authenticate,
  uuidParamValidator,
  validate,
  taskController.getTask
);

router.put(
  '/:projectId/:id',
  authenticate,
  uuidParamValidator,
  updateTaskValidator,
  validate,
  taskController.updateTask
);

router.delete(
  '/:projectId/:id',
  authenticate,
  uuidParamValidator,
  validate,
  taskController.deleteTask
);

/**
 * @swagger
 * /tasks/{projectId}/{id}/complete:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Marcar una tarea como completada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea marcada como completada
 */
router.patch(
  '/:projectId/:id/complete',
  authenticate,
  uuidParamValidator,
  validate,
  taskController.completeTask
);

export default router;
