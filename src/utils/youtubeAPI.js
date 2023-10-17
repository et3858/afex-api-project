require('dotenv').config();
const fetch = require('node-fetch');
const API_URL = "https://www.googleapis.com/youtube/v3";


/**
 * Query for the youtube video by id
 * @param {string} id
 * @returns
 */
async function getYoutubeVideo(id) {
    const API_KEY = process.env.YOUTUBE_API_KEY || "YOUR_API_KEY";
    const PARTS = ["snippet", "contentDetails", "localizations"];
    const URL = `${API_URL}/videos?id=${id}&key=${API_KEY}&part=${PARTS.join(",")}`;

    try {
        const res = await fetch(URL);
        const data = await res.json();

        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}


module.exports = { getYoutubeVideo };
