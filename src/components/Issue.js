import React, { Component } from 'react';
import '../styles/Issue.css';
class Issue extends Component {
  render() {
    const { issue } = this.props;

    return (
      <div>
        <div class="issue-title">
          {issue.index}. {issue.title} (raffle: {issue.raffle})
        </div>
        <div class="issue-body">
          complexity: {issue.complexity} | requested by {issue.requestor} | approved by {issue.approver}
        </div> 
        <div class="issue-comments">
          {issue.comments}
        </div>
      </div>
    )
  }
}

export default Issue;