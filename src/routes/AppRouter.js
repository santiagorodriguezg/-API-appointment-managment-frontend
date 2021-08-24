import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../context/Auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PasswordReset from '../pages/PasswordReset';
import PasswordResetDone from '../pages/PasswordResetDone';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/password-reset" component={PasswordReset} />
          <Route path="/password-reset/done" component={PasswordResetDone} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
