import { UpdateOptions } from 'sequelize';
import AccessMetricsDto from '../dtos/entities/AccessMetricsDto';
import CreateAccessMetricsDto from '../dtos/helpers/CreateAccessMetricsDto';
import { CreationOptions, DeletionOptions, SearchOptions } from '../utils/options';
import UpdateAccessMetricsDto from '../dtos/helpers/UpdateAccessMetricsDto';

interface IAccessMetricsService {
  getAll(options?: SearchOptions<AccessMetricsDto>): Promise<AccessMetricsDto[]>;
  create(
    accessMetric: CreateAccessMetricsDto,
    options?: CreationOptions,
  ): Promise<AccessMetricsDto>;
}

export default IAccessMetricsService;
