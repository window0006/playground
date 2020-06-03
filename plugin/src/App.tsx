import { hot } from 'react-hot-loader/root';
// react-hot-loader/root需要在react之前被引入
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { RouteProps } from 'react-router';

import routeConfigs from './route';
import Home from './pages/Home';

// 这里不能用 RouteProps.render 必须用 RouteProps['render']
const renderPath: RouteProps['render'] = () => {
  return (
    <Home>
      <Link to="/clock">clock</Link>
      {/*<Public />*/}
      <div className="main">
        <Switch>
          {
            routeConfigs.map(props => (
              <Route {...props} key={props.path} />
            ))
          }
        </Switch>
      </div>
    </Home>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        render={renderPath}
      />
    </BrowserRouter>
  );
}

export default hot(App);
// 无从下手的感觉依旧强烈
// 没想好下一步要做什么吗 要将router搭起来