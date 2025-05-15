import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:3456',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
