export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  imageUrl?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tags: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface About {
  id: string;
  name: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  imageUrl?: string;
  skills: string[];
  experience: Experience[];
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  slug: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
  meta?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface BlogsResponse {
  blogs: Blog[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
