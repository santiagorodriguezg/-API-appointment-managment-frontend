const TokenStorage = (() => {
  const LOCAL_STORAGE_ACCESS_TOKEN = 'at';
  const LOCAL_STORAGE_REFRESH_TOKEN = 'rf';
  const LOCAL_STORAGE_USER = 'user';

  const getAccessToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN));
  const setAccessToken = token => localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, JSON.stringify(token));

  const getRefreshToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN));
  const setRefreshToken = token => localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, JSON.stringify(token));

  const getUser = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));

  const clear = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_USER);
  };

  return {
    LOCAL_STORAGE_ACCESS_TOKEN,
    LOCAL_STORAGE_REFRESH_TOKEN,
    LOCAL_STORAGE_USER,
    clear,
    getUser,
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
  };
})();

export default TokenStorage;
