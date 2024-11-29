import strings from 'src/domain/utils/strings';
import { dbConnection } from 'src/infrastructure/config/dbConnection';
import { InitOptions } from 'sequelize';
import UserModel from '../UserModel';

function generateDefaultOptions(
  tableName: string,
  isCreatedAt: boolean = true,
  isUpdatedAt: boolean = true,
): InitOptions {
  return {
    tableName,
    sequelize: dbConnection,
    timestamps: true,
    createdAt: isCreatedAt ? strings.createdAt : false,
    updatedAt: isUpdatedAt ? strings.updatedAt : false,
  };
}

const user: InitOptions<UserModel> = {
  tableName: strings.users,
  sequelize: dbConnection,
  timestamps: true,
  createdAt: strings.createdAt,
  updatedAt: strings.updatedAt,
};

export default {
  generateDefaultOptions,
  user,
};
