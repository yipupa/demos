// import React, { Component } from 'react'
// // import LazyLoader from '../LazyLoader'
// import './index.scss'

// const getList = () => {
//     const list = [];
//     let i = 0;
//     while (i < 100) {
//         const item = { name: `${i}` };
//         list.push(item);
//         i++;
//     }
//     return list;
// }

// export default class index extends Component {
//     constructor(props) {
//         super(props);
//         this.wrapRef = React.createRef();
//         this.state = {
//             list: getList(),
//             name: '',
//             // name: this.props.name
//         }
//     }

//     static getDerivedStateFromProps(nextProps, prevState) {
//         debugger
//         console.log('getDerivedStateFromProps', nextProps, prevState);
//         if (nextProps.name !== prevState.name) {
//             return {
//                 name: nextProps.name
//             }
//         }
//         return null;
//     }

//     componentDidMount() {
//         // this.init();
//     }

//     // init() {
//     //     const target = this.getTargetList();
//     //     this.lazyLoader = new LazyLoader({
//     //         target,
//     //         options: {
//     //             root: this.wrapRef.current,
//     //             threshold: [0],
//     //         },
//     //         onChange: this.onChange
//     //     })
//     // }

//     getTargetList() {
//         const targetList = this.wrapRef.current.children;
//         function callback(index) {
//             this.innerText = 'loaded';
//             return index;
//         }
//         for (let index = 0; index < targetList.length; index++) {
//             const element = targetList[index];
//             element.callback = callback.bind(element, index);
//         }
//         return targetList;
//     }

//     onChange = (entries, observer) => {
//         for (let index = 0; index < entries.length; index++) {
//             const change = entries[index];
//             if (change.isIntersecting) {
//                 const index = change.target.callback();
//                 console.log('load-----------', index);
//                 observer.unobserve(change.target);
//             }
//         }
//     }

//     onClick = () => {
//         const { name } = this.state;
//         name.text = '4444444'
//         console.log('props name after change by list', this.props.name)
//         // this.setState({
//         //     name
//         // })
//     }

//     render() {
//         const { list, name } = this.state;
//         console.log('list render',name);
//         return (
//             <div className="list_wrap" ref={this.wrapRef}>
//                 {/* {
//                     list.map((item, index) => (
//                         <div className="list_item" key={index}>loading</div>
//                     ))
//                 } */}
//                 <div onClick={this.onClick} style={{height: '100px', color: 'red', fontSize: '100px'}}>change props</div>
//             </div>
//         )
//     }
// }

import React, { Component } from 'react';
import Swiper from 'swiper';
import './index.scss'
import 'swiper/css/swiper.min.css';

class index extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            const list = [];
            let i = 0;
            while (i < 5) {
                list.push(i);
                i++;
            }
            this.setState({
                list
            }, () => {
                // this.swiper.update();
                // this.swiper.loopFix();
                // this.swiper.reLoop();
                this.initSwiper();
            })
        })
    }

    componentDidUpdate() {
        // this.swiper.update();
    }

    initSwiper() {
        this.swiper = new Swiper('.swiper-container', {
            loop: true,  //循环
            // loopAdditionalSlides: 1,
            autoplay: {   //滑动后继续播放（不写官方默认暂停）
                delay: 2000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            pagination: {  //分页器
                el: '.swiper-pagination'
            },
            observer: true,
            observeParents: true,
            on: {
                // onSlideChangeEnd: (swiper) => {
                //     swiper.update();
                //     this.swiper.startAutoplay();
                //     this.swiper.reLoop();
                // }
            }
        })
    }


    render() {
        const { list } = this.state;
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        list.map(item => {
                            return (
                                <div key={item} className="swiper-slide">{item}</div>
                            )
                        })
                    }
                </div>
                {/* <!-- 如果需要分页器 --> */}
                <div className="swiper-pagination"></div>

                {/* <!-- 如果需要导航按钮 --> */}
                {/* <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div> */}

                {/* <!-- 如果需要滚动条 --> */}
                {/* <div className="swiper-scrollbar"></div> */}
            </div>
        );
    }
}

export default index;
