import { Router } from 'express';
import { AboutController } from './about.controller';
import { authenticate, requireAdmin } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { z } from 'zod';

const updateAboutSchema = z.object({
  name: z.string().min(4, 'Name is required'),
  bio: z.string().min(4, 'Bio is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional().default([]),
  experience: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        duration: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .default([]),
});

export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;

const router = Router();

router.get('/', AboutController.getAbout);
router.put(
  '/',
  authenticate,
  requireAdmin,
  validate(updateAboutSchema),
  AboutController.updateAbout
);

export default router;
