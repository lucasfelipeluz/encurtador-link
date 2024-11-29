import { FindOptions } from 'sequelize';
import IAcessMetricsRepository from 'src/infrastructure/interfaces/IAccessMetricsRepository';
import AccessMetricsRepository from 'src/infrastructure/repositories/AccessMetricsRepository';
import AccessMetricsDto from 'src/managers/dtos/entities/AccessMetricsDto';
import CreateAccessMetricsDto from 'src/managers/dtos/helpers/CreateAccessMetricsDto';
import IAccessMetricsService from 'src/managers/interfaces/IAccessMetricsService';
import { CreationOptions, SearchOptions } from 'src/managers/utils/options';
import { injectable } from 'tsyringe';

@injectable()
class AccessMetricsService implements IAccessMetricsService {
  private readonly accessMetricsRepository: IAcessMetricsRepository;

  constructor(accessMetricsRepository: AccessMetricsRepository) {
    this.accessMetricsRepository = accessMetricsRepository;
  }

  async getAll(options?: SearchOptions<AccessMetricsDto>): Promise<AccessMetricsDto[]> {
    const accessMetrics = await this.accessMetricsRepository.getAll(options as FindOptions);

    return accessMetrics.map((accessMetric) => new AccessMetricsDto(accessMetric));
  }

  async create(
    accessMetric: CreateAccessMetricsDto,
    options?: CreationOptions,
  ): Promise<AccessMetricsDto> {
    const createdAccessMetrics = await this.accessMetricsRepository.create(
      accessMetric.toDomain(),
      {
        logging: options?.logging,
      },
    );

    return new AccessMetricsDto(createdAccessMetrics);
  }
}

export default AccessMetricsService;
