import { createContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import TokenStorage from '../../config/utils/TokenStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN, '');
  const [refreshToken, setRefreshToken] = useLocalStorage(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, '');
  const [role, setRole] = useLocalStorage(TokenStorage.LOCAL_STORAGE_ROLE, '');
  const [name, setName] = useLocalStorage(TokenStorage.LOCAL_STORAGE_NAME, '');
  const [username, setUsername] = useLocalStorage(TokenStorage.LOCAL_STORAGE_USERNAME, '');

  const logIn = data => {
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    setRole(data.role);
    setUsername(data.username);
    setName(data.fullName);
  };

  const logOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    setUsername(null);
    setName(null);

    TokenStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
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
