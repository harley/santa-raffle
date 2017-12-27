import React, { Component } from 'react';
import '../styles/Issue.css';
import Raffles from './Raffles';

class Issue extends Component {
  render() {
    const { issue } = this.props;

    return (
      <div className="issue">
        <div className="issue-title">
          {issue.index}. {issue.title}
          <Raffles count={issue.raffle} />
        </div>
        <div className="issue-body">
          complexity: {issue.complexity} | requested by {issue.requestor} | approved by {issue.approver}
        </div> 
        <div className="issue-comments">
          {issue.comments}
        </div>
      </div>
    )
  }
}

export default Issue;