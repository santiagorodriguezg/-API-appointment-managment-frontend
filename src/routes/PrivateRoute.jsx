import { Redirect, Route } from 'react-router-dom';
import Error403 from '../pages/errors/403';
import TokenStorage from '../config/TokenStorage';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const accessToken = TokenStorage.getAccessToken();

  return (
    <Route
      {...rest}
      component={props => {
        if (!accessToken) {
          TokenStorage.clear();
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
          const { role } = TokenStorage.getUser();
          if (!roles.includes(role)) return <Error403 />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
