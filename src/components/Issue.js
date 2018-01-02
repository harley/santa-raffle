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

class Issue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issue: props.issue,
      comments: props.issue.comments,
      isEditing: false
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

  openForEdit = () => this.setState( { isEditing: true } )

  saveComments = () => {
    const { issue, comments } = this.state;
    sheet.updateSheet("Ideas!H" + issue.rowId, [[comments.join('\n')]], () => {
      this.setState( { isEditing: false } );
    }, (error) => {
      console.log("Error updating sheet: ", error);
      alert("Error: " + error.body);
    });
  }

  render() {
    const { issue, comments, isEditing } = this.state;

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
        { !isEditing &&
          <Linkify>
            <div className="issue-comments" onClick={this.openForEdit}>
              { comments.map((line, i) => {
                return (
                  <p className="issue-comment-line" key={ i }>{ line }</p>
                );
              }) }
            </div>
          </Linkify>
        }
        { isEditing &&
          <textarea
            onChange={(event) => this.setState({ comments: event.target.value.split('\n') })}
            onBlur={this.saveComments}
            style={{ width: '100%', height: '100px', marginTop: '10px' }}
            value={comments.join('\n')} />
        }
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
