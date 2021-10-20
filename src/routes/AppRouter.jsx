import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';

import { AuthProvider } from '../context/Auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/accounts/Login';
import Signup from '../pages/accounts/Signup';
import Logout from '../pages/accounts/Logout';
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

import UsersList from '../pages/users/UsersList';
import UsersEdit from '../pages/users/UsersEdit';
import UsersDetail from '../pages/users/UsersDetail';

import AppointmentsCreate from '../pages/appointments/AppointmentsCreate';
import AppointmentsHistoric from '../pages/appointments/AppointmentsHistoric';

import Home from '../pages/Home';
import Chat from '../pages/Chat';

import Error404 from '../pages/errors/404';
import { userRoles } from '../config/utils/enums';

const AppRouter = () => {
  const ROLES_ADMIN_DOCTOR = [userRoles[0].value, userRoles[1].value];
  return (
    <ConfigProvider locale={esES}>
      <AuthProvider>
        <Router>
          <Switch>
            <PublicRoute exact path="/accounts/login" component={Login} />
            <PublicRoute exact path="/accounts/signup" component={Signup} />
            <PublicRoute exact path="/accounts/password/reset" component={PasswordReset} />
            <PublicRoute exact path="/accounts/password/reset/done" component={PasswordResetDone} />
            <PublicRoute exact path="/accounts/password/reset/:uid/:token" component={PasswordResetConfirm} />
            <PublicRoute exact path="/accounts/password/reset/complete" component={PasswordResetConfirmDone} />

            <PrivateRoute exact path="/accounts/logout" component={Logout} />
            <PrivateRoute exact path="/accounts/password/change" component={PasswordChange} />
            <PrivateRoute exact path="/accounts/profile" component={Profile} />
            <PrivateRoute exact path="/accounts/name" component={Name} />
            <PrivateRoute exact path="/accounts/identification" component={Identification} />
            <PrivateRoute exact path="/accounts/email" component={Email} />
            <PrivateRoute exact path="/accounts/phone" component={Phone} />
            <PrivateRoute exact path="/accounts/location" component={Location} />

            <PrivateRoute exact path="/users" component={UsersList} roles={ROLES_ADMIN_DOCTOR} />
            <PrivateRoute exact path="/users/:username" component={UsersDetail} roles={ROLES_ADMIN_DOCTOR} />
            <PrivateRoute exact path="/users/:username/edit" component={UsersEdit} roles={ROLES_ADMIN_DOCTOR[0]} />

            <PrivateRoute exact path="/appointments/create" component={AppointmentsCreate} />
            <PrivateRoute exact path="/appointments/historic" component={AppointmentsHistoric} />

            <PrivateRoute exact path="/chat/:roomName" component={Chat} />

            <PrivateRoute exact path="/home" component={Home} />

            <Route path="*" component={Error404} />
          </Switch>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default AppRouter;
