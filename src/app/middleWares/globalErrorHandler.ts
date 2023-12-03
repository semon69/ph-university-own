/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../globalInterface/globalInterface';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateKeyError from '../errors/handleDuplicateError';
import { AppError } from '../errors/appErrors';

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
  } else if (error?.name === 'ValidationError') {
    const simplefiedError = handleValidationError(error);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSource = simplefiedError?.errorSource;
  } else if (error?.name === 'CastError') {
    const simplefiedError = handleCastError(error);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSource = simplefiedError?.errorSource;
  } else if (error?.code === 11000) {
    const simplefiedError = handleDuplicateKeyError(error);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSource = simplefiedError?.errorSource;
  } else if (error instanceof Error) {
    message = error?.message;
    errorSource = [
      {
        path: ' Error occured',
        message: error?.message,
      },
    ];
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSource = [
      {
        path: 'App Error occured',
        message: error?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    // error,
    stack: config?.NODE_ENV === 'development' ? error?.stack : null,
  });
};
