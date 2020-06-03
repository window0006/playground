import React from 'react';
import { RouteProps, RouteComponentProps } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Clock from '../pages/Clock';
import Home from '../pages/Home';
import Fallback from '../pages/Fallback';
import NotFound from '../pages/NotFound';

export interface IRouteItem extends RouteProps, IRouteWithSubRoutesProps {}

const renderNestingRouteComponent = (route: IRouteItem): RouteProps['render'] => (props: RouteComponentProps<any>) => {
  const Component = route.component;
  return (
    <Component {...props}>
      <RouteWithSubRoutes routes={route.routes} shouldNotFallBack={route.shouldNotFallBack} />
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

const routes: IRouteItem[] =  [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/clock',
        component: Clock,
        shouldNotFallBack: true,
        routes: [
          {
            path: '/clock/test',
            component: () => <div>test</div>
          }
        ],
      }, {
        path: '/404',
        component: NotFound
      }
    ]
  }
];

export default routes;
