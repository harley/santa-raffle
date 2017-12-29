import React, { Component } from 'react';
import '../styles/Issue.css';
import Raffles from './Raffles';
import Linkify from 'react-linkify';
import Like from './Like';
import pluralize from 'pluralize'
import localCache from '../lib/localCache';
import WIPs from './WIPs';

class Issue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issue: props.issue
    }
  }
  displayOwner = (issue) => {
    if (issue.owner) {
      return (
        <span>
          | advisable by {this.wrapPerson(issue.owner)}
        </span>
      )
    }

    return ""
  }

  displayPeopleWithInterest = (issue) => issue.peopleWithInterest && issue.peopleWithInterest.length > 0 ?
    <span>
      {" | interested by "}
      <span className="person">{issue.peopleWithInterest.join(', ')}</span>
      {" "}
    </span> : ""

  wrapPerson = (name) => <span className="person">{name}</span>

  handleLike = (_) => {
    const { issue } = this.state;

    let cachedLikes = localCache.get('likes') || [];
    const index = cachedLikes.indexOf(issue.rowId);

    if (index > -1) {
      // already liked. nothing to do
      alert("Already liked, but thank you :)")
    } else {
      // like
      cachedLikes.push(issue.rowId)
      localCache.set('likes', cachedLikes)
      this.setState({
        issue: {
          ...issue,
          likes: issue.likes + 1,
          liked: true
        }
      })
      console.log("cachedLikes", cachedLikes)
    }
  }


  render() {
    const { issue } = this.state;

    return (
      <div className={"issue" + (issue.wips.length ? " has-wips" : "")}>
        <Like issue={issue} handleLike={this.handleLike} />
        <div className="issue-title">
          {this.props.index ? (this.props.index + ". ") : ""} {issue.title}
          <Raffles count={issue.raffle} />
        </div>
        <div className="issue-body">
          {pluralize('like', issue.likes, true)} | complexity: {issue.complexity}&nbsp;
          | requested by {this.wrapPerson(issue.requestor)}&nbsp;
          | approved by {this.wrapPerson(issue.approver)}&nbsp;
          { this.displayPeopleWithInterest(issue) }
          {
            this.displayOwner(issue)
          }
        </div>
        <Linkify>
          <div className="issue-comments">
            { issue.comments.map((line, i) => {
              return (
                <p className="issue-comment-line" key={ i }>{ line }</p>
              );
            }) }
          </div>
        </Linkify>
        <Linkify>
          <div className="issue-links">
            { issue.links.map((line, i) => {
              return (
                <p className="issue-link-line" key={ i }>{ line }</p>
              );
            }) }
          </div>
        </Linkify>
        <WIPs wips={ issue.wips }/>
      </div>
    )
  }
}

export default Issue;
