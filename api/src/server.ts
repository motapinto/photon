import express, { Request, Response } from 'express';
import Database from './database/Database';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

(async () => {
  const app = express();
  app.use(cors());
  app.use(morgan('dev'));

  dotenv.config();
  if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI must be defined');
  }

  if (!process.env.DATABASE_USERNAME) {
    throw new Error('DATABASE_USERNAME must be defined');
  }

  if (!process.env.DATABASE_PASSWORD) {
    throw new Error('DATABASE_PASSWORD must be defined');
  }

  if (!process.env.DATABASE_HTTP) {
    throw new Error('DATABASE_HTTP must be defined');
  }

  if (!process.env.DATABASE_BOLT) {
    throw new Error('DATABASE_BOLT must be defined');
  }

  if (!process.env.SERVER_PORT) {
    throw new Error('SERVER_PORT must be defined');
  }

  app.get('/graph', async(_req: Request, res: Response) => {
    const records = await Database.getInstance().getGraph() ?? [];
    return res.status(200).json(records);
  });

  const PORT = process.env.SERVER_PORT || 5000;
  app.listen(PORT, async() => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
})();