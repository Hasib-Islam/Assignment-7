import { Router } from 'express';
import { UploadController } from './upload.controller';
import { upload } from '../../middleware/upload.middleware';
import { authenticate, requireAdmin } from '../../middleware/auth.middleware';

const router = Router();

router.post(
  '/image',
  authenticate,
  requireAdmin,
  upload.single('image'),
  UploadController.uploadImage
);

export default router;
