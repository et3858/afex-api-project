const express = require('express');
const app = express();
const { Video } = require("./models");
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    const videos = await Video.findAll();

    res.status(200).json({ data: videos });
});

app.post('/', async (req, res) => {
    res.status(201).json({
        body: req.body,
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
