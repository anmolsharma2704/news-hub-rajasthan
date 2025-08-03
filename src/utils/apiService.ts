import axios, { AxiosInstance } from 'axios';

// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Types for API responses
export interface NewsItem {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  images?: string[];
  category?: string;
  author?: string;
  publishedAt?: string;
  date?: string;
  isFeatured?: boolean;
  slug?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
  city?: string;
  state?: string;
}

export interface Advertisement {
  _id: string;
  title: string;
  description?: string;
  link?: string;
  images: string[];
  type: string;
  status: 'active' | 'paused' | 'expired';
  views: number;
  clicks: number;
  priority: number;
  position: number;
  isDeleted: boolean;
  startDate: string;
  expiresAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'reporter' | 'user';
  avatar?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true, // send cookies/session if needed
      headers: { 'Content-Type': 'application/json' },
    });

    // Attach token on each request
    this.axiosInstance.interceptors.request.use((config) => {
      // const token = localStorage.getItem('token');
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MTI3MjNmM2RjYWE3YzI0Y2Q1NTFjIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTc1NDEzNjczNSwiZXhwIjoxNzU0MjIzMTM1fQ.z62dO0H6i-1o-SLqgba7-hQNvIq-15Eg1CnYi8oFZas'; // or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Generic request wrapper
  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  }

  // ------------------- NEWS -------------------
  getAllNews() {
    return this.request<{ success: boolean; news: NewsItem[] }>('GET', '/news/all');
  }

  getLatestNews() {
    return this.request<{ success: boolean; news: NewsItem[] }>('GET', '/news/latest-news');
  }

  getNewsById(id: string) {
    return this.request<NewsItem>('GET', `/news/${id}`);
  }

  getNewsBySlug(slug: string) {
    return this.request<NewsItem>('GET', `/news/slug/${slug}`);
  }

  getNewsByCategory(category: string) {
    return this.request<{ success: boolean; news: NewsItem[] }>('GET', `/news/category/${category}`);
  }

  getPendingNews() {
    return this.request<{ success: boolean; news: NewsItem[] }>('GET', '/news/pending');
  }

  createNews(newsData: Partial<NewsItem>) {
    return this.request<{ success: boolean; news: NewsItem }>('POST', '/news/create', newsData);
  }

  updateNews(id: string, newsData: Partial<NewsItem>) {
    return this.request<{ success: boolean; news: NewsItem }>('PUT', `/news/update/${id}`, newsData);
  }

  deleteNews(id: string) {
    return this.request<{ success: boolean; message: string }>('DELETE', `/news/delete/${id}`);
  }

  approveNews(id: string) {
    return this.request<{ success: boolean; news: NewsItem }>('PATCH', `/news/approve/${id}`);
  }

  // ------------------- ADS -------------------
  getAllAds() {
    return this.request<{ success: boolean; ads: Advertisement[] }>('GET', '/ads/all');
  }

  getActiveAds() {
    return this.request<{ success: boolean; ads: Advertisement[] }>('GET', '/ads/active');
  }

  getAdById(id: string) {
  return this.request<{ success: boolean; ad: Advertisement }>('GET', `/ads/${id}`);
  }


  getDeletedAds() {
    return this.request<{ success: boolean; ads: Advertisement[] }>('GET', '/ads/deleted');
  }

  createAd(adData: Partial<Advertisement>) {
    return this.request<{ success: boolean; ad: Advertisement }>('POST', '/ads/create', adData);
  }

  updateAd(id: string, adData: Partial<Advertisement>) {
    return this.request<{ success: boolean; ad: Advertisement }>('PUT', `/ads/update/${id}`, adData);
  }

  deleteAd(id: string) {
    return this.request<{ success: boolean; message: string }>('DELETE', `/ads/delete/${id}`);
  }

  restoreAd(id: string) {
    return this.request<{ success: boolean; ad: Advertisement }>('PATCH', `/ads/restore/${id}`);
  }

  // ------------------- AUTH -------------------
  login(credentials: LoginCredentials) {
    return this.request<LoginResponse>('POST', '/auth/login', credentials);
  }

  register(userData: { name: string; email: string; password: string; role?: string }) {
    return this.request<LoginResponse>('POST', '/auth/register', userData);
  }

  getCurrentUser() {
    return this.request<{ success: boolean; user: User }>('GET', '/auth/me');
  }

  // ------------------- USERS -------------------
  getAllUsers() {
    return this.request<{ success: boolean; users: User[] }>('GET', '/user/all');
  }

  updateUser(id: string, userData: Partial<User>) {
    return this.request<{ success: boolean; user: User }>('PUT', `/user/update/${id}`, userData);
  }

  deleteUser(id: string) {
    return this.request<{ success: boolean; message: string }>('DELETE', `/user/delete/${id}`);
  }
}

export const apiService = new ApiService();
