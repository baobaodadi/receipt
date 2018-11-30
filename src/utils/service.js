import queryString from 'query-string';
import fetch from 'isomorphic-fetch';
import formData from 'form-urlencoded';


function handleResponse(promise, url, method) {
  return promise
    .then(res => {
      if (res.status !== 200) {
        throw Object({ status: res.status });
      }
      else {
        return res.json();
      }
    })
    .then(({ status, data, msg, models }) => {
      if(status===-999){
        window.location.href=`${data}&targetUrl=${encodeURIComponent(window.location.href)}`;
      }
      if(status===-1){
        window.location.href = `https://oa.sogou-inc.com/asset/api/go-logout?targetUrl=${encodeURIComponent(window.location.href)}`;
      }
      if(status===500104){
        return { status, msg };
      }
      return data
      // if (+code === 0) {
      //   if (data != null) {
      //     return data;
      //   }
      //
      //   return models;
      // } else if (code) {
      //   console.log('network error', { code, message, url, method });
      //   throw Object({ code, message, url, method });
      // }
    });
}

function formatApiParams(api, params) {
  let newApi = api;
  const newParams = params;

  if (params) {
    Object.keys(params).forEach(key => {
      const r = new RegExp(`\{${key}\}`);

      if (r.test(api)) {
        newApi = newApi.replace(r, params[key]);
        delete newParams[key];
      }
    });
  }

  return {
    newApi,
    newParams
  };
}

export default {
  get(api, params) {
    const {newApi, newParams} = formatApiParams(api, params);

    const url = newParams
      ? `${newApi}?${queryString.stringify(newParams)}`
      : newApi;
    return handleResponse(
      fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
        },
      }),
      url,
      'get'
    );
  },

  post(api, params) {
    const {newApi, newParams} = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; ' +
          'charset=utf-8',
        },
        body: formData(newParams),
      }),
      newApi,
      'post'
    );
  },

  postJson(api, params) {
    const {newApi, newParams} = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newParams),
      }),
      newApi,
      'post'
    );
  },

  put(api, params) {
    const {newApi, newParams} = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(newParams),
      }),
      newApi,
      'put'
    );
  },

  putJson(api, params) {
    const {newApi, newParams} = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newParams),
      }),
      newApi,
      'put'
    );
  },

  delete(api, params) {
    const {newApi, newParams} = formatApiParams(api, params);

    const url = newParams
      ? `${newApi}?${queryString.stringify(newParams)}`
      : newApi;

    return handleResponse(
      fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(newParams),
      }),
      newApi,
      'put'
    );
  },

  postImage(api, param) {
    const data = new FormData();
    data.append('file', param);
    return handleResponse(
      fetch(api, {
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      api,
      'post'
    );
  },
}

