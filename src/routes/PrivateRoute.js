import { Redirect, Route } from 'react-router-dom';
import Error403 from '../pages/errors/403';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const token = JSON.parse(window.localStorage.getItem('token'));

  return (
    <Route
      {...rest}
      component={props => {
        if (roles) {
          const role = JSON.parse(window.localStorage.getItem('role'));
          if (!roles.includes(role)) return <Error403 />;
        }

        if (!token) {
          return (
            <Redirect
              to={{
                pathname: '/accounts/login',
                state: { from: rest.path },
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};
