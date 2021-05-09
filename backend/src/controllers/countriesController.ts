import { Request, Response } from 'express';
import { Country } from '@model/Country';

export async function getAll(_req: Request, res: Response) {
  try {
    const countries = await Country.getAll();
    return res.status(200).json(countries);
  } catch (e) {
    return res.sendStatus(500);
  }
}