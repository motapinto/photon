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

  let map = new Map();
  dotenv.config();
  map.set('DATABASE_URI', process.env.DATABASE_URI)
    .set('DATABASE_USERNAME', process.env.DATABASE_USERNAME)
    .set('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD)
    .set('DATABASE_HTTP', process.env.DATABASE_HTTP)
    .set('DATABASE_BOLT', process.env.DATABASE_BOLT)
    .set('SERVER_PORT', process.env.SERVER_PORT)
    .forEach((envValue: string, envName: string) => {
      if(!envValue) {
        throw new Error(`${envName} must be defined`);
      }
    });

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