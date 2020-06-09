// react-hot-loader/root需要在react之前被引入
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes, { RouteWithSubRoutes } from './routes';

// import zhCN from 'antd/es/locale/zh_CN';
import './index.less';

function App() {
  return (
    <BrowserRouter>
      <RouteWithSubRoutes routes={routes} />
    </BrowserRouter>
  );
}

export default hot(App);
