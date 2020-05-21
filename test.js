





// console.log('script start');

// setTimeout(function() {
//     console.log('timeout1');
// }, 0);

// new Promise(function(resolve, reject) {

//     console.log('promise1');

//     resolve('then1');

//     setTimeout(function() {
//         console.log('timeout2');
//     }, 0);

// })
// .then(function(data) {
//     console.log(data);
// });

// console.log('script end');
// let  time = 0;

// window.addEventListener('load', function(e) {
//     console.log('load', Date.now())
// }, true)

// window.addEventListener('unload', function(e) {
//     // e.preventDefault();
//     // time = Date.now();
//     const diffTime = Date.now() - time;
//     console.log('unload', diffTime)
//     if (diffTime <= 2) {
//         console.log('close------------------------')
//     } else {
//         this.alert('refresh------------------------')
//     }
//     // return 'unload'
// }, true)

// window.addEventListener('beforeunload', function(e) {
//     // e.preventDefault();
//     time = Date.now();
//     console.log('beforeunload', Date.now())
//     // return 'beforeunload'
// }, true)




const express = require('express')
const app = express()

// 设置跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    res.header('Content-type', 'application/json;charset=utf-8')
    next()
})

/**
 * @param req 客户端传来的请求实例
 * @param res 返回给客户端的响应实例
 */
app.get('/test1', (req, res) => {
    res.status(200)
    res.json({ msg: 'hhhhhh' })
})

app.post('/test2', (req, res) => {
    res.status(200)
    res.json({ msg: 'hhhhhh' })
})

// 配置服务端口
const server = app.listen(3000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Listen at http://%s:%s', host, port)
})





// console.log('script start');

// setTimeout(function() {
//     console.log('timeout1');
// }, 0);

// new Promise(function(resolve, reject) {

//     console.log('promise1');

//     resolve('then1');

//     setTimeout(function() {
//         console.log('timeout2');
//     }, 0);

// })
// .then(function(data) {
//     console.log(data);
// });

// console.log('script end');
// let  time = 0;

// window.addEventListener('load', function(e) {
//     console.log('load', Date.now())
// }, true)

// window.addEventListener('unload', function(e) {
//     // e.preventDefault();
//     // time = Date.now();
//     const diffTime = Date.now() - time;
//     console.log('unload', diffTime)
//     if (diffTime <= 2) {
//         console.log('close------------------------')
//     } else {
//         this.alert('refresh------------------------')
//     }
//     // return 'unload'
// }, true)

// window.addEventListener('beforeunload', function(e) {
//     // e.preventDefault();
//     time = Date.now();
//     console.log('beforeunload', Date.now())
//     // return 'beforeunload'
// }, true)


const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {
    console.log('click:', e)
})

btn.click();

console.log('script start')

function dispatch(eventType, bubbles = true, cancelable = true, details = {}) {
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventType, bubbles, cancelable, details);
    window.dispatchEvent(event);
}

window.addEventListener('haha', (e) => {
    console.log('haha:', e)
})

dispatch('haha')

Promise.resolve().then(() => {
    console.log('Promise.resolve')
})

setTimeout(() => {
    console.log('setTimeout')
}, 3000)

console.log('script end')


var div = document.createElement('div');
div.innerText = 3333;
div.style.color = 'red';
document.body.appendChild(div);
