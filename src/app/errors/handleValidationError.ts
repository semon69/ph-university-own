import mongoose from 'mongoose';
import { TErrorSource } from '../globalInterface/globalInterface';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorSource: TErrorSource = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
export default handleValidationError;
