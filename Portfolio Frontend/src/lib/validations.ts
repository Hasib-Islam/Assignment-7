import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  published: z.boolean(),
  imageUrl: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional(),
  liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  featured: z.boolean(),
  tags: z.array(z.string()),
  slug: z.string().min(1, 'Slug is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type BlogFormData = z.infer<typeof blogSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
