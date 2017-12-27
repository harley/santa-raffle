import React, { Component } from 'react';

class Raffles extends Component {
  render() {
    const range = Array.from({length: this.props.count}, (v, k) => k)

    return (
      <div className="raffles">
      {
        range.map((e) => {
          return (
            <img className="raffle-image" src={ require('../images/ticket-front.jpg')} key={e} />
          )
        })
      }
      </div>
    );
  }
}

export default Raffles;