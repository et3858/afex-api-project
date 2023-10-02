/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
    const Video = sequelize.define('Video', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        youtube_video_id: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        youtube_channel_id: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        youtube_channel_title: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        thumbnails: {
            allowNull: false,
            type: DataTypes.TEXT,
            get(key) {
                return JSON.parse(this.getDataValue(key));
            },
        },
        metadata: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        created_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
        }
    }, {
        sequelize,
        tableName: 'videos',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        defaultScope: {
            attributes: {
                exclude: ['metadata', 'deleted_at'],
            },
        },
    });

    return Video;
};
