import express from 'express'

import userRoutes from './user.js'
import authRoutes from './auth.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;