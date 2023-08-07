import { STATUS_CODE } from '../utils/constants';

class BaseHttpError extends Error {
  constructor(
    public readonly message: string,
    public readonly functionName: string,
    public readonly error: object,
    public readonly statusCode: STATUS_CODE,
  ) {
    super(message);
  }
}
export default BaseHttpError;
