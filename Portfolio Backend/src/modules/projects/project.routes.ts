import { Router } from 'express';
import { ProjectController } from './project.controller';
import { validate } from '../../middleware/validation.middleware';
import { authenticate, requireAdmin } from '../../middleware/auth.middleware';
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(6, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  content: z.string().min(10, 'Content is required'),
  imageUrl: z.string().optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
});

const updateProjectSchema = z.object({
  title: z.string().min(6).optional(),
  description: z.string().min(10).optional(),
  content: z.string().min(10).optional(),
  imageUrl: z.string().optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

const router = Router();

router.get('/', ProjectController.getAllProjects);
router.get('/featured', ProjectController.getFeaturedProjects);
router.get('/:id', ProjectController.getProjectById);
router.get('/slug/:slug', ProjectController.getProjectBySlug);

router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createProjectSchema),
  ProjectController.createProject
);
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateProjectSchema),
  ProjectController.updateProject
);
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  ProjectController.deleteProject
);

export default router;
