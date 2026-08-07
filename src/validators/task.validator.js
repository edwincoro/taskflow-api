import { body } from 'express-validator';

export const createTaskValidator = [
  body().custom((_, { req }) => {
    if (!req.body.titulo) {
      throw new Error('El título es requerido');
    }
    return true;
  }),

  body('titulo')
    .optional()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ max: 255 })
    .withMessage('El título debe tener menos de 255 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('completado')
    .optional()
    .isBoolean()
    .withMessage('El completado debe ser un valor booleano'),
];

export const updateTaskValidator = [
  body('titulo')
    .optional()
    .notEmpty()
    .withMessage('El título no puede estar vacío')
    .isLength({ max: 255 })
    .withMessage('El título debe tener menos de 255 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('completado')
    .optional()
    .isBoolean()
    .withMessage('El valor de completado debe ser un valor booleano'),
];
