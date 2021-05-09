import { getAll } from '@controllers/graphController';
import express from 'express';

const router = express.Router();
router.get('/', getAll);

export default router;
