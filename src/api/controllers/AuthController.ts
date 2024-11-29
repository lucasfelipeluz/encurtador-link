import { Request, Response } from 'express';
import httpResponses from 'src/api/utils/httpResponses';
import ApplicationError from 'src/domain/errors/ApplicationError';
import strings from 'src/domain/utils/strings';
import RegisterDto from 'src/managers/dtos/helpers/RegisterDto';
import IAuthService from 'src/managers/interfaces/IAuthService';
import AuthService from 'src/managers/services/AuthService';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class AuthController {
  private readonly authService: IAuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const userLogged = await this.authService.login(email, password);

      return httpResponses.ok(response, userLogged);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const newUser = new RegisterDto(name, email, password);

      const registedUser = await this.authService.register(newUser);

      return httpResponses.created(response, registedUser);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default AuthController;
