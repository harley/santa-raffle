import React, { Component } from 'react';
import '../styles/Issue.css';
import Raffles from './Raffles';
import Linkify from 'react-linkify';
import Like from './Like';
import pluralize from 'pluralize'

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
      <Like issue={issue} />
        <div className="issue-title">
          {issue.index}. {issue.title}
          <Raffles count={issue.raffle} />
        </div>
        <div className="issue-body">
          {pluralize('like', issue.likes, true)} | complexity: {issue.complexity}&nbsp;
          | requested by {this.wrapPerson(issue.requestor)}&nbsp;
          | approved by {this.wrapPerson(issue.approver)}&nbsp;
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
      </div>
    )
  }
}

export default Issue;