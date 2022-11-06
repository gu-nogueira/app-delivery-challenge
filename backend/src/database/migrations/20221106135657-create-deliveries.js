'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      client_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      starting_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destiny_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('deliveries');
  },
};
