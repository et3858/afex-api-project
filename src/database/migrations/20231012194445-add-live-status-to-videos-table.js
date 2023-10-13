'use strict';
const TABLE_NAME = "videos";
const ATTR_NAME = "live_status";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE_NAME, ATTR_NAME, {
      after: 'duration',
      allowNull: false,
      defaultValue: 'none',
      type: Sequelize.ENUM('none', 'live', 'upcoming'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_NAME, ATTR_NAME);
  }
};