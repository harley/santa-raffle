import React, { Component } from 'react';
import logo from './images/santa.png';
import './App.css';
import Issue from './components/Issue';
import sheet from './lib/sheet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: []
    }
  }

  componentDidMount() {
    this.loadRealData()
  }

  loadRealData = () => {
    window.gapi.load('client', () => {
      sheet.auth(true, this.handleAuth)
    })
  }

  loadCallback = (data, error) => {
    if (data) {
      console.log("setting data: ", data)
      const random = data.issues[Math.floor(Math.random() * data.issues.length)];

      this.setState({
        ...data,
        random
      });
    }
    else {
      this.setState({
        error: error
      })
    }
  }

  handleAuth = (authResult) => {
    console.log("authResult before: ", authResult)
    if (authResult && !authResult.error) {
      this.setState({authenticated: true});
      console.log("authResult: ", authResult)
      sheet.loadSheet(this.loadCallback)
    } else {
      this.setState({authenticated: false})
    }
  }

  googleLogin = (e) => {
    e.preventDefault();
    sheet.auth(false, this.handleAuth)
  }

  loadFakeData = () => {
    this.setState({
      issues: [
        {title: "One", comments: "Comments for One"},
        {title: "Two", comments: "Comments for Two"}
      ]
    })
  }

  renderContent() {
    const issues = this.state.issues;

    if (this.state.authenticated === false) {
      return (
        <button onClick={this.googleLogin} className="btn login">Log in with Google</button>
      )
    }

    if (issues.length) {
      return (
        <div className="issues-wrapper">
          <div className="issues">
            { this.state.issues.map((issue, i) => {
              return (
                <Issue key={ i } issue={ issue } />
              );
            }) }
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Santa Raffles</h1>
        </header>
        { this.renderContent() }
      </div>
    );
  }
}

export default App;
