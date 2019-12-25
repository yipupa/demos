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
        const target = this.getTargetList();
        this.lazyLoader = new LazyLoader({
            target,
            options: {
                root: this.wrapRef.current,
                threshold: [0],
            },
            onChange: this.onChange
        })
    }

    getTargetList() {
        const targetList = this.wrapRef.current.children;
        function callback(index) {
            this.innerText = 'loaded';
            return index;
        }
        for (let index = 0; index < targetList.length; index++) {
            const element = targetList[index];
            element.callback = callback.bind(element, index);
        }
        return targetList;
    }

    onChange = (entries, observer) => {
        for (let index = 0; index < entries.length; index++) {
            const change = entries[index];
            if (change.isIntersecting) {
                const index = change.target.callback();
                console.log('load-----------', index);
                observer.unobserve(change.target);
            }
        }
    }

    render() {
        const { list } = this.state;
        return (
            <div className="list_wrap" ref={this.wrapRef}>
                {
                    list.map((item, index) => (
                        <div className="list_item" key={index}>loading</div>
                    ))
                }
            </div>
        )
    }
}
