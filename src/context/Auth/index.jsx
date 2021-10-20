import { createContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import TokenStorage from '../../config/TokenStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN, '');
  const [refreshToken, setRefreshToken] = useLocalStorage(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, '');
  const [user, setUser] = useLocalStorage(TokenStorage.LOCAL_STORAGE_USER, {});
  const [sideBarCollapsed, setSideBarCollapsed] = useLocalStorage(TokenStorage.LOCAL_STORAGE_SB_COLLAPSED, false);

  const logIn = data => {
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    setUser(data.user);
    setSideBarCollapsed(false);
  };

  const logOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setSideBarCollapsed(null);

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
        sideBarCollapsed,
        setSideBarCollapsed,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
