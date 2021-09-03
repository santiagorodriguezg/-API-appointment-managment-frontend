import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../context/Auth';
import { LogoutService } from '../../../services/Auth';

const Logout = () => {
  const { logOut } = useContext(AuthContext);
  const history = useHistory();
  const refreshToken = JSON.parse(localStorage.getItem('rf')) || '';

  useEffect(() => {
    const load = async () => {
      try {
        await LogoutService({ refresh: refreshToken });

        logOut();
        history.push('/accounts/login');
      } catch (e) {
        console.log('ERROR', e);
      }
    };
    load();
  }, []);

  return null;
};

export default Logout;
