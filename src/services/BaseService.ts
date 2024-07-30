import axios from 'axios';
import deepParseJson from '../utils/deepParseJson';
import { onSignOutSuccess } from '../store/auth/sessionSlice';
import store from '../store';

const unauthorizedCode = [401]

const BaseService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

BaseService.interceptors.request.use(config => {

  const rawPersistData = localStorage.getItem('admin')
  const persistData = deepParseJson(rawPersistData)
  
  const accessToken = persistData.auth.session.token

  if (accessToken) {
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

      if (response && unauthorizedCode.includes(response.status)) {
          store.dispatch(onSignOutSuccess())
      }

      return Promise.reject(error)
  }
)

export default BaseService;
