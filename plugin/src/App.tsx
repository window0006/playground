// react-hot-loader/root需要在react之前被引入
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes, { RouteWithSubRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <RouteWithSubRoutes
        routes={routes}
      />
    </BrowserRouter>
  );
}

export default hot(App);
// 无从下手的感觉依旧强烈
// 没想好下一步要做什么吗 要将router搭起来 纯粹空白的页面