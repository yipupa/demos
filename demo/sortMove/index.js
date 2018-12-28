const $wrapper = document.getElementById('wrapper');
const $slides = Array.prototype.slice.call($wrapper.children);
const $fakeSlide = document.getElementById('fake_slide');
const {width, height} = $fakeSlide.getBoundingClientRect();

let moveOnIndex,
    moveOverIndex,
    canSortMove = false,
    startPosition;

$slides.forEach((slide, index) => {
    slide.addEventListener('mousedown', (e) => {
        const {clientX, ClientY} =  e || window.event;
        moveOnIndex = index;
        canSortMove = true;
        startPosition = {clientX, ClientY};
        // const $fakeSlide = document.getElementById('wrapper').children[moveOnIndex].cloneNode(true);
        $fakeSlide.appendChild(slide.cloneNode(true));
    });
});

document.addEventListener('mousemove', (e) => {
    if (canSortMove) {
        const {clientX, clientY} = e || event;

        const moveOverSlide = getMoveOverSlide($slides, clientY);
        
        $slides[moveOnIndex].classList.add('move-over');
        $fakeSlide.style.left = `${clientX - width / 2}px`;
        $fakeSlide.style.top = `${clientY - height / 2}px`;
        $fakeSlide.classList.add('visible');
    }
})

document.addEventListener('mouseup', (e) => {
    canSortMove = false;

    $slides.forEach(slide => slide.classList.remove('move-over'));

    $fakeSlide.classList.remove('visible');
    $fakeSlide.innerHTML = '';
    $fakeSlide.style.left = 0;
    $fakeSlide.style.top = 0;
})

function getMoveOverSlide(list, y) {
    const {top} = $wrapper.getBoundingClientRect();
    for (let i = 0; i < list.length; i ++) {
        const st = top + i * 60;
        const sb = top + (i + 1) * 60;
    }
}