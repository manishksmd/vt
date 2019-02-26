import * as React from 'react';
// import './Title.css';

const Title = props => {
  return (
    <div id="main" className="title">
      {props.children}
    </div>
  );
};

export default Title;