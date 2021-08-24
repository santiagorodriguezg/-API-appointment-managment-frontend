export const HttpClient = () => {
  const customFetch = async (endpoint, options, authz = false) => {
    const defaultHeader = {
      Accept: 'application/json',
      'Content-type': 'application/json',
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || 'GET';
    if (authz) options.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
    options.headers = options.headers ? { ...defaultHeader, ...options.headers } : defaultHeader;
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    console.log('OPTIONS', options);
    setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, options);
    const body = await response.json();

    if (response.status >= 200 && response.status <= 208) return body;

    return {
      err: true,
      data: body,
      status: response.status || '00',
      statusText: response.statusText || 'Ocurrió un error',
    };
  };

  const get = (url, options = {}, authz = false) => customFetch(url, options, authz);

  const post = (url, options = {}, authz) => {
    options.method = 'POST';
    return customFetch(url, options, authz);
  };

  const put = (url, options = {}, authz = false) => {
    options.method = 'PUT';
    return customFetch(url, options, authz);
  };

  const del = (url, options = {}, authz = false) => {
    options.method = 'DELETE';
    return customFetch(url, options, authz);
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default HttpClient;
