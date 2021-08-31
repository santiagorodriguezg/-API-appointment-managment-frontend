import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../context/Auth';

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
import Username from '../pages/accounts/Username';
import Identification from '../pages/accounts/Identification';

import Home from '../pages/Home';

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
          <Route exact path="/accounts/password/change" component={PasswordChange} />

          <Route exact path="/accounts/profile" component={Profile} />
          <Route exact path="/accounts/name" component={Name} />
          <Route exact path="/accounts/identification" component={Identification} />
          <Route exact path="/accounts/email" component={Email} />
          <Route exact path="/accounts/phone" component={Phone} />
          <Route exact path="/accounts/location" component={Location} />
          <Route exact path="/accounts/username" component={Username} />

          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
