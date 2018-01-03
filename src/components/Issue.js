import React, { Component } from 'react';
import shortid from 'shortid';
import sheet from '../lib/sheet';
import '../styles/Issue.css';
import Raffles from './Raffles';
import Linkify from 'react-linkify';
import Like from './Like';
import pluralize from 'pluralize'
import localCache from '../lib/localCache';
import WIPs from './WIPs';
import Editable from './Editable';

class Issue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issue: props.issue,
      comments: props.issue.comments,
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

  displayPeopleWithInterest = (issue) => {
    if (issue.peopleWithInterest && issue.peopleWithInterest.length > 0) {
      return (
        <div className="people">
          | interested:&nbsp;
          {issue.peopleWithInterest.map(person => this.wrapPerson(person, shortid.generate()))}
          &nbsp;
        </div>
      )
    }

    return ""
  }

  wrapPerson = (name, key) => <span key={key} className="person">{name}</span>

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

  saveComments = (comments) => {
    const { issue } = this.state;
    sheet.updateSheet("Ideas!H" + issue.rowId, [[comments.join('\n')]], () => {
      this.setState( { comments } );
    }, (error) => {
      console.log("Error updating sheet: ", error);
      alert("Error: " + error.body);
    });
  }

  saveTitle = (title) => {
    const { issue } = this.state;
    sheet.updateSheet("Ideas!B" + issue.rowId, [[title]], () => {
      this.setState( { issue: { ...this.state.issue, title } } );
    }, (error) => {
      console.log("Error updating sheet: ", error);
      alert("Error: " + error.body);
    });
  }

  render() {
    const { issue, comments } = this.state;

    return (
      <div className={"issue" + (issue.wips.length ? " has-wips" : "")}>
        <Like issue={issue} handleLike={this.handleLike} />
        <div className="issue-title">
          {this.props.index ? (this.props.index + ". ") : ""}
          <Editable originalContent={issue.title} onSave={this.saveTitle} />
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
        <Editable
          wrapperClassName="issue-comments"
          lineClassName="issue-comment-line"
          originalContent={comments}
          onSave={this.saveComments}
        />
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
