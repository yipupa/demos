import React, { PureComponent } from 'react'

export default class index extends PureComponent {
    constructor(props) {
        super(props);
        this.$App = React.createRef();
    }

    componentDidMount() {
        this.initObserver();
    }

    initObserver() {
        this.observer = new IntersectionObserver(this.observerCallback);
        this.observer.observe(this.$App.current);
    }

    observerCallback() {
        // console.log(time, rootBounds, boundingClientRect, intersectionRect, intersectionRatio, target, isIntersecting);
        // boundingClientRect: DOMRectReadOnly { x: 0, y: 0, width: 1080, height: 21, top: 0, … }
        // intersectionRatio: 1
        // intersectionRect: DOMRectReadOnly { x: 0, y: 0, width: 1080, height: 21, top: 0, … }
        // isIntersecting: true
        // rootBounds: DOMRectReadOnly { x: 0, y: 0, width: 1080, height: 972, top: 0, … }
        // target: div
        // time: 185.61499996576458
        console.log(arguments);
    }

    render() {
        return (
            <div ref={this.$App}>
                IntersectionObserver
            </div>
        )
    }
}
