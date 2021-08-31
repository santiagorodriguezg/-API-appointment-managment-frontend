import { createContext } from 'react';
import useLocalStorage from '../../libs/Storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [username, setUsername] = useLocalStorage('username', '');

  const logIn = data => {
    setToken(data.token);
    setRole(data.role);
    setUsername(data.username);
  };

  const logOut = () => {
    setToken(null);
    setRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
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
