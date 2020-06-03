import React from 'react';
import { Route, Link } from 'react-router-dom';

export default (props) => {
  return (
    <div className="wrapper">
      {
        props.children
      }
    </div>
  );
}
