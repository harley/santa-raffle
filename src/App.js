import React, { Component } from 'react';
import logo from './images/santa.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Santa Raffles</h1>
        </header>
        <p className="App-intro">
          List of Issues will show up here
        </p>
      </div>
    );
  }
}

export default App;
