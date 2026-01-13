import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout')
};

export const chatAPI = {
    analyze: (formData) => api.post('/chat/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    save: (chatData) => api.post('/chat/save', chatData),
    getHistory: () => api.get('/chat/history'),
    getChat: (id) => api.get(`/chat/${id}`),
};

export default api;