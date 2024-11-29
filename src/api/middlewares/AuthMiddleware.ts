import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import httpResponses from 'src/api/utils/httpResponses';
import ApplicationError from 'src/domain/errors/ApplicationError';
import ForbiddenError from 'src/domain/errors/ForbiddenError';
import strings from 'src/domain/utils/strings';
import IApplicationConfigProvider from 'src/infrastructure/interfaces/IApplicationConfigProvider';
import ApplicationConfigProvider from 'src/infrastructure/providers/ApplicationConfigProvider';
import UserDto from 'src/managers/dtos/entities/UserDto';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AuthMiddleware {
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(applicationConfigProvider: ApplicationConfigProvider) {
    this.applicationConfigProvider = applicationConfigProvider;
  }

  handlePrivate(request: Request, response: Response, next: NextFunction): void | Response {
    try {
      const { authorization } = request.headers;

      const token = authorization?.replace('Bearer ', '');

      if (!token) {
        throw new ForbiddenError(strings.notPermissionError);
      }

      const authConfig = this.applicationConfigProvider.getAuthConfig();

      const decoded = jwt.verify(token, authConfig.secretKey);

      request.cookies = {
        userLogged: decoded as UserDto,
      };

      return next();
    } catch (error) {
      return httpResponses.forbidden(response, strings.notPermissionError);
    }
  }

  handlePermitive(request: Request, response: Response, next: NextFunction): void | Response {
    try {
      const { authorization } = request.headers;

      const token = authorization?.replace('Bearer ', '');

      if (!token) {
        return next();
      }

      const authConfig = this.applicationConfigProvider.getAuthConfig();

      const decoded = jwt.verify(token, authConfig.secretKey);

      request.cookies = {
        userLogged: decoded as UserDto,
      };

      return next();
    } catch (error) {
      return next();
    }
  }
}

export default AuthMiddleware;
