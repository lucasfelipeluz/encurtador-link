import { FindOptions, UpdateOptions } from 'sequelize';
import AccessMetrics from 'src/domain/entities/AccessMetrics';
import NotFoundEntityError from 'src/domain/errors/NotFoundEntityError';
import strings from 'src/domain/utils/strings';
import IAccessMetricsRepository from 'src/infrastructure/interfaces/IAccessMetricsRepository';
import IEntityRepository from 'src/infrastructure/interfaces/IBaseRepository';
import AccessMetricsModel from 'src/infrastructure/models/AccessMetricsModel';
import relationships from 'src/infrastructure/models/addons/relationships';
import { injectable } from 'tsyringe';

@injectable()
class LinkRepository implements IEntityRepository<AccessMetrics>, IAccessMetricsRepository {
  constructor() {}

  async getAll(options: FindOptions<AccessMetrics>): Promise<AccessMetrics[]> {
    const result = await AccessMetricsModel.findAll(options);

    if (result.length < 1) {
      return [] as AccessMetrics[];
    }

    return result as AccessMetrics[];
  }

  async getOne(options: FindOptions<AccessMetrics>): Promise<AccessMetrics | null> {
    const result = await AccessMetricsModel.findOne(options);

    return result as AccessMetrics;
  }

  async getById(id: number): Promise<AccessMetrics | null> {
    const result = await AccessMetricsModel.findOne({
      where: {
        id: id,
      },
      include: relationships.user,
    });

    return result as AccessMetrics;
  }

  async create(entity: AccessMetrics): Promise<AccessMetrics> {
    const result = await AccessMetricsModel.create(entity);

    return result as AccessMetrics;
  }

  async update(entity: AccessMetrics, options: UpdateOptions<AccessMetrics>): Promise<void> {
    const result = await AccessMetricsModel.update(entity, options);

    if (result[0] < 1) {
      throw new NotFoundEntityError(strings.users);
    }
  }

  async delete(options: UpdateOptions<AccessMetrics>): Promise<void> {
    await AccessMetricsModel.update(
      {
        isActive: false,
        deletedAt: new Date(),
      },
      options,
    );
  }
}

export default LinkRepository;
