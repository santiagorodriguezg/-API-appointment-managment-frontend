import { createContext } from 'react';
import useLocalStorage from '../../libs/Storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', '');
  const [refreshToken, setRefreshToken] = useLocalStorage('rf', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [username, setUsername] = useLocalStorage('username', '');

  const logIn = data => {
    setToken(data.token);
    setRefreshToken(data.refresh);
    setRole(data.role);
    setUsername(data.username);
  };

  const logOut = () => {
    setToken(null);
    setRefreshToken(null);
    setRole(null);
    setUsername(null);

    localStorage.removeItem('token');
    localStorage.removeItem('rf');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        role,
        setRole,
        username,
        setUsername,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
