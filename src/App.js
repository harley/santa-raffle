import React, { Component } from 'react';
import logo from './images/santa.png';
import './App.css';
import Issue from './components/Issue';
import sheet from './lib/sheet';
import localCache from './lib/localCache';
import GitHubForkRibbon from 'react-github-fork-ribbon';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      sortOrder: "-likes"
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

  setSortOrder = (sortOrder) => {
    this.setState({sortOrder})
  }

  sorted = (issues, sortOrder) => {
    if (sortOrder === "-likes") {
      return issues.sort((a, b) => (b.likes - a.likes))
    }

    if (sortOrder === "complexity") {
      return issues.sort((a, b) => (a.complexity - b.complexity))
    }

    if (sortOrder === "-complexity") {
      return issues.sort((a, b) => (b.complexity - a.complexity))
    }

    return issues.sort((a, b) => (a.rowId - b.rowId))
  }

  renderContent() {
    const { issues, sortOrder } = this.state;

    const sortOptions = [
      {title: "Most Liked First", order: "-likes"},
      {title: "Easiest First", order: "complexity"},
      {title: "Hardest First", order: "-complexity"},
      {title: "Original", order: "rowId"}
    ]

    if (this.state.authenticated === false) {
      return (
        <button onClick={this.googleLogin} className="btn login">Google Login to Like</button>
      )
    }

    if (issues.length) {
      return (
        <div className="issues-wrapper">
          <div className="random-issue">
            <h2 className="title">Feeling Lucky?</h2>
            <Issue issue={this.state.random} />
          </div>
          <div className="sort-menu">
            { sortOptions.map((sort, i) => {
              return (
                <a className={"btn sort" + (sortOrder === sort.order ? ' active' : '')} onClick={(_) => this.setSortOrder(sort.order)} key={ sort.order }>{ sort.title }</a>
              )
            })}
          </div>
          <div className="issues">
            { this.sorted(issues, this.state.sortOrder).map((issue, i) => <Issue key={ issue.rowId } issue={ issue } index={ i+1 }/>) }
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

        <GitHubForkRibbon position="right"
                          href="//github.com/harley/santa-raffle"
                          target="_blank" >
          Fork me on GitHub 
        </GitHubForkRibbon> 
      </div>
    );
  }
}

export default App;
