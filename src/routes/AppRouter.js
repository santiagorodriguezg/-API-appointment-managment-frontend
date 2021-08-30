import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../context/Auth';

import Login from '../pages/accounts/Login';
import Signup from '../pages/accounts/Signup';
import PasswordReset from '../pages/accounts/PasswordReset';
import PasswordResetDone from '../pages/accounts/PasswordResetDone';
import PasswordResetConfirm from '../pages/accounts/PasswordResetConfirm';
import PasswordResetConfirmDone from '../pages/accounts/PasswordResetConfirmDone';

import Profile from '../pages/Profile';
import ProfileName from '../pages/Profile/ProfileName';
import ProfileIdentification from '../pages/Profile/ProfileIdentification';

import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/password/reset" component={PasswordReset} />
          <Route exact path="/password/reset/done" component={PasswordResetDone} />
          <Route path="/password/reset/:uid/:token" component={PasswordResetConfirm} />
          <Route exact path="/password/reset/complete" component={PasswordResetConfirmDone} />

          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/name" component={ProfileName} />
          <Route exact path="/profile/identification" component={ProfileIdentification} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
