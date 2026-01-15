import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('admin_token');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('admin_token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('admin_token');
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            ...(this.token && { Authorization: `Bearer ${this.token}` })
        };
    }

    // Auth
    async login(email, password) {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        if (response.data.token) {
            this.setToken(response.data.token);
        }
        return response.data;
    }

    async verifyToken(token) {
        const response = await axios.post(`${API_BASE_URL}/auth/verify`, { token });
        return response.data;
    }

    // Photo Upload
    async uploadPhoto(file, title, description) {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('title', title);
        formData.append('description', description);

        const response = await axios.post(`${API_BASE_URL}/upload/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${this.token}`
            }
        });
        return response.data;
    }

    async getPhotos() {
        const response = await axios.get(`${API_BASE_URL}/upload/photos`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async deletePhoto(id) {
        const response = await axios.delete(`${API_BASE_URL}/upload/photo/${id}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    // Query Builder
    async executeQuery(queryConfig) {
        const response = await axios.post(`${API_BASE_URL}/query/execute`, queryConfig, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async getTables() {
        const response = await axios.get(`${API_BASE_URL}/query/tables`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async getTableSchema(table) {
        const response = await axios.get(`${API_BASE_URL}/query/schema/${table}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    // Generic CRUD
    async createRecord(table, data) {
        const response = await axios.post(`${API_BASE_URL}/content/${table}`, data, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async getRecords(table, limit = 100, offset = 0) {
        const response = await axios.get(`${API_BASE_URL}/content/${table}?limit=${limit}&offset=${offset}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async getRecord(table, id) {
        const response = await axios.get(`${API_BASE_URL}/content/${table}/${id}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async updateRecord(table, id, data) {
        const response = await axios.put(`${API_BASE_URL}/content/${table}/${id}`, data, {
            headers: this.getHeaders()
        });
        return response.data;
    }

    async deleteRecord(table, id) {
        const response = await axios.delete(`${API_BASE_URL}/content/${table}/${id}`, {
            headers: this.getHeaders()
        });
        return response.data;
    }
}

export default new ApiService();
