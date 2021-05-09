import express from 'express';
import countriesRouter from './countriesRouter';
import graphRouter from './graphRouter';

const router = express.Router();
router.use('/countries', countriesRouter);
router.use('/graph', graphRouter);

export default router;