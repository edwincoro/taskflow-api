import { body } from 'express-validator';

export const createProjectValidator = [
  body().custom((_, { req }) => {
    if (!req.body.nombre) {
      throw new Error('El nombre del proyecto es requerido');
    }
    if (!req.body.descripcion) {
      throw new Error('La descripción del proyecto es requerida');
    }
    return true;
  }),

  body('nombre').optional().notEmpty().withMessage('El nombre del proyecto es requerido'),
  body('descripcion').optional().notEmpty().withMessage('La descripción del proyecto es requerida'),
];

export const updateProjectValidator = [
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'), 
  body('estado').optional().isString().withMessage('El estado debe ser texto'),
];
