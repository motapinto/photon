import express, { Request, Response } from 'express';
import Database from '@database/Database';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorLogger, infoLogger } from '@logger';

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

  app.get('/graph', async(_req: Request, res: Response) => {
    try {
      const records = await Database.getInstance().getGraph() ?? [];
      return res.status(200).json(records);
    } catch (err) {
      errorLogger.error(err);
    }
  });

  const PORT = process.env.SERVER_PORT || 5000;
  app.listen(PORT, async() => {
    infoLogger.info(`Server started at http://localhost:${PORT}`);
  });
})();