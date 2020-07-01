import React from 'react';
import { Switch, Route } from 'react-router';
import RouteWithInitialMethod from './RouteWithInitialMethod';

import NoMatch from '../pages/NoMatch';

import Routes from './routes';

const Router = () => (
  <Switch>
    {Routes.map((route) => (
      <RouteWithInitialMethod {...route} key={route.path} />
    ))}

    <Route render={(props) => <NoMatch {...props} />} />
  </Switch>
);

export default Router;
