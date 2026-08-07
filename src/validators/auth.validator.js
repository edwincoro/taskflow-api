import { body } from 'express-validator';

export const registerValidator = [
  body().custom((_, { req }) => {
    if (!req.body.nombre) {
      throw new Error('El nombre es requerido');
    }
    if (!req.body.correo) {
      throw new Error('El correo es requerido');
    }
    if (!req.body.contraseña) {
      throw new Error('La contraseña es requerida');
    }
    return true;
  }),

  body('correo').optional().isEmail().withMessage('Correo electrónico inválido'),
  body('email').optional().isEmail().withMessage('Correo electrónico inválido'),

  body('contraseña')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener mínimo 6 caracteres'),
];

export const loginValidator = [
  body().custom((_, { req }) => {
    if (!req.body.correo) {
      throw new Error('El correo es requerido');
    }
    if (!req.body.contraseña) {
      throw new Error('La contraseña es requerida');
    }
    return true;
  }),

  body('correo').optional().isEmail().withMessage('Correo electrónico inválido'),

  body('contraseña').optional().notEmpty().withMessage('La contraseña es requerida'),
];
