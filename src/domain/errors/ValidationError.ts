import { StatusCodes } from 'src/core/enums';
import strings from 'src/domain/utils/strings';
import ApplicationError from './ApplicationError';

class ValidationError extends ApplicationError {
  public readonly code: number;

  constructor(message: string) {
    super(message);
    this.name = strings.validationError;
    this.code = StatusCodes.BadRequest;
  }
}

export default ValidationError;
