import winston from 'winston';
import { returnResult } from './returning';

export const validationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e);
  winston.error(`Unable to validate data ${errors[0]}`);
  return returnResult(false, {
    status: 422,
    title: 'Validation error',
    message: errors[0]
  });
};
