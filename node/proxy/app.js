const express = require('express');
const bodyParser = require('body-parser');
// const multipart = require('connect-multiparty');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const http = require('http');
const url = require('url');
const request = require('request')

// const multipartMiddleware = multipart();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '2100000kb' }));
app.use(bodyParser.json());


app.all('*', (req, res, next) => {
    // 设置是否运行客户端设置 withCredentials
    // 即在不同域名下发出的请求也可以携带 cookie
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS'); // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.use('/proxy', (req, res) => {
    const { pathname, query } = url.parse(req.url);
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

    const _url = 'https://www.kdocs.cn' + pathname + '?' + query;
    request(_url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.send(data);
            res.end();
        }
    })
})

const server = app.listen(7777, () => {
    const { address: host, port } = server.address();
    console.log(`server live at:${host}:${port}`);
})