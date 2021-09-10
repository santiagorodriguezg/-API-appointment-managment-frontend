import { createContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', '');
  const [refreshToken, setRefreshToken] = useLocalStorage('rf', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [username, setUsername] = useLocalStorage('username', '');
  const [name, setName] = useLocalStorage('name', '');

  const logIn = data => {
    setToken(data.token);
    setRefreshToken(data.refresh);
    setRole(data.role);
    setUsername(data.username);
    setName(data.fullName);
  };

  const logOut = () => {
    setToken(null);
    setRefreshToken(null);
    setRole(null);
    setUsername(null);
    setName(null);

    localStorage.removeItem('token');
    localStorage.removeItem('rf');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
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
        name,
        setName,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
