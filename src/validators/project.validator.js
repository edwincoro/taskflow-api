import { body } from 'express-validator';

export const createProjectValidator = [
  body('name').notEmpty().withMessage('El nombre del proyecto es requerido'),
  body('description').notEmpty().withMessage('La descripción del proyecto es requerida'),
];

export const updateProjectValidator = [
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('description').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
  body('status').optional().isString().withMessage('El estado debe ser texto'),
];
