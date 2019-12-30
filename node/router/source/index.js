const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.use('*', (req, res, next) => {
    console.log(`source router----------------------`);
    next();
})

router.get('/*', (req, res) => {
    const file = path.resolve(__dirname, `../../static/${req.url}`);
    fs.stat(file, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 Error if file not found
                return res.sendStatus(404);
            }
            res.end(err);
        }
        const range = req.headers.range;
        if (!range) {
            // 416 Wrong range
            return res.sendStatus(416);
        }
        const positions = range.replace(/bytes=/, "").split("-");
        const start = parseInt(positions[0], 10);
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        const chunksize = (end - start) + 1;

        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });

        const stream = fs.createReadStream(file, { start: start, end: end })
            .on("open", function () {
                stream.pipe(res);
            }).on("error", function (err) {
                res.end(err);
            });
    });
})

router.get('/audio', (req, res) => {
    console.log('get audio:', req.query);
    res.send('audio');
})

module.exports = router;
