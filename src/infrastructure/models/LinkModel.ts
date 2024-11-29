import { Model } from 'sequelize';
import Link from 'src/domain/entities/Link';
import attributes from './addons/attributes';
import options from './addons/options';
import strings from 'src/domain/utils/strings';

class LinkModel extends Model<Link> {
  declare id: number;

  declare shortCode: string;
  declare originalUrl: string | null;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;

  declare idUser: string | null;
}

LinkModel.init(attributes.link, options.generateDefaultOptions(strings.links));

export default LinkModel;
