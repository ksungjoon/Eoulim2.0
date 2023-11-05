import axios, { AxiosError, AxiosInstance } from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState } from 'atoms/Auth';
import { API_BASE_URL } from './urls';

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  config => {
    const userToken = useRecoilValue(tokenState);

    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${userToken}`;

    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    if (response.status === 404) {
      console.log('404 페이지로 이동해야 합니다.');
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
