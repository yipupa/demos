import React, { Component } from 'react'

export default class Test extends Component {
    state = {
        count: 1
    }

    componentDidMount() {
        const $outer = document.querySelector('#outer');
        const $inner = document.querySelector('#inner');
        $outer.addEventListener('mousedown', this.domClick);
        // $inner.addEventListener('click', this.reactClick);
        this.innerRef.current.addEventListener('mousedown', this.reactClick);
    }

    domClick = e => {
        // e.stopPropagation()
        console.log('domClick')
    }

    reactClick = e => {
        console.log('reactClick')
    }

    innerRef = React.createRef()

    render() {
        const { count } = this.state;
        return (
            <div id="outer">
                {/* <div onClick={this.reactClick} id="inner" style={{height: '200px'}}>11111111</div> */}
                <div ref={this.innerRef} id="inner" style={{height: '200px'}}>11111111</div>
            </div>
        )
    }
}
