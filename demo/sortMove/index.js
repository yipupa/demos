const $wrapper = document.getElementById('wrapper');
// const $slides = Array.prototype.slice.call($wrapper.children);
const $fakeSlide = document.getElementById('fake_slide');
const { width, height } = $fakeSlide.getBoundingClientRect();
const wrapperTop = $wrapper.getBoundingClientRect().top;

let moveOnIndex,
    moveOverIndex,
    canSortMove = false,
    relaX,
    relaY;
    // startPosition,
    // prevY;

const slideManager = [];
let i = 0;
while (i < 6) {
    slideManager.push({ index: i, position: i });
    i++;
}

function debounce(func, delay) {
    return function () {
        window.clearTimeout(debounce.timer);
        debounce.timer = window.setTimeout(func, delay);
    }
}

function getMoveOverSlide(len, y, temp) {
    let idx;
    if (y <= temp) {
        idx = 0;
    } else if (y >= (60 * len + temp)) {
        idx = len - 1;
    } else {
        for (let i = 0; i < len; i++) {
            const st = temp + i * 60;
            const sb = temp + (i + 1) * 60;
            if (y < sb && y > st) {
                idx = i;
                break;
            }
        }
    }
    
    return idx;
}

function renderDom() {
    slideManager.forEach(item => {
        const $slide = document.createElement('div');
        $slide.classList.add('slide');
        $slide.innerHTML = item.index;
        $slide.addEventListener('mousedown', e => {
            slideMouseDown(e, item.index);
        });
        $wrapper.appendChild($slide);
    });
}

function slideMouseDown(e, idx) {
    const { target, clientX, clientY } = e || window.event;
    const { left, top } = target.getBoundingClientRect();
    const $moveSlide = Array.prototype.slice.call($wrapper.children)[idx];
    this.$moveSlide = $moveSlide;
    moveOnIndex = idx;
    canSortMove = true;
    relaX = clientX - left;
    relaY = clientY - top;
    $fakeSlide.innerHTML = '';
    $fakeSlide.appendChild(target.cloneNode(true));
    $fakeSlide.style.left = `${left}px`;
    $fakeSlide.style.top = `${top}px`;
}

function mouseMove(e) {
    if (canSortMove) {
        const { clientX, clientY } = e || window.event;
        $fakeSlide.style.left = `${clientX - relaX}px`;
        $fakeSlide.style.top = `${clientY - relaY}px`;
        if ($fakeSlide.classList.value.indexOf('visible') === -1) {
            $fakeSlide.classList.add('visible');
        }
        if (this.$moveSlide.classList.value.indexOf('drag-on') === -1) {
            this.$moveSlide.classList.add('drag-on');
        }
        const $slides = Array.prototype.slice.call($wrapper.children);
        const moveOverIndex = getMoveOverSlide($slides.length, clientY, wrapperTop);
        setMoveOverSlide(moveOverIndex);
    }
}

function mouseUp() {
    delete moveOnIndex, relaX, relaY;
    canSortMove = false;
    $fakeSlide.innerHTML = '';
    $fakeSlide.classList.remove('visible');
    this.$moveSlide && this.$moveSlide.classList.remove('drag-on');
}

function setMoveOverSlide(idx) {
    const $moveOverSlide = idx;
}

document.addEventListener('mousemove', (e) => {
    mouseMove(e);
})

document.addEventListener('mouseup', (e) => {
    mouseUp();
})

renderDom();