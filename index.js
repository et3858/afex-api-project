require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();
const myRoutes = require("./src/routes");


const enablehttps = process.env.HTTPS || "";
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", myRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

if (/^true$/.test(enablehttps)) {
    const key = fs.readFileSync(process.env.SSL_KEY);
    const cert = fs.readFileSync(process.env.SSL_CERT);
    const sslCredentials = { key, cert };

    const httpServer = https.createServer(sslCredentials, app);
    httpServer.listen(8443);
}
