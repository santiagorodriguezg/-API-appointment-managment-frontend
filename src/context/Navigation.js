import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from './Auth';
import { RefreshTokenService, VerifyTokenService } from '../services/Auth';

const Navigation = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const { token, setToken, refreshToken, setRefreshToken, logOut } = useContext(AuthContext);

  const RefreshToken = async () => {
    try {
      if (!refreshToken) {
        logOut();
        setRedirect(true);
        return;
      }

      const res = await RefreshTokenService({ refresh: refreshToken });
      if (!res.err) {
        setToken(res.access);
        setRefreshToken(res.refresh);
      } else {
        console.log('NO SE PUDO ACTUALZIAR EL TOKEN');
        logOut();
        setRedirect(true);
      }
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const VerifyToken = async () => {
    try {
      if (!token) {
        logOut();
        console.log('LOGOUT');
        setRedirect(true);
        return;
      }

      const res = await VerifyTokenService({ token });
      if (res.err) {
        await RefreshToken();
        console.log('EL TOKEN ES INVALIDO O HA EXPIRADO');
      } else {
        // Opcional
        // setRedirect(true);
        console.log('EL TOKEN ES VALIDO');
      }
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  useEffect(async () => {
    await VerifyToken();
  }, [VerifyToken]);

  return redirect ? <Redirect to="/accounts/login" /> : children;
};

export default Navigation;
