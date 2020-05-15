import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Test3 extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    msg: 1111111
  }

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <button onClick={this.handleClick}>asdasdsad</button>
    )
  }
}

class Test2 extends Component {
  state = {
    msg: 1111111
  }

  handleClick = () => {
    console.log(this)
  }

  render() {
    return (
      <Test3 onClick={this.handleClick} />
    )
  }
}

function Test1() {
  return (
    <Test2 />
  )
}

function App() {
  return (
    <div className="App">
      aaasdasdas
      <Test1 />
    </div>
  );
}

export default App;
