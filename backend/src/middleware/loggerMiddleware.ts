import { Request, Response, NextFunction } from 'express';
import { infoLogger, errorLogger } from '@logger';

function loggerMiddleware(req:Request, res:Response, next:NextFunction) {
  try {
    infoLogger.info('received request', [
      `ip: ${req.ip}`,
      `hostname: ${req.hostname}`,
      `url: ${req.originalUrl}`,
      `method: ${req.method}`,
    ]);
    next();
    infoLogger.info('sent response', [
      `ip: ${req.ip}`,
      `hostname: ${req.hostname}`,
      `url: ${req.originalUrl}`,
      `status: ${res.statusCode}`,
    ]);
  } catch (e) {
    errorLogger.error('failed to sent response', [
      `ip: ${req.ip}`,
      `hostname: ${req.hostname}`,
      `url: ${req.originalUrl}`,
      `status: ${res.statusCode}`,
    ]);
  }
}

export default loggerMiddleware;