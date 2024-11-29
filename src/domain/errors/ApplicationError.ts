import { StatusCodes } from 'src/core/enums';
import strings from 'src/domain/utils/strings';

class ApplicationError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = strings.applicationError;
    this.code = StatusCodes.InternalServerError;
  }
}

export default ApplicationError;
