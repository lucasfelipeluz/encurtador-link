import ILinkService from 'src/managers/interfaces/ILinkService';
import LinkService from 'src/managers/services/LinkService';
import { autoInjectable } from 'tsyringe';
import httpResponses from '../utils/httpResponses';
import { Request, Response } from 'express';
import ApplicationError from 'src/domain/errors/ApplicationError';
import strings from 'src/domain/utils/strings';
import CreateLinkDto from 'src/managers/dtos/helpers/CreateLinkDto';
import UpdateLinkDto from 'src/managers/dtos/helpers/UpdateLinkDto';

@autoInjectable()
class HomeController {
  private readonly linkService: ILinkService;

  constructor(linkService: LinkService) {
    this.linkService = linkService;
  }

  async get(request: Request, response: Response): Promise<Response> {
    try {
      const { code } = request.params;
      const userLogged = request.cookies?.userLogged;

      const link = await this.linkService.get({
        where: {
          shortCode: code,
          isActive: true,
        },
        userLogged: userLogged,
      });

      return httpResponses.ok(response, { url: link.originalUrl });
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default HomeController;
