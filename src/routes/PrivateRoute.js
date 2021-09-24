import { Redirect, Route } from 'react-router-dom';
import Error403 from '../pages/errors/403';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const token = JSON.parse(window.localStorage.getItem('token'));

  return (
    <Route
      {...rest}
      component={props => {
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

        if (roles) {
          const role = JSON.parse(window.localStorage.getItem('role'));
          if (!roles.includes(role)) return <Error403 />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
