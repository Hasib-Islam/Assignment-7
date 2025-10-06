import { ApiResponse, BlogsResponse, Blog, Project, About } from '@/types';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ||
      'https://portfolio-backend-six-mu.vercel.app'
    : 'http://localhost:5000';

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(
        `Server returned non-JSON response: ${text.substring(0, 100)}`
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

export async function getServerData<T>(
  endpoint: string,
  tags?: string[],
  revalidate?: number | false
): Promise<ApiResponse<T>> {
  return apiFetch<T>(endpoint, {
    next: {
      tags,
      revalidate: revalidate === false ? false : revalidate,
    },
  });
}

export async function clientFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  return apiFetch<T>(endpoint, options);
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) =>
      clientFetch<{
        user: User;
        tokens: { accessToken: string; refreshToken: string };
      }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => clientFetch('/auth/logout', { method: 'POST' }),
    refresh: () => clientFetch('/auth/refresh-token', { method: 'POST' }),
    me: () => clientFetch<{ user: User }>('/auth/me'),
  },
  blogs: {
    getAll: (page = 1, limit = 10) =>
      getServerData<BlogsResponse>(
        `/blogs?page=${page}&limit=${limit}`,
        ['blogs'],
        3600
      ),
    getBySlug: (slug: string) =>
      getServerData<Blog>(`/blogs/slug/${slug}`, [`blog-${slug}`], 3600),
    create: (data: Omit<Blog, 'id' | 'author' | 'createdAt' | 'updatedAt'>) =>
      clientFetch<Blog>('/blogs', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Blog>) =>
      clientFetch<Blog>(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) => clientFetch(`/blogs/${id}`, { method: 'DELETE' }),
  },
  projects: {
    getAll: () =>
      getServerData<ApiResponse<Project[]>>('/projects', ['projects'], 3600),
    getFeatured: () =>
      getServerData<ApiResponse<Project[]>>(
        '/projects/featured',
        ['featured-projects'],
        3600
      ),
    getBySlug: (slug: string) =>
      getServerData<Project>(
        `/projects/slug/${slug}`,
        [`project-${slug}`],
        3600
      ),
    create: (
      data: Omit<Project, 'id' | 'author' | 'createdAt' | 'updatedAt'>
    ) =>
      clientFetch<ApiResponse<Project>>('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Project>) =>
      clientFetch<ApiResponse<Project>>(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      clientFetch<ApiResponse>(`/projects/${id}`, { method: 'DELETE' }),
  },
  about: {
    get: () => getServerData<About>('/about', ['about'], false),
    update: (data: Partial<About>) =>
      clientFetch<About>('/about', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
  upload: {
    image: (formData: FormData) =>
      clientFetch<{ imageUrl: string; publicId: string }>('/upload/image', {
        method: 'POST',
        body: formData,
        headers: {},
      }),
  },
};
