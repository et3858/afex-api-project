'use strict';

const TABLE_NAME = "videos";

const METADATA = {
  "kind": "youtube#video",
  "etag": "__XX5An3hHABqIbg3CUCEFNpCyg",
  "id": "rgIyADYS9ys",
  "snippet": {
    "publishedAt": "2021-04-21T13:00:33Z",
    "channelId": "UCyqzvMN8newXIxyYIkFzPvA",
    "title": "How I found the Popular videos on YouTube with Node.JS",
    "description": "The YouTube Data api has a public endpoint which will allow us to search for public YouTube videos using an API key.   API keys simply identify our application to Google, without the need for authorization.   Using the videos.list method in the YouTube API we can search for the most popular video by region\n\n#youtubeapi #youtubedataapi #apikey #googleapi #googlecloudconsole\n\n🔥 Support my work on Patreon:  https://www.patreon.com/daimto\n\n0:39  YouTube API Video list method \n1:15 Create new project on Google Cloud Console\n1:25 Create new API Key\n1:49 Enable the YouTube Data api in Google cloud console.\n2:20 Install the googleapis package for the Google APIs Node Js client library\nLinks\n2:35 Create a YouTube service object and configure it with an api key.\n3:39 Use the YouTube SErvice object to make a call to videos.list\n5:15 Handle the output returned from the YouTube api.\n7:15 Examine the response returned by the YouTube Data API videos.list method.\n\n🔗 YouTube API Videos List: https://developers.google.com/youtube/v3/docs/videos/list\n🔗 Stack overflow YouTube Data API tag: https://stackoverflow.com/questions/tagged/youtube-data-api\n🔗 Stack overflow YouTube Data API tag: https://stackoverflow.com/questions/tagged/google-apis-nodejs-client\n🔗 YouTube API Region Code:  https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n\n\n🔥 How to find me 🔥\n\n🔗 Daimto Stack Overflow: https://stackoverflow.com/users/1841839/daimto\n📓 Website and tutorials: Daimto.com https://www.daimto.com/\n🐦 Twitter: @LindaLawtonDK\n🐙 GitHub: https://github.com/LindaLawton/\n👍 Facebook https://www.facebook.com/daimtocom",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/rgIyADYS9ys/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/rgIyADYS9ys/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/rgIyADYS9ys/hqdefault.jpg",
        "width": 480,
        "height": 360
      },
      "standard": {
        "url": "https://i.ytimg.com/vi/rgIyADYS9ys/sddefault.jpg",
        "width": 640,
        "height": 480
      },
      "maxres": {
        "url": "https://i.ytimg.com/vi/rgIyADYS9ys/maxresdefault.jpg",
        "width": 1280,
        "height": 720
      }
    },
    "channelTitle": "DAIMTO Developer Tips",
    "tags": [
      "how to create a youtube api key",
      "api key",
      "how to create an api key",
      "youtube api",
      "youtube data api",
      "youtube api tutorial",
      "nodejs",
      "youtube data api key",
      "youtube data api key free",
      "youtube data api tutorial",
      "youtube api nodejs",
      "youtube api most popular videos",
      "google-api-nodejs-client",
      "google-api-nodejs-client tutorial",
      "nodejs youtube api",
      "nodejs youtube api regioncode",
      "google api",
      "google api tutorial",
      "google oauth2",
      "node js tutorial",
      "node js youtube api",
      "YouTube"
    ],
    "categoryId": "27",
    "liveBroadcastContent": "none",
    "localized": {
      "title": "How I found the Popular videos on YouTube with Node.JS",
      "description": "The YouTube Data api has a public endpoint which will allow us to search for public YouTube videos using an API key.   API keys simply identify our application to Google, without the need for authorization.   Using the videos.list method in the YouTube API we can search for the most popular video by region\n\n#youtubeapi #youtubedataapi #apikey #googleapi #googlecloudconsole\n\n🔥 Support my work on Patreon:  https://www.patreon.com/daimto\n\n0:39  YouTube API Video list method \n1:15 Create new project on Google Cloud Console\n1:25 Create new API Key\n1:49 Enable the YouTube Data api in Google cloud console.\n2:20 Install the googleapis package for the Google APIs Node Js client library\nLinks\n2:35 Create a YouTube service object and configure it with an api key.\n3:39 Use the YouTube SErvice object to make a call to videos.list\n5:15 Handle the output returned from the YouTube api.\n7:15 Examine the response returned by the YouTube Data API videos.list method.\n\n🔗 YouTube API Videos List: https://developers.google.com/youtube/v3/docs/videos/list\n🔗 Stack overflow YouTube Data API tag: https://stackoverflow.com/questions/tagged/youtube-data-api\n🔗 Stack overflow YouTube Data API tag: https://stackoverflow.com/questions/tagged/google-apis-nodejs-client\n🔗 YouTube API Region Code:  https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n\n\n🔥 How to find me 🔥\n\n🔗 Daimto Stack Overflow: https://stackoverflow.com/users/1841839/daimto\n📓 Website and tutorials: Daimto.com https://www.daimto.com/\n🐦 Twitter: @LindaLawtonDK\n🐙 GitHub: https://github.com/LindaLawton/\n👍 Facebook https://www.facebook.com/daimtocom"
    },
    "defaultAudioLanguage": "en"
  }
};

const ITEMS = [
  {
    youtube_video_id: METADATA.id,
    title: METADATA.snippet.title,
    description: METADATA.snippet.description,
    youtube_channel_id: METADATA.snippet.channelId,
    youtube_channel_title: METADATA.snippet.channelTitle,
    thumbnails: JSON.stringify(METADATA.snippet.thumbnails),
    metadata: JSON.stringify(METADATA),
  },
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(TABLE_NAME, ITEMS);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  }
};
