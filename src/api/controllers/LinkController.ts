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
class LinkController {
  private readonly linkService: ILinkService;

  constructor(linkService: LinkService) {
    this.linkService = linkService;
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const userLogged = request.cookies.userLogged;

      const links = await this.linkService.getAll({
        where: {
          idUser: userLogged?.id,
          isActive: true,
        },
      });

      return httpResponses.ok(response, links);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async get(request: Request, response: Response): Promise<Response> {
    try {
      const userLogged = request.cookies?.userLogged;

      const { code } = request.params;

      const link = await this.linkService.get({
        where: {
          shortCode: code,
          isActive: true,
        },
        userLogged: userLogged,
      });

      return httpResponses.ok(response, link);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const userLogged = request.cookies.userLogged;

      const link = await this.linkService.getById(Number(id), {
        where: {
          idUser: userLogged?.id,
        },
      });

      return httpResponses.ok(response, link);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async getAnalytics(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const userLogged = request.cookies.userLogged;

      const analytics = await this.linkService.getAnalytics(Number(id), {
        where: {
          idUser: userLogged?.id,
        },
      });

      return httpResponses.ok(response, analytics);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const userLogged = request.cookies.userLogged;
      const { original_url: originalUrl } = request.body;

      const createLinkDto = new CreateLinkDto(originalUrl, userLogged.id ?? null);

      const newLink = await this.linkService.create(createLinkDto);

      return httpResponses.created(response, newLink);
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const userLogged = request.cookies.userLogged;
      const { id } = request.params;
      const { original_url: originalUrl } = request.body;

      const updateLinkDto = new UpdateLinkDto(Number(id), originalUrl, userLogged.id);

      await this.linkService.update(updateLinkDto);

      return httpResponses.ok(response, {}, 'Link updated successfully');
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const userLogged = request.cookies.userLogged;

      await this.linkService.delete(Number(id), {
        where: {
          idUser: userLogged?.id,
        },
      });

      return httpResponses.ok(response, {}, 'Link deleted successfully');
    } catch (error) {
      return httpResponses.handleServerError(
        response,
        strings.internalServerError,
        error as ApplicationError,
      );
    }
  }
}

export default LinkController;
