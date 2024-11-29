import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';
dotenv.config();

const createDatabase = async () => {
  const dbUser = process.env.DB_USERNAME as string;
  const dbPassword = process.env.DB_PASSWORD as string;
  const dbName = process.env.DB_DATABASE as string;
  const dbHost = process.env.DB_HOST as string;

  // Conecte-se ao banco sem especificar o banco de dados (use padrão do SGBD)
  const sequelize = new Sequelize('', dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql' as Dialect,
  });

  try {
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
    );
    console.log(`Database ${dbName} created or already exists.`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
};

createDatabase();
