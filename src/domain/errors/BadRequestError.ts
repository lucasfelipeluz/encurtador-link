import strings from 'src/domain/utils/strings';
import ApplicationError from './ApplicationError';
import { StatusCodes } from 'src/core/enums';

class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.badRequestError;
    this.code = StatusCodes.BadRequest;
  }
}

export default BadRequestError;
