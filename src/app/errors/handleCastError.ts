import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../globalInterface/globalInterface';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
export default handleCastError