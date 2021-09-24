import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = JSON.parse(window.localStorage.getItem('token'));

  return (
    <Route {...rest} component={props => (!token ? <Component {...props} /> : <Redirect to="/accounts/profile" />)} />
  );
};

export default PublicRoute;
