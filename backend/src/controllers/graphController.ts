import { Request, Response } from 'express';
import Database from '@database/Database';

export async function getAll(_req: Request, res: Response) {
  try {
    const records = await Database.getInstance().getGraph() ?? [];
    return res.status(200).json(records);
  } catch (err) {
    return res.sendStatus(500);
  }
}