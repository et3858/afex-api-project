module.exports = function (sequelize, DataTypes) {
    const VideoTranslation = sequelize.define('VideoTranslation', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        video_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        language: {
            allowNull: false,
            type: DataTypes.STRING(10),
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        description: {
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
        },
    }, {
        sequelize,
        tableName: 'video_translations',
        timestamps: true,
        // paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        defaultScope: {
            attributes: {
                exclude: [
                    'deleted_at',
                    'created_at',
                    'updated_at',
                ],
            },
        },
    });

    VideoTranslation.associate = (models) => {
        VideoTranslation.belongsTo(models.Video, {
            foreignKey: 'video_id',
        });
    };

    return VideoTranslation;
};
