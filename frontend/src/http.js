import axiosFactory from 'axios';
import merge from 'lodash.merge';

const instance = axiosFactory.create({
  baseURL: process.env.VUE_APP_URL || (location.origin + '/api/'),
});

const defaultOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredentials: true,
  }
};

const http = {
  get: (url, options) => instance.get(url, merge(defaultOptions(), (options || {}))),
  post: (url, data, options) => instance.post(url, data, merge(defaultOptions(), (options || {}))),
  patch: (url, data, options) => instance.patch(url, data, merge(defaultOptions(), (options || {}))),
  put: (url, data, options) => instance.put(url, data, merge(defaultOptions(), (options || {}))),
  delete: (url, options) => instance.delete(url, merge(defaultOptions(), (options || {}))),
};

if (process.env.NODE_ENV === 'development') window['thisHttp'] = http;

export default http;
