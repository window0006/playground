import React from 'react';

import './home.less';

export default (props) => {
  return (
    <div className="wrapper">
      home
      {
        props.children
      }
    </div>
  );
}
