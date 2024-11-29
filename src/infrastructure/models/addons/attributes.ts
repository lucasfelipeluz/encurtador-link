import { DataTypes, ModelAttributes } from 'sequelize';
import UserModel from '../UserModel';
import LinkModel from '../LinkModel';
import AccessMetricsModel from '../AccessMetricsModel';
import strings from 'src/domain/utils/strings';

const user: ModelAttributes<UserModel> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(120),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

const accessMetrics: ModelAttributes<AccessMetricsModel> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  idLink: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'links',
      key: strings.id,
    },
  },
  idUser: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: strings.users,
      key: strings.id,
    },
  },
  idConsultant: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: strings.users,
      key: strings.id,
    },
  },
};

const link: ModelAttributes<LinkModel> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shortCode: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  originalUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  idUser: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: strings.users,
      key: strings.id,
    },
  },
};

export default {
  user,
  accessMetrics,
  link,
};
