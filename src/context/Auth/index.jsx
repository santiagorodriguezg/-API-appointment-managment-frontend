import { createContext } from 'react';
import useLocalStorage from '../../libs/Storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [username, setUsername] = useLocalStorage('username', '');

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
