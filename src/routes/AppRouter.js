import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../context/Auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PasswordReset from '../pages/PasswordReset';
import PasswordResetDone from '../pages/PasswordResetDone';
import PasswordResetConfirm from '../pages/PasswordResetConfirm';
import PasswordResetConfirmDone from '../pages/PasswordResetConfirmDone';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

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
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
