import axios from 'axios';
import { JWT_KEY } from 'src/utils/constant';

export const axiosClient = axios.create();

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem(JWT_KEY);

    if (config.headers) {
      config.headers.Authorization = token ? token : '';
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
