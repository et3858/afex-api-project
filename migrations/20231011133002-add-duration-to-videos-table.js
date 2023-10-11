'use strict';
const TABLE_NAME = "videos";
const ATTR_NAME = "duration";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE_NAME, ATTR_NAME, {
      after: 'description',
      allowNull: false,
      defaultValue: '',
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_NAME, ATTR_NAME);
  }
};
