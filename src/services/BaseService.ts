import axios from 'axios';
import { onSignOutSuccess } from '../store/auth/sessionSlice';
import store from '../store';

const unauthorizedCode = [401]
const notFoundCode = [404]
const errorCode = [500, 501, 502, 503, 504, 505]

const BaseService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

BaseService.interceptors.request.use(config => {

  const state = store.getState();

  const accessToken = state.auth.session.token;
  if (accessToken && accessToken !== '') {
      config.headers.Authorization = `Bearer ${accessToken}`
  }
  
  return config
}, error => {
  return Promise.reject(error)
})

BaseService.interceptors.response.use(
  response => response,
  error => {

      const { response } = error

      if (response && (unauthorizedCode.includes(response.status) || notFoundCode.includes(response.status))) {
          store.dispatch(onSignOutSuccess())
      }

      return Promise.reject(error)
  }
)

export default BaseService;
