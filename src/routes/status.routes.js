import { Router } from 'express';
import { getStatus } from '../controllers/status.controller.js';

const router = Router();

/**
 * @swagger
 * /status:
 *   get:
 *     tags:
 *       - Status
 *     summary: Estado de la API
 *     responses:
 *       200:
 *         description: Estado de la API
 */
router.get('/', getStatus);

export default router;
