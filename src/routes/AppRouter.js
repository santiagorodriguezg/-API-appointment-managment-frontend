import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../context/Auth';
import { PrivateRoute } from './PrivateRoute';

import Login from '../pages/accounts/Login';
import Signup from '../pages/accounts/Signup';
import PasswordChange from '../pages/accounts/PasswordChange';
import PasswordReset from '../pages/accounts/PasswordReset';
import PasswordResetDone from '../pages/accounts/PasswordResetDone';
import PasswordResetConfirm from '../pages/accounts/PasswordResetConfirm';
import PasswordResetConfirmDone from '../pages/accounts/PasswordResetConfirmDone';

import Profile from '../pages/accounts/Profile';
import Name from '../pages/accounts/Name';
import Email from '../pages/accounts/Email';
import Phone from '../pages/accounts/Phone';
import Location from '../pages/accounts/Location';
import Identification from '../pages/accounts/Identification';

import Home from '../pages/Home';
import Logout from '../pages/accounts/Logout';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/accounts/login" component={Login} />
          <Route exact path="/accounts/signup" component={Signup} />
          <Route exact path="/accounts/password/reset" component={PasswordReset} />
          <Route exact path="/accounts/password/reset/done" component={PasswordResetDone} />
          <Route path="/accounts/password/reset/:uid/:token" component={PasswordResetConfirm} />
          <Route exact path="/accounts/password/reset/complete" component={PasswordResetConfirmDone} />
          <PrivateRoute exact path="/accounts/logout" component={Logout} />
          <PrivateRoute exact path="/accounts/password/change" component={PasswordChange} />

          <PrivateRoute exact path="/accounts/profile" component={Profile} />
          <PrivateRoute exact path="/accounts/name" component={Name} />

          <PrivateRoute exact path="/accounts/identification" component={Identification} />
          <PrivateRoute exact path="/accounts/email" component={Email} />
          <PrivateRoute exact path="/accounts/phone" component={Phone} />
          <PrivateRoute exact path="/accounts/location" component={Location} />

          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
