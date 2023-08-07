import { STATUS_CODE } from '../utils/constants';
import BaseHttpError from './BaseHttpError';

export class DuplicatedError extends BaseHttpError {
  constructor(message = 'DUPLICATED', functionName = '', error = {}, statusCode = STATUS_CODE.DUPLICATED) {
    super(message, functionName, error, statusCode);
  }
}
