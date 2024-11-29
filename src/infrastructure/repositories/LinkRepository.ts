import { FindOptions, UpdateOptions } from 'sequelize';
import Link from 'src/domain/entities/Link';
import NotFoundEntityError from 'src/domain/errors/NotFoundEntityError';
import strings from 'src/domain/utils/strings';
import IEntityRepository from 'src/infrastructure/interfaces/IBaseRepository';
import ILinkRepository from 'src/infrastructure/interfaces/ILinkRepository';
import relationships from 'src/infrastructure/models/addons/relationships';
import LinkModel from 'src/infrastructure/models/LinkModel';
import { injectable } from 'tsyringe';

@injectable()
class LinkRepository implements IEntityRepository<Link>, ILinkRepository {
  constructor() {}

  async getAll(options: FindOptions<Link>): Promise<Link[]> {
    const result = await LinkModel.findAll(options);

    if (result.length < 1) {
      return [] as Link[];
    }

    return result as Link[];
  }

  async getOne(options: FindOptions<Link>): Promise<Link | null> {
    const result = await LinkModel.findOne(options);

    return result as Link;
  }

  async getById(id: number): Promise<Link | null> {
    const result = await LinkModel.findOne({
      where: {
        id: id,
      },
      include: relationships.user,
    });

    return result as Link;
  }

  async create(entity: Link): Promise<Link> {
    const result = await LinkModel.create(entity);

    return result as Link;
  }

  async update(entity: Link, options: UpdateOptions<Link>): Promise<void> {
    const result = await LinkModel.update(entity, options);

    if (result[0] < 1) {
      throw new NotFoundEntityError(strings.users);
    }
  }

  async delete(options: UpdateOptions<Link>): Promise<void> {
    await LinkModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );
  }
}

export default LinkRepository;
