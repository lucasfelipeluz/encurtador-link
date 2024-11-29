import strings from 'src/domain/utils/strings';
import ApplicationError from './ApplicationError';
import { StatusCodes } from 'src/domain/utils/constants';

class NotImplementedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = strings.notImplementedError;
    this.code = StatusCodes.NotImplemented;
  }
}

export default NotImplementedError;
