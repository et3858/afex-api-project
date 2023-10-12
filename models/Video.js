/**
 * @param {string} rawDuration [Pattern: P(xD)?(T(xH)?(xM)?(xS)?)? Example: PT1H23M45S -> 1:23:45]
 */
function decodeDuration(rawDuration) {
    const sanitizedDuration = rawDuration.replace(/(P|T)/g, "");

    const dict = {
        'D': '00',
        'H': '00',
        'M': '00',
        'S': '00',
    };

    completeDict(sanitizedDuration, dict);

    let duration = Object.values(dict).join(":").replace(/^(0(0?:)*)*/g, "");

    // Concatenate with zeroes if the duration of a video is less than one minute
    if (duration.length === 1) {
        duration = "0:0" + duration;
    } else if (duration.length === 2) {
        duration = "0:" + duration;
    }

    return duration;
}


function completeDict(sanitizedDuration, dict) {
    let timeFraction = '';

    for (const iterator of sanitizedDuration) {
        if (/\d/.test(iterator)) {
            timeFraction += iterator;
            continue;
        }

        if (timeFraction.length === 1) {
            timeFraction = "0" + timeFraction;
        }

        dict[iterator.toUpperCase()] = timeFraction;
        timeFraction = '';
    }
}


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
        duration: {
            allowNull: false,
            defaultValue: "",
            type: DataTypes.STRING(20),
        },
        live_status: {
            allowNull: false,
            defaultValue: "none",
            type: DataTypes.ENUM,
            values: ['none', 'live', 'upcoming'],
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

    Video.beforeCreate(video => {
        const { duration = "" } = video;
        video.duration = decodeDuration(duration);
    });

    return Video;
};
