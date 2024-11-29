import { Sequelize, Transaction } from 'sequelize';
import ExecutionType from 'src/domain/utils/executionType';
import config from 'src/infrastructure/config/config';

const env: ExecutionType = (process.env.NODE_ENV as ExecutionType) || 'development';

const dbConnection: Sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password!,
  {
    host: config[env].host,
    port: config[env].port,
    dialect: 'mysql',
    timezone: '-03:00',
    ssl: false,
  },
);

function initTransaction(): Promise<Transaction> {
  return dbConnection.transaction();
}

export { dbConnection, initTransaction, env as executionMode };
