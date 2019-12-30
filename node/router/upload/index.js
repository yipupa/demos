const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '../../static/files/'));
        },
        filename: function (req, file, cb) {
            //file.originalname上传文件的原始文件名
            // const changedName = (new Date().getTime()) + '-' + file.originalname;
            cb(null, file.originalname);
        }
    })
});

router.use('*', (req, res, next) => {
    console.log(`upload router----------------------`);
    next();
})


// app.use(multer({ dest: './files/' }).any());
router.use(upload.any());


router.post('/file', upload.array('file', 100), (req, res) => {
    console.log(req.files)
    // const newName = req.files[0].path + path.parse(req.files[0].originalname).ext;

    // //rename('旧文件名，新文件， 回调 ')
    // fs.rename(req.files[0].path, newName, function (err) {
    //     if (err) {
    //         res.send('上传失败');
    //     } else {
    //         res.send('上传成功');
    //     }
    //     res.end();
    // })
    res.send('上传成功');
    res.end();
})

router.post('/video', (req, res) => {
    console.log(req.files)
    // const newName = req.files[0].path + path.parse(req.files[0].originalname).ext;

    // //rename('旧文件名，新文件， 回调 ')
    // fs.rename(req.files[0].path, newName, function (err) {
    //     if (err) {
    //         res.send('上传失败');
    //     } else {
    //         res.send('上传成功');
    //     }
    //     res.end();
    // })
    res.send('上传成功');
    res.end();
})

router.post('/audio', (req, res) => {
    console.log(req.files)
    // const newName = req.files[0].path + path.parse(req.files[0].originalname).ext;

    // //rename('旧文件名，新文件， 回调 ')
    // fs.rename(req.files[0].path, newName, function (err) {
    //     if (err) {
    //         res.send('上传失败');
    //     } else {
    //         res.send('上传成功');
    //     }
    //     res.end();
    // })
    res.send('上传成功');
    res.end();
})

module.exports = router;
