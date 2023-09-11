import axios from 'axios';
import { FRONTEND_URL } from '../utils/constants';

const axiosInstance = axios.create({
    baseURL: FRONTEND_URL
});

export const axiosPrivate = axios.create({
    baseURL: FRONTEND_URL,
    headers: {'Content-Type': 'applications/json'},
    withCredentials: true
});

export default axiosInstance;