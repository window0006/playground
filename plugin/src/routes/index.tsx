import React from 'react';
import { RouteProps, RouteComponentProps } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Clock from '../pages/Clock';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export interface IRouteItem extends RouteProps {
  routes?: IRouteItem[];
}

const renderNestingRouteComponent = (route: IRouteItem): RouteProps['render'] => (props: RouteComponentProps<any>) => {
  const Component = route.component;
  return (
    <Component {...props}>
      <RouteWithSubRoutes routes={route.routes} />
    </Component>
  );
}

export function RouteWithSubRoutes({ routes }: { routes: IRouteItem[] }): JSX.Element {
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
      {/* switch to 404 if no path match */}
      <Route path="*" component={NotFound} />
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
        routes: [
          {
            path: '/clock/test',
            component: () => <div>test</div>
          }
        ]
      }, 
    ]
  },
];

export default routes;
