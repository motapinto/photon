import winston from 'winston';

export const errorLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

export const infoLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
  ],
});

if (process.env.NODE_ENV !== 'prod') {
  errorLogger.add(new winston.transports.Console({
    format: winston.format.align(),
  }));
  infoLogger.add(new winston.transports.Console({
    format: winston.format.align(),
  }));
}