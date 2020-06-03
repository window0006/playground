import React from 'react';

export default (props) => {
  return (
    <div className="clock">
      clock
      {
        props.children
      }
    </div>
  );
}