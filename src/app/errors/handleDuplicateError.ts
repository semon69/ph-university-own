/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TErrorSource,
  TGenericErrorResponse,
} from '../globalInterface/globalInterface';

const handleDuplicateKeyError = (error: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = error.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSource: TErrorSource = [
    {
      path: ' ',
      message: `${extractedMessage} is already exists`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
export default handleDuplicateKeyError;
