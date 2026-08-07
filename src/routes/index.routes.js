import { Router } from 'express';
import taskRoutes from './task.routes.js';
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import statusRoutes from './status.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to TaskFlow API');
});

router.use('/status', statusRoutes);

router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);
router.use('/auth', authRoutes);

export default router;
