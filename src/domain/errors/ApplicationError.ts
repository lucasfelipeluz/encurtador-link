import strings from 'src/domain/utils/strings';
import { StatusCodes } from 'src/domain/utils/constants';

class ApplicationError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = strings.applicationError;
    this.code = StatusCodes.InternalServerError;
  }
}

export default ApplicationError;
