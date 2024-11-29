import { Model } from 'sequelize';
import User from 'src/domain/entities/User';
import attributes from './addons/attributes';
import options from './addons/options';

class UserModel extends Model<User> {
  declare id: string;
  declare name: string;
  declare email: string | null;
  declare password: string;

  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date | null;
  declare deletedAt: Date | null;
}

UserModel.init(attributes.user, options.user);

export default UserModel;
