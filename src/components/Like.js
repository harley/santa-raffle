import React, { Component } from 'react';
import sheet from '../lib/sheet';
import localCache from '../lib/localCache';

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.issue.liked
    }
  }

  saveLike = (_) => {
    const { issue } = this.props;
    let cachedLikes = localCache.get('likes') || [];
    const index = cachedLikes.indexOf(issue.rowId);

    if (index > -1) {
      // already liked. nothing to do
    } else {
      // like
      cachedLikes.push(issue.rowId)
      this.setState({liked: true})
    }
    localCache.set('likes', cachedLikes)
    console.log("cachedLikes", cachedLikes)
  }

  onLike = () => {
    const { issue } = this.props;
    const likesCount = issue.likes + 1;

    sheet.updateSheet("Ideas!O" + issue.rowId, [[likesCount]], this.saveLike, (error) => {
      console.log("Error updating sheet: ", error);
      alert("Error: " + error.body);
    })
  }

  render() {
    const { liked } = this.state;

    return (
      <button className={"btn like"+ (liked ? " liked" : "")} onClick={this.onLike}>{liked ? "Liked" : "Like"}</button>  
    );
  }
}

export default Like;