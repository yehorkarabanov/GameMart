import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/backend',
    timeout: 5000,
});
export default apiInstance;