import { createContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import TokenStorage from '../../config/utils/TokenStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN, '');
  const [refreshToken, setRefreshToken] = useLocalStorage(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, '');
  const [user, setUser] = useLocalStorage(TokenStorage.LOCAL_STORAGE_USER, {});

  const logIn = data => {
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    setUser(data.user);
  };

  const logOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    TokenStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        user,
        setUser,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
