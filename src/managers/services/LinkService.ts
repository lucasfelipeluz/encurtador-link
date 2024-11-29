import { FindOptions, UpdateOptions } from 'sequelize';
import ILinkRepository from 'src/infrastructure/interfaces/ILinkRepository';
import LinkRepository from 'src/infrastructure/repositories/LinkRepository';
import LinkDto from 'src/managers/dtos/entities/LinkDto';
import CreateLinkDto from 'src/managers/dtos/helpers/CreateLinkDto';
import UpdateLinkDto from 'src/managers/dtos/helpers/UpdateLinkDto';
import ILinkService from 'src/managers/interfaces/ILinkService';
import { CreationOptions, DeletionOptions, SearchOptions } from 'src/managers/utils/options';
import { injectable } from 'tsyringe';

@injectable()
class LinkService implements ILinkService {
  private readonly linkRepository: ILinkRepository;

  constructor(linkRepository: LinkRepository) {
    this.linkRepository = linkRepository;
  }

  async getAll(options?: SearchOptions<LinkDto>): Promise<LinkDto[]> {
    const links = await this.linkRepository.getAll(options as FindOptions);

    return links.map((link) => new LinkDto(link));
  }

  async get(options?: SearchOptions<LinkDto>): Promise<LinkDto> {
    const link = await this.linkRepository.getOne(options as FindOptions);

    return link ? new LinkDto(link) : ({} as LinkDto);
  }

  async getById(id: number, options?: SearchOptions<LinkDto>): Promise<LinkDto> {
    const link = await this.linkRepository.getById(id);

    return link ? new LinkDto(link) : ({} as LinkDto);
  }

  async create(link: CreateLinkDto, options?: CreationOptions): Promise<LinkDto> {
    const linkToCreate = link.toDomain();

    const createdLink = await this.linkRepository.create(linkToCreate, {
      logging: options?.logging,
    });

    return new LinkDto(createdLink);
  }

  async update(newEntity: UpdateLinkDto, options?: UpdateOptions): Promise<void> {
    const linkToUpdate = newEntity.toDomain();

    await this.linkRepository.update(linkToUpdate, options as UpdateOptions);
  }

  async delete(id: number, options?: DeletionOptions): Promise<void> {
    await this.linkRepository.delete({ where: { id, isActive: true }, logging: options?.logging });
  }
}

export default LinkService;
