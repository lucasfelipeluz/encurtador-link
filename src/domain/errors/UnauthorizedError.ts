import { StatusCodes } from 'src/core/enums';
import strings from 'src/domain/utils/strings';
import ApplicationError from './ApplicationError';

class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.unauthorizedError;
    this.code = StatusCodes.Unauthorized;
  }
}

export default UnauthorizedError;
