import React from 'react';
import { Route } from 'react-router-dom';
import useClientInitialMethod from './useClientInitialMethod';

const RouteWithInitialMethod = ({
  component: Component,
  cmpProps = {},
  routes,
  exact = false,
  path,
  initialMethod,
}) => {
  if (typeof initialMethod === 'function') {
    useClientInitialMethod(initialMethod);
  }
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => <Component {...props} {...cmpProps} routes={routes} />}
    />
  );
};

export default RouteWithInitialMethod;
