const express = require('express');
const router = express.Router();
const request = require('request');
const url = require('url');

router.use('*', (req, res, next) => {
    console.log(`proxy router----------------------`);
    next();
})

router.get('/branch', (req, res) => {
    // const { pathname, query } = url.parse(req.url);
    // const options = {
    //     host: 'www.kdocs.cn',
    //     port: '80',
    //     method: 'GET',
    //     path: pathname + query,

    //     // headers: {
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //         // 'Content-Length': Buffer.byteLength(postData)
    //     // }
    // };
    // const server =  http.request(options, function(response) {
    //     response.on('data',function(chunk){
    //         // data = JSON.stringify(chunk);

    //         res.write(chunk, 'binary');
    //     }).on("end", function () {
    //         // res.writeHead(200, {'Content-Type': 'text/html'});
    //         console.log('proxied request ended');
    //         res.end();
    //     });
    // }).on('error', function(e) {
    //     console.log("Got error: " + e.message);
    // });
    // server.end();

    const _url = `https://www.kdocs.cn/containers?_t=${Date.now()}`;
    request(_url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.send(data);
            res.end();
        }
    })
})

module.exports = router;
