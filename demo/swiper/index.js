const slides = document.getElementById('slides');
const { width }  = slides.children[0].getBoundingClientRect();

let index = 0;
function loopPlay() {
    setInterval(() => {
        console.log(index)
        slides.style.transform = `translateX(-${index * width}px)`
        index ++;
        if (index === slides.children.length) {
            index = 0;
        }
    }, 2000);
}

// loopPlay()