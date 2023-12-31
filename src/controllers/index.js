const { Op } = require("sequelize");
const { Video, VideoTranslation } = require("./../models");
const youtubeAPI = require("./../utils/youtubeAPI");
const translation = require("./../utils/translation");


const language = "es-419";


/**
 * @param   {object[]} translations
 * @param   {string} translations.*.language
 * @param   {string} locale
 * @returns {object|null}
 */
function getVideoLocation(translations = [], locale = "en") {
    return translations.length === 1 ? translations[0] : translations.find(t => t.language === locale);
}


/**
 * @param   {/src/models/Video} v
 * @param   {string} locale
 * @returns {object}
 */
function getPlainVideo(v, locale = "en") {
    const { video_translations, ...video } = v.get({ plain: true });
    const localized = getVideoLocation(video_translations, locale);

    return { ...video, localized };
}


async function getVideos(req, res) {
    const videos = await Video.findAll({
        include: {
            association: 'video_translations',
            attributes: ['language', 'title', 'description'],
            where: {
                language: {
                    [Op.startsWith]: language.slice(0, 2),
                },
            },
            required: false,
        },
    });

    const videoList = videos.map(v => getPlainVideo(v, language));

    res.status(200).json({ data: videoList });
}


async function addVideoByUrl(req, res) {
    const { url = "" } = req.body;
    const sanitizedUrl = url.replace(/^(http(s)?:\/\/)?([\w-]+\.)*(?=\w+\.\w{2,3})/g, "");
    const URL_REGEX = /^(youtube.com|youtu.be|y2u.be)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

    if (!URL_REGEX.test(sanitizedUrl)) {
        return res.status(400).json({
            error: { msg: "The url link is incorrect" }
        });
    }

    const urlObj = new URL("https://" + sanitizedUrl);
    const videoID = urlObj.pathname === "/watch" ? urlObj.searchParams.get("v") : urlObj.pathname.split("/").slice(-1);

    if (!videoID) {
        return res.status(400).json({
            error: { msg: "The video ID must be on the url" }
        });
    }

    // Find an existing video even it's soft-deleted so that it can be restored
    const existingVideo = await Video.findOne({
        where: { youtube_video_id: videoID },
        paranoid: false,
    });

    if (existingVideo) {
        await existingVideo.restore();
        await existingVideo.reload();

        return res.status(200).json({
            data: existingVideo,
        });
    }

    const { data, error } = await youtubeAPI.getYoutubeVideo(videoID);

    if (error) {
        return res.status(400).json({
            error: {
                msg: "Something went wrong",
                data: error,
            },
        });
    }

    if (data.items.length === 0) {
        return res.status(404).json({
            error: {
                msg: "Video doesn't exist on YouTube",
            },
        });
    }

    const [videoData] = data.items;
    let videoInstance;

    try {
        videoInstance = await Video.create({
            youtube_video_id: videoData.id,
            title: videoData.snippet.title,
            description: videoData.snippet.description,
            duration: videoData.contentDetails.duration,
            live_status: videoData.snippet.liveBroadcastContent,
            youtube_channel_id: videoData.snippet.channelId,
            youtube_channel_title: videoData.snippet.channelTitle,
            thumbnails: JSON.stringify(videoData.snippet.thumbnails),
            metadata: JSON.stringify(videoData),
        });

        await videoInstance.reload();

        if (!!videoData?.localizations) {
            const translations = translation.createTranslationList(videoData.localizations, {
                video_id: videoInstance.id,
            }).sort((a, b) => a.language.localeCompare(b.language))

            await VideoTranslation.bulkCreate(translations, { validate: true });
        }
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: error.message,
            },
        });
    }

    res.status(201).json({
        data: videoInstance,
    });
}

async function getVideo(req, res) {
    const video = await Video.findByPk(req.params.id, {
        include: {
            association: 'video_translations',
            attributes: ['language', 'title', 'description'],
            where: {
                language: {
                    [Op.startsWith]: language.slice(0, 2),
                },
            },
            required: false,
        },
    });

    if (!video) {
        return res.status(404).json({ error: { msg: "Video not found" } });
    }

    res.status(200).json({ data: getPlainVideo(video, language) });
}

async function removeVideo(req, res) {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
        return res.status(404).json({ error: { msg: "Video not found" } });
    }

    await video.destroy();

    res.status(204).json({ msg: "Video removed" });
}


async function syncVideo(req, res) {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
        return res.status(404).json({ error: { msg: "Video not found" } });
    }

    const { data, error } = await youtubeAPI.getYoutubeVideo(video.youtube_video_id);

    if (error) {
        return res.status(400).json({
            error: {
                msg: "Something went wrong",
                data: error,
            },
        });
    }

    if (data.items.length === 0) {
        return res.status(404).json({
            error: {
                msg: "Video doesn't exist on YouTube",
            },
        });
    }

    const [videoData] = data.items;

    try {
        video.set({
            youtube_video_id: videoData.id,
            title: videoData.snippet.title,
            description: videoData.snippet.description,
            duration: videoData.contentDetails.duration,
            live_status: videoData.snippet.liveBroadcastContent,
            youtube_channel_id: videoData.snippet.channelId,
            youtube_channel_title: videoData.snippet.channelTitle,
            thumbnails: JSON.stringify(videoData.snippet.thumbnails),
            metadata: JSON.stringify(videoData),
        });

        await video.save();
        await video.reload();

        if (!!videoData?.localizations) {
            await VideoTranslation.destroy({ where: { video_id: video.id } });

            const translations = translation.createTranslationList(videoData.localizations, {
                video_id: video.id,
            }).sort((a, b) => a.language.localeCompare(b.language))

            await VideoTranslation.bulkCreate(translations, { validate: true });
        }
    } catch (error) {
        return res.status(500).json({
            error: {
                msg: error.message,
            },
        });
    }

    res.status(200).json({
        data: video,
    });
}

module.exports = {
    getVideos,
    addVideoByUrl,
    getVideo,
    removeVideo,
    syncVideo,
};
