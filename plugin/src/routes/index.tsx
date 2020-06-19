import React from 'react';
import { RouteProps, RouteComponentProps } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Clock from '../pages/Clock';

import Fallback from '../pages/Fallback';
import NotFound from '../pages/NotFound';

export interface IRouteItem extends RouteProps, IRouteWithSubRoutesProps {
  name?: string;
}

const renderNestingRouteComponent = (route: IRouteItem): RouteProps['render'] => (props: RouteComponentProps<any>) => {
  const Component = route.component;
  return (
    <Component {...props}>
      <RouteWithSubRoutes
        routes={route.routes}
        shouldNotFallBack={route.shouldNotFallBack}
      />
    </Component>
  );
}

interface IRouteWithSubRoutesProps {
  routes?: IRouteItem[];
  shouldNotFallBack?: boolean;
}

export const RouteWithSubRoutes: React.FunctionComponent<IRouteWithSubRoutesProps> = ({ routes, shouldNotFallBack }) => {
  return (
    <Switch>
      {
        routes.map((route: IRouteItem) => {
          const listKey: string = `${route.path}`;

          if (!route.routes) {
            return <Route {...route} key={listKey} />
          }

          return (
            <Route
              path={route.path}
              render={renderNestingRouteComponent(route)}
              key={listKey}
            />
          );
        })
      }
      {
        shouldNotFallBack ? null : <Route component={Fallback} />
      }
    </Switch>
  );
}

const routes: IRouteItem[] = [
  {
    path: '/',
    component: Home,
    routes: [
      {
        exact: true,
        path: '/clock',
        name: '时钟',
        component: Clock
      }, {
        path: '/404',
        component: NotFound
      }
    ]
  }
];

export default routes;
