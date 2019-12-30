const express = require('express');
const bodyParser = require('body-parser');
// const multipart = require('connect-multiparty');
// const multer = require('multer');
const path = require('path');
// const fs = require('fs');
// const http = require('http');
// const url = require('url');
// const request = require('request');
const proxyRouter = require('./router/proxy/index');
const uploadRouter = require('./router/upload/index');
const sourceRouter = require('./router/source/index');

// const multipartMiddleware = multipart();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '2100000kb' }));
app.use(bodyParser.json());
// app.use(express.static('static'));

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, path.resolve(__dirname, './static/files/'));
//         },
//         filename: function (req, file, cb) {
//             //file.originalname上传文件的原始文件名
//             // const changedName = (new Date().getTime()) + '-' + file.originalname;
//             cb(null, file.originalname);
//         }
//     })
// });

// // app.use(multer({ dest: './files/' }).any());
// app.use(upload.any());

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

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/proxy', proxyRouter);
app.use('/upload', uploadRouter);
app.use('/source', sourceRouter);

const server = app.listen(7777, () => {
    const { address: host, port } = server.address();
    console.log(`server live at:${host}:${port}`);
})