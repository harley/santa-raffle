import React, { Component } from 'react';
import logo from './images/santa.png';
import './App.css';
import Issue from './components/Issue';
import sheet from './lib/sheet';
import localCache from './lib/localCache';

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
      let cachedLikes = localCache.get('likes') || [];
      // console.log("cachedLikes", cachedLikes)

      const issues = data.issues.map((issue, i) => {
        const liked = cachedLikes.indexOf(issue.rowId) === -1 ? false : true

        return {
          ...issue, liked
        }
      })

      // console.log("new issues: ", issues);

      const random = issues[Math.floor(Math.random() * issues.length)];

      data.issues = issues

      this.setState({
        ...data,
        random
      })
    }
    else {
      this.setState({
        error: error
      })
    }
  }

  handleAuth = (authResult) => {
    // console.log("handleAuth", authResult)
    if (authResult && !authResult.error) {
      this.setState({authenticated: true});
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
        {title: "One", comments: "Comments for One", raffle: "1", requestor: "harley", approver: "nguyen"},
        {title: "Two", comments: "Comments for Two", raffle: "2", requestor: "dave", approver: "hieu"}
      ]
    })
  }

  renderContent() {
    const issues = this.state.issues;

    if (this.state.authenticated === false) {
      return (
        <button onClick={this.googleLogin} className="btn login">Google Login to Like</button>
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
          <img alt="" className="christmas-raffle" src={ require("./images/christmas-raffle.png") } />
        </header>
        { this.renderContent() }
      </div>
    );
  }
}

export default App;
