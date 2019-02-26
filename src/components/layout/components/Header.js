import React from 'react';
// import './Header.css';

const Header = props => {
  const className = props.className ? `header ${props.className}` : 'header';

  return (
    <header data-id="header" id="header" className={className}>
      {props.children}
    </header>
  );
};

export default Header;
