import 'reflect-metadata';
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import rateLimiter from './middlewares/rateLimiter'
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate'

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    const { statusCode, message } = err;

    return response.status(statusCode).json({
      status: 'error',
      message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
