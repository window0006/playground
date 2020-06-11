import React from 'react';
import { Spin } from 'antd';

import './loading.less';

export default () => {
  return (
    <div className="loading-wrapper">
      <Spin />
    </div>
  )
}
