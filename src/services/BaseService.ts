import axios from 'axios';

const BaseService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default BaseService;
