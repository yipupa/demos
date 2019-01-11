const $wrapper = document.getElementById('wrapper');
const $slides = Array.prototype.slice.call($wrapper.children);
const $fakeSlide = document.getElementById('fake_slide');
const {width, height} = $fakeSlide.getBoundingClientRect();
const wrapperTop = $wrapper.getBoundingClientRect().top;

let moveOnIndex,
    moveOverIndex,
    canSortMove = false,
    // startPosition,
    prevY;

const positionMgr = [];
let i = 0;
while (i < $slides.length) {
    positionMgr.push({index: i, type: 'idx'});
    i ++;
}

const debounce = (func, delay) => {
    return function() {
        window.clearTimeout(debounce.timer);
        debounce.timer = window.setTimeout(func, delay);
    }
}

const getMoveOverSlide = (len, y, temp) => {
    let idx = -1;
    for (let i = 0; i < len; i ++) {
        const st = temp + i * 60;
        const sb = temp + (i + 1) * 60;
        if (y <= sb && y >= st) {
            idx = i;
            flag = true;
            break;
        }
        if (i === 0 && y < st) {
            idx = 0;
            flag = true;
            break;
        }
    }
    if (!flag) {
        idx = len - 1;
    }
    return idx;
}

const setSlideStyle = (onIdx, overIdx, isMoveDown) => {
    if (onIdx === overIdx) {
        return;
    }
    // const $slide = $slides[overIdx];
    // const positionInfo = positionMgr[overIdx];
    // if (isMoveDown) {
    //     positionMgr[overIdx].index = onIdx;
    //     positionMgr[onIdx].index = overIdx;
    // } else {
        
    // }
    // if (isMoveDown) {
    //     $slide.style.transform = `translate3d(0,${-60}px,0)`;
    // } else {
    //     $slide.style.transform = `translate3d(0,${60}px,0)`;
    // }

    positionMgr[overIdx].index = onIdx;
    positionMgr[onIdx].index = overIdx;

    console.log(positionMgr)
}

const renderTransform = () => {
    positionMgr.forEach((pos, idx) => {
        if (pos.index !== idx) {
           const temp =  pos.index - idx;
           $slides[pos.index].style.transform = `translate3d(0,${- temp * 60}px,0)`;
        }
    });
}

$slides.forEach(slide => {
    const index = slide.getAttribute('data-index') - 1 ;
    slide.addEventListener('mousedown', (e) => {
        const {clientY} =  e || window.event;
        prevY = clientY;
        moveOnIndex = index;
        canSortMove = true;
        $fakeSlide.appendChild(slide.cloneNode(true));
        positionMgr[moveOnIndex].type = 'ph';
    });
});

document.addEventListener('mousemove', (e) => {
    if (canSortMove) {
        const {clientX, clientY} = e || event;
        
        const moveOverIndex = getMoveOverSlide($slides.length, clientY, wrapperTop);
        const isMoveDown = prevY < clientY;

        setSlideStyle(moveOnIndex, moveOverIndex, isMoveDown);

        renderTransform();

        prevY = clientY;
        
        $slides[moveOnIndex].classList.add('move-over');
        $fakeSlide.style.left = `${clientX - width / 2}px`;
        $fakeSlide.style.top = `${clientY - height / 2}px`;
        $fakeSlide.classList.add('visible');
    }
})

document.addEventListener('mouseup', (e) => {
    canSortMove = false;

    $slides.forEach(slide => slide.classList.remove('move-over'));
    // $slides.forEach(slide => slide.style.transform = 'translate3d(0,0,0)');
    positionMgr.forEach(item => item.type = 'idx');

    $fakeSlide.classList.remove('visible');
    $fakeSlide.innerHTML = '';
    $fakeSlide.style.left = 0;
    $fakeSlide.style.top = 0;
})

