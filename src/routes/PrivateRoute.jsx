import { Redirect, Route } from 'react-router-dom';
import Error403 from '../pages/errors/403';
import TokenStorage from '../config/TokenStorage';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const accessToken = TokenStorage.getAccessToken();
  const currentLocation = rest.location.pathname;

  return (
    <Route
      {...rest}
      component={props => {
        if (!accessToken) {
          TokenStorage.clear();
          return (
            <Redirect
              to={{
                pathname: '/accounts/login/',
                search: `?next=${currentLocation}`,
                state: { from: currentLocation },
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
