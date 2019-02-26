import React, { Component } from 'react';

// import './Body.css';

class Body extends Component {
  
  render() {
    return (
      <div data-id="body" id="body" className="body">
        {this.props.children}
      </div>
    );
  }
}

export default Body;
