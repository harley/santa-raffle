import React, { Component } from 'react';
import '../styles/Issue.css';
import Raffles from './Raffles';

class Issue extends Component {
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
  wrapPerson = (name) => <span className="person">{name}</span>

  render() {
    const { issue } = this.props;

    return (
      <div className="issue">
        <div className="issue-title">
          {issue.index}. {issue.title}
          <Raffles count={issue.raffle} />
        </div>
        <div className="issue-body">
          complexity: {issue.complexity} &nbsp;
          | requested by {this.wrapPerson(issue.requestor)}&nbsp;
          | approved by {this.wrapPerson(issue.approver)}&nbsp;
          {
            this.displayOwner(issue)
          }
        </div> 
        <div className="issue-comments">
          {issue.comments}
        </div>
      </div>
    )
  }
}

export default Issue;