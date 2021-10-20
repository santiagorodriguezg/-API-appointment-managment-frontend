import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenStorage from '../config/TokenStorage';

const PublicRoute = ({ component: Component, ...rest }) => {
  const accessToken = TokenStorage.getAccessToken();

  return (
    <Route
      {...rest}
      component={props => {
        if (!accessToken) {
          TokenStorage.clear();
          return <Component {...props} />;
        }
        return <Redirect to="/accounts/profile" />;
      }}
    />
  );
};

export default PublicRoute;
