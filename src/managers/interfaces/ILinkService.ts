import { UpdateOptions } from 'sequelize';
import LinkDto from 'src/managers/dtos/entities/LinkDto';
import CreateLinkDto from 'src/managers/dtos/helpers/CreateLinkDto';
import UpdateLinkDto from 'src/managers/dtos/helpers/UpdateLinkDto';
import { CreationOptions, DeletionOptions, SearchOptions } from 'src/managers/utils/options';
import ResultAnalyticsDto from '../dtos/helpers/ResultAnalyticsDto';

interface ILinkService {
  getAll(options?: SearchOptions<LinkDto>): Promise<LinkDto[]>;
  get(options?: SearchOptions<LinkDto>): Promise<LinkDto>;
  getById(id: number, options?: SearchOptions<LinkDto>): Promise<LinkDto>;
  getAnalytics(id: number, options?: SearchOptions<LinkDto>): Promise<ResultAnalyticsDto>;
  create(link: CreateLinkDto, options?: CreationOptions): Promise<LinkDto>;
  update(newEntity: UpdateLinkDto, options?: UpdateOptions): Promise<void>;
  delete(id: number, options?: DeletionOptions): Promise<void>;
}

export default ILinkService;
