import React, { Component } from 'react';

class WIPs extends Component {
  linkJira = (wip) => {
    return "https://tinyhr.atlassian.net/browse/" + wip
  }
  render() {
    const { wips } = this.props;
    return (
       <div className="wips">
        { wips.map((wip) => <a className="btn jira" key={wip} href={this.linkJira(wip)} target="_blank">{ wip }</a>) }
      </div>
    );
  }
}

export default WIPs;

