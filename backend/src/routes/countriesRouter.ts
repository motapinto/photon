import { getAll } from '@controllers/countriesController';
import express from 'express';

const router = express.Router();
router.get('/', getAll);

export default router;
