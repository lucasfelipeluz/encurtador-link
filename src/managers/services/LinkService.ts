import crypto from 'crypto';
import { FindOptions, UpdateOptions, WhereOptions } from 'sequelize';
import AccessMetrics from 'src/domain/entities/AccessMetrics';
import BadRequestError from 'src/domain/errors/BadRequestError';
import NotFoundEntityError from 'src/domain/errors/NotFoundEntityError';
import IAccessMetricsRepository from 'src/infrastructure/interfaces/IAccessMetricsRepository';
import ILinkRepository from 'src/infrastructure/interfaces/ILinkRepository';
import AccessMetricsRepository from 'src/infrastructure/repositories/AccessMetricsRepository';
import LinkRepository from 'src/infrastructure/repositories/LinkRepository';
import LinkDto from 'src/managers/dtos/entities/LinkDto';
import CreateLinkDto from 'src/managers/dtos/helpers/CreateLinkDto';
import UpdateLinkDto from 'src/managers/dtos/helpers/UpdateLinkDto';
import ILinkService from 'src/managers/interfaces/ILinkService';
import { CreationOptions, DeletionOptions, SearchOptions } from 'src/managers/utils/options';
import { injectable } from 'tsyringe';
import UserDto from 'src/managers/dtos/entities/UserDto';
import ResultAnalyticsDto from 'src/managers/dtos/helpers/ResultAnalyticsDto';

@injectable()
class LinkService implements ILinkService {
  private readonly linkRepository: ILinkRepository;
  private readonly acessMetricsRepository: IAccessMetricsRepository;

  constructor(linkRepository: LinkRepository, acessMetricsRepository: AccessMetricsRepository) {
    this.linkRepository = linkRepository;
    this.acessMetricsRepository = acessMetricsRepository;
  }

  private generateShortHash(input: string): string {
    const hash = crypto.createHash('sha256').update(`${input}-${new Date()}`).digest('hex');

    var num = parseInt(hash.slice(0, 8), 16);

    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let base62 = '';
    while (num > 0) {
      base62 = chars[num % 62] + base62;
      num = Math.floor(num / 62);
    }

    return base62.padStart(6, '0').slice(0, 6);
  }

  async getAll(options?: SearchOptions<LinkDto>): Promise<LinkDto[]> {
    const links = await this.linkRepository.getAll(options as FindOptions);

    return links.map((link) => new LinkDto(link));
  }

  async get(options?: SearchOptions<LinkDto>): Promise<LinkDto> {
    const link = await this.linkRepository.getOne(options as FindOptions);

    if (!link) throw new BadRequestError('Link not found');

    const userLogged = options?.userLogged as UserDto;

    await this.acessMetricsRepository.create({
      idConsultant: userLogged?.id,
      id: 0,
      idLink: link.id,
      isActive: true,
      idUser: link.idUser,
    } as AccessMetrics);

    return link ? new LinkDto(link) : ({} as LinkDto);
  }

  async getById(id: number, options?: SearchOptions<LinkDto>): Promise<LinkDto> {
    const link = await this.linkRepository.getOne({
      where: {
        id,
        isActive: true,
        ...(options?.where as WhereOptions),
      },
    });

    return link ? new LinkDto(link) : ({} as LinkDto);
  }

  async getAnalytics(id: number, options?: SearchOptions<LinkDto>): Promise<ResultAnalyticsDto> {
    const accessMetrics = await this.acessMetricsRepository.getAll({
      where: {
        ...(options?.where as WhereOptions),
        idLink: id,
      },
    });

    return {
      totalClicks: accessMetrics.length,
    } as ResultAnalyticsDto;
  }

  async create(link: CreateLinkDto, options?: CreationOptions): Promise<LinkDto> {
    var shortHash = this.generateShortHash(link.getOriginalUrl());

    const linkToCreate = link.toDomain(shortHash);

    const createdLink = await this.linkRepository.create(linkToCreate, {
      logging: options?.logging,
    });

    return new LinkDto(createdLink);
  }

  async update(newEntity: UpdateLinkDto, options?: UpdateOptions): Promise<void> {
    const isOwner = await this.linkRepository.getOne({
      where: {
        id: newEntity.getId(),
        idUser: newEntity.getIdUser() ?? null,
      },
    });

    if (!isOwner) throw new NotFoundEntityError('Link not found');

    const linkToUpdate = newEntity.toDomain(isOwner.shortCode);

    await this.linkRepository.update(linkToUpdate, {
      where: {
        id: isOwner.id,
        isActive: true,
      },
    });
  }

  async delete(id: number, options?: DeletionOptions): Promise<void> {
    await this.linkRepository.delete({
      where: { id, isActive: true, ...options?.where },
      logging: options?.logging,
    });
  }
}

export default LinkService;
