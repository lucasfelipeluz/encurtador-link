import strings from 'src/domain/utils/strings';
import ApplicationError from './ApplicationError';
import { StatusCodes } from 'src/domain/utils/constants';

class ForbiddenError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.forbiddenError;
    this.code = StatusCodes.Forbidden;
  }
}

export default ForbiddenError;
