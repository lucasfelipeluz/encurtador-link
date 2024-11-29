import { Model } from 'sequelize';
import AccessMetrics from 'src/domain/entities/AccessMetrics';
import strings from 'src/domain/utils/strings';
import attributes from './addons/attributes';
import options from './addons/options';
import LinkModel from './LinkModel';

class AccessMetricsModel extends Model<AccessMetrics> {
  declare id: number;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare idLink: number;
  declare idUser: string;
  declare idConsultant: string | null;

  declare links: LinkModel;
}

AccessMetricsModel.init(
  attributes.accessMetrics,
  options.generateDefaultOptions(strings.accessMetrics),
);

export default AccessMetricsModel;
