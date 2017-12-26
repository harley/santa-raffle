import React, { Component } from 'react';
import logo from './images/santa.png';
import './App.css';
import Issue from './components/Issue';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({
      issues: [
        {title: "One", comments: "Comments for One"},
        {title: "Two", comments: "Comments for Two"}
      ]
    })
  }
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
        <div className="issues">
          { this.state.issues.map((issue, i) => {
            return (
              <Issue key={ i } issue={ issue } />
            );
          }) }
        </div>
      </div>
    );
  }
}

export default App;
