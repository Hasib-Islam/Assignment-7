import { Router } from 'express';
import { BlogController } from './blog.controller';
import { validate } from '../../middleware/validation.middleware';
import { authenticate, requireAdmin } from '../../middleware/auth.middleware';
import { z } from 'zod';

const createBlogSchema = z.object({
  title: z.string().min(6, 'Title is required'),
  content: z.string().min(6, 'Content is required'),
  excerpt: z.string().optional(),
  slug: z.string().min(4, 'Slug is required'),
  published: z.boolean().optional().default(false),
});

const updateBlogSchema = z.object({
  title: z.string().min(6).optional(),
  content: z.string().min(6).optional(),
  excerpt: z.string().optional(),
  slug: z.string().min(4).optional(),
  published: z.boolean().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;

const router = Router();

router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);
router.get('/slug/:slug', BlogController.getBlogBySlug);

router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createBlogSchema),
  BlogController.createBlog
);
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateBlogSchema),
  BlogController.updateBlog
);
router.delete('/:id', authenticate, requireAdmin, BlogController.deleteBlog);

export default router;
