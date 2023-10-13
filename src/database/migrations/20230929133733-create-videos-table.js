'use strict';

const TABLE_NAME = 'videos';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      youtube_video_id: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      youtube_channel_id: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      youtube_channel_title: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      thumbnails: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      metadata: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        // onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
