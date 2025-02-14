import axios, { AxiosError } from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  async (config) => {
    try {
      return config;
    } catch (error) {
      console.error('🚀 ~ set config error:', error);
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error: AxiosError) => {
    console.error('🚀 ~ axios error:', error);
    const { status } = error.response!;
    switch (status) {
      case 400:
        console.error('bad request');
        break;

      case 401:
        console.error('unauthorised');
        break;

      case 404:
        console.error('/not-found');
        break;

      case 500:
        console.error('/server-error');
        break;
    }
    return Promise.reject(error.response?.data || error.response);
  },
);

export default request;
