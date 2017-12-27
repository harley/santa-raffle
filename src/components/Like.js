import React, { Component } from 'react';
import sheet from '../lib/sheet';

class Like extends Component {
  onLike = () => {
    const { issue } = this.props;
    const likesCount = issue.likes + 1;

    sheet.updateSheet("Ideas!O" + issue.rowId, [[likesCount]], (event) => this.props.handleLike(issue), (error) => {
      console.log("Error updating sheet: ", error);
      alert("Error: " + error.body);
    })
  }

  render() {
    const liked = this.props.issue.liked;

    return (
      <button className={"btn like"+ (liked ? " liked" : "")} onClick={this.onLike}>{liked ? "Liked" : "Like"}</button>  
    );
  }
}

export default Like;