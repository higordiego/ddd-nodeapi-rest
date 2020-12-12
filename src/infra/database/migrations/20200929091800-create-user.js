module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.createTable('Users', {

      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        type: Sequelize.UUID
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      verifiedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
    })

    await queryInterface.addIndex('Users', ['email']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
