require('dotenv').config();

const fetch = require('node-fetch');
const express = require('express');
const app = express();
const { Video } = require("./models");
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**
 * Query for the youtube video by id
 * @param {string} id
 * @returns
 */
async function getYoutubeVideo(id) {
    const API_KEY = process.env.YOUTUBE_API_KEY || "YOUR_API_KEY";
    const URL = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet`;

    try {
        const res = await fetch(URL);
        const data = await res.json();

        return data;
    } catch (error) {
        return { error };
    }
}


app.get('/', async (req, res) => {
    const videos = await Video.findAll();

    res.status(200).json({ data: videos });
});


app.post('/', async (req, res) => {
    const { url = "" } = req.body;
    const URL_REGEX = /^((http(s)?):\/\/)?((www\.)?youtube.com|youtu.be|y2u.be)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

    if (!URL_REGEX.test(url)) {
        return res.status(400).json({
            error: { msg: "Error in the format of your url" }
        });
    }

    const lastElement = url.split("/").slice(-1).join();
    const videoID = lastElement.split("=").slice(-1).join();

    if (!videoID) {
        return res.status(400).json({
            error: { msg: "The video ID must be on the url" }
        });
    }

    const existingVideo = await Video.findOne({ where: { youtube_video_id: videoID } });

    if (!existingVideo) {
        console.log("This video does not exist in the database");
    }

    const data = await getYoutubeVideo(videoID);

    res.status(201).json({
        body: req.body,
        lastElement,
        videoID,
        data,
    });
});

app.get('/:id', async (req, res) => {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
        res.status(404).json({ error: { msg: "Video not found" } });
    } else {
        res.status(200).json({ data: video });
    }
});

app.delete('/:id', async (req, res) => {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
        res.status(404).json({ error: { msg: "Video not found" } });
    } else {
        res.status(200).json({ data: video });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
