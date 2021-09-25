const TokenStorage = (() => {
  const LOCAL_STORAGE_ACCESS_TOKEN = 'at';
  const LOCAL_STORAGE_REFRESH_TOKEN = 'rf';
  const LOCAL_STORAGE_ROLE = 'role';
  const LOCAL_STORAGE_NAME = 'name';
  const LOCAL_STORAGE_USERNAME = 'username';

  const getAccessToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN));
  const setAccessToken = token => localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, JSON.stringify(token));

  const getRefreshToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN));
  const setRefreshToken = token => localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, JSON.stringify(token));

  const getRole = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_ROLE));

  const clear = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_ROLE);
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    localStorage.removeItem(LOCAL_STORAGE_USERNAME);
  };

  return {
    LOCAL_STORAGE_ACCESS_TOKEN,
    LOCAL_STORAGE_REFRESH_TOKEN,
    LOCAL_STORAGE_ROLE,
    LOCAL_STORAGE_NAME,
    LOCAL_STORAGE_USERNAME,
    clear,
    getRole,
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
  };
})();

export default TokenStorage;
