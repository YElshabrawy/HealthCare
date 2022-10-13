import axios from 'axios';

const APP_BASE_URL = 'http://localhost:5000';

export default axios.create({
    baseURL: APP_BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
