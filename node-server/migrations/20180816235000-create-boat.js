'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('boat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.DECIMAL
      },
      work_description: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      arrival_date: {
        type: Sequelize.DATE
      },
      delivery_date: {
        type: Sequelize.DATE
      }
    });
  }, 
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('boat');
  }
};