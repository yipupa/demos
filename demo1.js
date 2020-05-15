function fn() {
    console.log('start') //1

    setTimeout(() => {
        console.log('setTimeout')//6
    }, 100)

    new Promise(async (resolve) => {
        console.log('new promise')//2
        await setTimeout(resolve)
        console.log('new promise end')//4
    }).then(() => {
        console.log('reolve promise')//5
    })

    console.log('end')//3
}