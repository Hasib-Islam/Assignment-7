import { api } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginData) {
    const response = await api.auth.login(credentials);
    return response.data;
  },

  async logout() {
    const response = await api.auth.logout();
    return response.data;
  },

  async refreshToken() {
    const response = await api.auth.refresh();
    return response.data;
  },
};
