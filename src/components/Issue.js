import React, { Component } from 'react';

class Issue extends Component {
  render() {
    return (
      <div>{this.props.issue.title}</div>
    )
  }
}

export default Issue;