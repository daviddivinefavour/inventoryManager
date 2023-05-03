import { validationError } from './errors';
import { returnResult } from './returning';

export default (schema) => (payload) =>
  schema
    .validate(payload)
    .then((res) => returnResult(true, res))
    .catch((error) => validationError(error));
