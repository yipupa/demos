





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
let  time = 0;

window.addEventListener('load', function(e) {
    console.log('load', Date.now())
}, true)

window.addEventListener('unload', function(e) {
    // e.preventDefault();
    // time = Date.now();
    const diffTime = Date.now() - time;
    console.log('unload', diffTime)
    if (diffTime <= 2) {
        console.log('close------------------------')
    } else {
        this.alert('refresh------------------------')
    }
    // return 'unload'
}, true)

window.addEventListener('beforeunload', function(e) {
    // e.preventDefault();
    time = Date.now();
    console.log('beforeunload', Date.now())
    // return 'beforeunload'
}, true)