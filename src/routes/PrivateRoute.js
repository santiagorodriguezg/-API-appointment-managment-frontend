import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = JSON.parse(window.localStorage.getItem('token'));
  return (
    <Route
      {...rest}
      component={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/accounts/login',
              state: { from: rest.path },
            }}
          />
        )
      }
    />
  );
};
