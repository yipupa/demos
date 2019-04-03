import React, { Component } from 'react';
import './App.scss';
// import MoveAnimation from './components/MoveAnimation';
// import DragactComponent from './components/DragactComponent';
// import ReactBeautifulDnd from './components/ReactBeautifulDnd';
// import Observer from './components/Observer';
import Algorithm from './algorithm';

class App extends Component {
    render() {
        return (
            <div className="App">
                {/* <MoveAnimation /> */}
                {/* <DragactComponent /> */}
                {/* <ReactBeautifulDnd /> */}
                {/* <Observer /> */}
                <Algorithm />
            </div>
        );
    }
}

export default App;
