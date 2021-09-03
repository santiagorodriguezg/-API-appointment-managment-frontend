import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../context/Auth';
import { LogoutService } from '../../../services/Auth';
import ErrorMessage from '../../../components/ErrorMessage';
import StyledGlobal from '../../../styles/Global';

const Logout = () => {
  const { logOut } = useContext(AuthContext);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);
  const refreshToken = JSON.parse(localStorage.getItem('rf')) || '';

  useEffect(() => {
    const load = async () => {
      try {
        setErrorMsg(false);

        await LogoutService({ refresh: refreshToken });

        logOut();
        history.push('/accounts/login');
      } catch (e) {
        setErrorMsg(true);
      }
    };
    load();
  }, []);

  return errorMsg ? (
    <StyledGlobal.Container>
      <StyledGlobal.WrapperContent840>
        <br />
        <ErrorMessage retryBtn />
      </StyledGlobal.WrapperContent840>
    </StyledGlobal.Container>
  ) : null;
};

export default Logout;
