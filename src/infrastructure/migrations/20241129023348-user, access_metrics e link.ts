import { AddForeignKeyConstraintOptions, DataTypes, QueryInterface, Sequelize } from 'sequelize';
import strings from 'src/domain/utils/strings';
import config from '../config/config';
import { executionMode } from '../config/dbConnection';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable(strings.users, {
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
    });

    await queryInterface.createTable(strings.links, {
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
    });

    await queryInterface.createTable(strings.accessMetrics, {
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
    });

    await queryInterface.addIndex(strings.links, [strings.idUser]);

    await queryInterface.addIndex(strings.accessMetrics, [strings.idUser]);
    await queryInterface.addIndex(strings.accessMetrics, [strings.idLink]);
    await queryInterface.addIndex(strings.accessMetrics, [strings.idConsultant]);

    // Fk links_idUser
    await queryInterface.addConstraint(strings.links, {
      fields: [strings.idUser],
      type: 'foreign key',
      name: 'FK_links_idUser',
      references: {
        table: strings.users,
        field: strings.id,
      },
    } as AddForeignKeyConstraintOptions);

    // FK accessMetrics_idUser
    await queryInterface.addConstraint(strings.accessMetrics, {
      fields: [strings.idUser],
      type: 'foreign key',
      name: 'FK_accessMetrics_idUser',
      references: {
        table: strings.users,
        field: strings.id,
      },
    } as AddForeignKeyConstraintOptions);

    // FK accessMetrics_idLink
    await queryInterface.addConstraint(strings.accessMetrics, {
      fields: [strings.idLink],
      type: 'foreign key',
      name: 'FK_accessMetrics_idLink',
      references: {
        table: strings.links,
        field: strings.id,
      },
    } as AddForeignKeyConstraintOptions);

    // FK accessMetrics_idConsultant
    await queryInterface.addConstraint(strings.accessMetrics, {
      fields: [strings.idConsultant],
      type: 'foreign key',
      name: 'FK_accessMetrics_idConsultant',
      references: {
        table: strings.users,
        field: strings.id,
      },
    } as AddForeignKeyConstraintOptions);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable(strings.accessMetrics);
    await queryInterface.dropTable(strings.links);
    await queryInterface.dropTable(strings.users);
  },
};
