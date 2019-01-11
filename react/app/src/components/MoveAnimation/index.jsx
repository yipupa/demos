import React, { PureComponent } from 'react';
import './index.scss';

export default class MoveAnimation extends PureComponent {
    constructor() {
        super();
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        this.handleSetList();
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleSetList() {
        let i = 1;
        const list = [];
        while (i < 20) {
            list.push({ index: i });
            i++;
        }
        this.setState({
            list
        });
    }

    handleMouseDown(e, index) {
        const $slide = this.refs[`slide_${index}`];
        const $moveCtn = this.refs.move_container;
        const {clientX, clientY} = e || window.event;
        const {left, top} = $slide.getBoundingClientRect();
        
        $moveCtn.appendChild($slide.cloneNode(true));
        $moveCtn.style.left = `${left}px`;
        $moveCtn.style.top = `${top}px`;
        this.canMoveSlide = true;
        this.moveOnIndex = index;
        this.relaX = clientX - left;
        this.relaY = clientY - top;
    }

    clientY = -1
    moveOverIndex = -1

    handleMouseMove = (e) => {
        if (!this.canMoveSlide) return;
        const $moveCtn = this.refs.move_container;
        // const {top} = this.refs.slide_container.getBoundingClientRect();
        // const $slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
        const $slide = this.refs[`slide_${this.moveOnIndex}`];
        const {clientX, clientY} = e || window.event;
        const moveOverIndex = this.handleGetMoveOverSlide(clientY);
        // console.log(moveOverIndex);
        const isMoveDown = clientY > this.clientY;
        $moveCtn.style.left = `${clientX - this.relaX}px`;
        $moveCtn.style.top = `${clientY - this.relaY}px`;
        $slide.classList.add('move-on');
        $moveCtn.classList.add('visible');
        if (moveOverIndex !== this.moveOverIndex && moveOverIndex !== -1) {
            this.handleMoveSlide(moveOverIndex - 1, isMoveDown);
        }
        this.moveOverIndex = moveOverIndex;
        this.clientY = clientY;
    }

    handleMoveSlide(to, isMoveDown) {
        if (to === this.moveOnIndex) return;
        const $toSlide = this.refs[`slide_${to}`];
        // const $slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
        let transRange = +$toSlide.style.transform.replace('translate3d(0px, ', '').replace('px, 0px)', '');
        if (isMoveDown) {
            transRange -= 80;
        } else {
            transRange += 80;
        }
        
        transRange = transRange > 80 ? 80 : transRange < -80 ? -80 : transRange;
        // console.log(to, transRange, isMoveDown)
        $toSlide.style.transform = `translate3d(0, ${transRange}px, 0)`;
    }

    handleSwipeSlide(from, to) {
        const {list} = this.state;
        const fItem = list.splice(from, 1, list[to])[0];
        list.splice(to, 1, fItem);

        this.setState({
            list: [...list]
        });
    }

    handleGetMoveOverSlide = (y) => {
        let idx = -1;
        // let flag = false;
        const $slides = Array.prototype.slice.call(this.refs.slide_container.children);

        $slides.forEach(slide => {
            const {top, bottom} = slide.getBoundingClientRect();
            if (y > top && y < bottom) {
                idx = +slide.getAttribute('dataindex');
                // flag = true;
            }
        })

        return idx;
    }

    handleMouseUp = () => {
        const $slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
        const $moveCtn = this.refs.move_container;
        $moveCtn.classList.remove('visible');
        $slides.forEach(slide => slide.classList.remove('move-on'));
        $slides.forEach(slide => slide.style.transform = `translate3d(0, 0, 0)`);

        // this.handleSwipeSlide(this.moveOnIndex, this.moveOverIndex);

        this.canMoveSlide = false;
        this.moveOnIndex = -1;
        this.moveOverIndex = -1;
        this.refs.move_container.innerHTML = '';
    }

    render() {
        let { list } = this.state;
        return (
            <div className="animation_wrapper">
                <div ref="move_container" className="move_container"></div>
                <div ref="slide_container" className="slide_container">
                    {
                        list.map((item, index) => (
                            <p 
                                dataindex={item.index}
                                className="slide"
                                key={index}
                                ref={`slide_${index}`}
                                onMouseDown={(e) => this.handleMouseDown(e, index)}
                            >
                                {item.index}
                            </p>
                        ))
                    }
                </div>
            </div>
        )
    }
}
