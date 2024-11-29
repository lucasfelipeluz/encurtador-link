import strings from 'src/domain/utils/strings';
import { Includeable } from 'sequelize';
import LinkModel from '../LinkModel';
import AccessMetricsModel from '../AccessMetricsModel';

LinkModel.hasMany(AccessMetricsModel, {
  foreignKey: 'idLink',
  as: strings.accessMetrics,
});

const user: Includeable[] = [];

const accessMetrics: Includeable[] = [
  {
    model: LinkModel,
    as: strings.link,
  },
];

const link: Includeable[] = [
  {
    model: AccessMetricsModel,
    as: strings.accessMetrics,
  },
];

export default {
  user,
  accessMetrics,
  link,
};
