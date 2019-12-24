import React, { Component } from 'react';
import './App.scss';
// import MoveAnimation from './components/MoveAnimation';
// import DragactComponent from './components/DragactComponent';
// import ReactBeautifulDnd from './components/ReactBeautifulDnd';
// import Observer from './components/Observer';
// import Algorithm from './algorithm';
// import Test from './Test';
// import ThirdpartyDocer from './components/ThirdpartyDocer/index'
import List from './components/List';

class App extends Component {
    state = {
        showDialog: false
    }

    onClick = () => {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    render() {
        // const { showDialog } = this.state
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
            </div>
        );
    }
}

export default App;
