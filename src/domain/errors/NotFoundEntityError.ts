import strings from 'src/domain/utils/strings';
import ApplicationError from './ApplicationError';
import { StatusCodes } from 'src/domain/utils/constants';

class NotFoundEntityError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.notFoundEntityError;
    this.code = StatusCodes.BadRequest;
  }
}

export default NotFoundEntityError;
