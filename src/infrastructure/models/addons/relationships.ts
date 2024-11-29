import strings from 'src/domain/utils/strings';
import { Includeable } from 'sequelize';
import LinkModel from '../LinkModel';

const user: Includeable[] = [];

const accessMetrics: Includeable[] = [
  {
    model: LinkModel,
    as: strings.link,
  },
];

const link: Includeable[] = [];

export default {
  user,
  accessMetrics,
  link,
};
