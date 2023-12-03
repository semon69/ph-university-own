/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../globalInterface/globalInterface';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplefiedError = handleZodError(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorSource = simplefiedError.errorSource;
  } else if(error?.name === 'ValidationError'){
    const simplefiedError = handleValidationError(error);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSource = simplefiedError?.errorSource
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    stack: config?.NODE_ENV === 'development' ? error?.stack : null,
  });
};
