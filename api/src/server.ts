import express, { Request, Response } from 'express';
import Database from '@database/Database';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import winston from 'winston';

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

  const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log' }),
    ],
  });

  app.get('/graph', async(_req: Request, res: Response) => {
    try {
      const records = await Database.getInstance().getGraph() ?? [];
      return res.status(200).json(records);
    } catch (err) {
      logger.error(err);
    }
  });

  const PORT = process.env.SERVER_PORT || 5000;
  app.listen(PORT, async() => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
})();