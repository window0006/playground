import React from 'react';
import { Spin } from 'antd';

import styles from './loading.less';

export default () => {
  return (
    <div className={styles['loading-wrapper']}>
      <Spin />
    </div>
  )
}
