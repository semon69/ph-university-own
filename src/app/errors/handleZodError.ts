import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../globalInterface/globalInterface";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleZodError