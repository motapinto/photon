import express from 'express';
import graphRouter from './graphRouter';

const router = express.Router();
router.use('/graph', graphRouter);

export default router;