import "whatwg-fetch";
import auth from './auth';

function formatQueryParams(params: any) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export default function request(...args: any) {
  let [url, options = {}, shouldWatchServerRestart, stringify = true, ...rest] = args;
  let noAuth;

  try {
    [{ noAuth }] = rest;
  } catch (err) {
    noAuth = false;
  }

  // Set headers
  if (!options.headers) {
    options.headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      options.headers
    );
  }

  const token = auth.getToken();

  if (token && !noAuth) {
    options.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
      },
      options.headers
    );
  }

  if (options && options.params) {
    const params = formatQueryParams(options.params);
    url = `${url}?${params}`;
  }

  // Stringify body object
  if (options && options.body && stringify) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options).then(response => response.blob());
}
