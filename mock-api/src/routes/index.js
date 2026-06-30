// Router principal que combina todos los sub-routers bajo /api.

import { Router } from 'express';
import authRoutes from './authRoutes.js';
import courseRoutes from './courseRoutes.js';
import enrollmentRoutes from './enrollmentRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

// Endpoint de salud, util para verificar que la API esta activa.
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'mock-api' });
});

// Montaje de los modulos de la API.
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/admin', adminRoutes);

export default router;
