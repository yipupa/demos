import React, { Component } from 'react'


function catchReactError(target, key, descriptor) {
    target.getDerivedStateFromError = (error) => {
        return { hasError: true, errorMsg: error };
    }
    target.prototype.componentDidCatch = (error, errorInfo) => {
        console.log('componentDidCatch', error, errorInfo)
        //do something as needed
    //   logErrorToMyService (error, errorInfo);
    }
}

class Child extends Component {
    state = {
        msg: 'default msg'
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                msg: 'delay msg'
            })
        }, 2000)
    }

    render() {
        const { msg } = this.state;
        return (
            <div>{msg}</div>
        )
    }
}

@catchReactError
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            showChild: true
        }
    }

    // componentDidCatch (error, errorInfo) {
    //     console.log('componentDidCatch', error, errorInfo)
    //     //do something as needed
    // //   logErrorToMyService (error, errorInfo);
    // }

    componentDidMount() {
        setTimeout(() => {
            // throw new Error('mock error')
            // this.setState({
            //     showChild: false
            // })
        }, 1000)
    }

    componentDidCatch() {
        this.setState({})
    }

    render() {
        const { hasError, errorMsg, showChild } = this.state;
        return (
            <div>
                {
                    !hasError &&
                    <p>test Component</p>
                }
                {
                    hasError &&
                    <p>errorMsg: {errorMsg}</p>
                }
                {/* {
                    showChild &&
                    <Child />
                } */}
            </div>
        )
    }
}

export default Test;
