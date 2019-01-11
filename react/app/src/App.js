import React, { Component } from 'react';
import './App.scss';
import MoveAnimation from './components/MoveAnimation';


class App extends Component {
    render() {
        return (
            <div className="App">
                <MoveAnimation />
            </div>
        );
    }
}

export default App;
