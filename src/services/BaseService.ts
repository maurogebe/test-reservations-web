import axios from 'axios';
import deepParseJson from '../utils/deepParseJson';

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

export default BaseService;
