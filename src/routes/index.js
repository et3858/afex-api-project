const express = require('express');
const router = express();
const controller = require("./../controllers");


router.get('/', controller.getVideos);
router.post('/', controller.addVideoByUrl);
router.get('/:id', controller.getVideo);
router.delete('/:id', controller.removeVideo);
router.post('/:id/sync', controller.syncVideo);


module.exports = router;
