import React, { Component } from 'react';
import './App.scss';
// import MoveAnimation from './components/MoveAnimation';
// import DragactComponent from './components/DragactComponent';
// import ReactBeautifulDnd from './components/ReactBeautifulDnd';
// import Observer from './components/Observer';
// import Algorithm from './algorithm';
// import Test from './Test';
// import ThirdpartyDocer from './components/ThirdpartyDocer/index'
// import List from './components/List';
import Test from './components/Test'

// import './test';
import List from './components/List';
// import Demo from './components/Demo';

class App extends Component {
    state = {
        showDialog: false,
        index: 0,
    }

    componentDidMount() {
        // const $btn = document.getElementById('btn');
        // $btn.addEventListener('click', this.handleClick)

        

    }

    onClick = () => {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    handleClick = e => {
        // this.setState({
        //     index: this.state.index + 1
        // })
        // this.setState({
        //     index: this.state.index + 3
        // })
        // this.setState({
        //     index: this.state.index + 2
        // })
        // setTimeout(() => {
        //     this.setState({
        //         index: this.state.index + 1
        //     })
        // })
    }

    render() {
        // const { showDialog, name } = this.state
        // console.log(this.state.index);
        return (
            <div className="App">
                {/* <MoveAnimation /> */}
                {/* <DragactComponent /> */}
                {/* <ReactBeautifulDnd /> */}
                {/* <Observer /> */}
                {/* <Algorithm /> */}
                {/* <Test /> */}
                {/* <button onClick={this.onClick}>show ThirdpartyDocer</button> */}
                {/* {
                    showDialog &&
                    <ThirdpartyDocer />
                } */}
                <List />
                {/* <Demo /> */}
                {/* <div
                    id="btn"
                    onClick={this.handleClick}
                    className="btn"
                >change name</div>
                <button onClick={() => this.forceUpdate()}>force update</button> */}
            </div>
        );
    }
}

export default App;
