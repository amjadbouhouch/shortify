import { STATUS_CODE } from '../utils/constants';
import BaseHttpError from './BaseHttpError';

export class UnauthorizedError extends BaseHttpError {
  constructor(msg = 'UNAUTHORIZED', functionName = '', error = {}, statusCode = STATUS_CODE.UNAUTHORIZED) {
    super(msg, functionName, error, statusCode);
  }
}
