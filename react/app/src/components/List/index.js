import React, { Component } from 'react'
import LazyLoader from '../LazyLoader'
import './index.scss'

const getList = () => {
    const list = [];
    let i = 0;
    while (i < 100) {
        const item = { name: `${i}` };
        list.push(item);
        i++;
    }
    return list;
}

export default class index extends Component {
    constructor(props) {
        super(props);
        this.wrapRef = React.createRef();
        this.state = {
            list: getList()
        }
    }

    componentDidMount() {
        this.init();
    }

    init() {
        this.lazyLoader = new LazyLoader({
            target: this.wrapRef.current.children[0],
            root: this.wrapRef.current,
            threshold: [0, 0.5, 1]
        })
    }

    render() {
        const { list } = this.state;
        return (
            <div className="list_wrap" ref={this.wrapRef}>
                {
                    list.map((item, index) => (
                        <div className="list_item" key={index}>{item.name}</div>
                    ))
                }
            </div>
        )
    }
}
