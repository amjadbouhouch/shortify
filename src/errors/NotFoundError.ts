import { STATUS_CODE } from '../utils/constants';
import BaseHttpError from './BaseHttpError';

export class NotFoundError extends BaseHttpError {
  constructor(message = 'NOT FOUND', functionName = '', error = {}, statusCode = STATUS_CODE.NOT_FOUND) {
    super(message, functionName, error, statusCode);
  }
}
