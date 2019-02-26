import React, { Component } from 'react';

import Body from './Body';
import Header from './Header';
// import './Page.css';

class Page extends Component {
  
  render() {
    return (
      <div
        id="app"
        data-id="app"
        data-app-version={process.env.REACT_APP_VERSION}
        className="page"
      >
        <div id="main" className="main">
          <Header className="shadow-sm">
            Sample Header Content!
          </Header>
          <Body>{this.props.bodyContent && this.props.bodyContent()}</Body>
        </div>
      </div>
    );
  }
}

export default Page;
