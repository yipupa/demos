import React, { Component } from 'react'

/** css样式，可以忽略 **/
const style = document.createElement("style");
style.type = "text/css";
try{
　　style.appendChild(document.createTextNode("button{margin:20px;width:100px;height:100px;text-align:center;}"));
}catch(ex){
　　style.styleSheet.cssText = "button{margin:20px;width:100px;height:100px;text-align:center;}";
}
const head = document.getElementsByTagName("head")[0];
head.appendChild(style);
/** css样式，可以忽略 **/


class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: {
            //     num: null,//即使一开始是空的，getDerivedStateFromProps也会在render之前执行一次
            // }
            data: this.props.data
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.data !== prevState.data) {
    //         console.log('子组件通过getDerivedStateFromProps获取到了新的派生数据num：', nextProps.data);
    //         return {
    //             data: nextProps.data
    //         }
    //     }
    //     return null;
    // }

    onClick = () => {
        const { data } = this.state;
        data.num++;
        console.log('父组件中的data.num此时已经更新，但是没有触发重新渲染，可以点击强制更新按钮查看更新后的数据')
        // this.setState({
        //     data
        // })
    }

    render() {
        const { data } = this.state;
        return (
            <div >
                <button onClick={this.onClick}>在子组件中直接修改data.num，不会触发重新渲染 </button>
                <p>派生数据num:{data.num}</p>
            </div>
        )
    }
}

export default class Parent extends Component {
    state = {
        data: {
            num: 1
        }
    }

    onClick = () => {
        const { data } = this.state;
        data.num++;
        this.setState({
            data
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>在父组件中修改data.num，触发子组件中派生数据更新</button>
                <button onClick={() => this.forceUpdate()}>强制更新</button>
                <Child data={this.state.data}/>
            </div>
        )
    }
}
