import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  toggleProjectLike,
  uploadProjectImages
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

/**
 * Project Routes
 * Handles all project portfolio endpoints
 * TODO: Add input validation middleware
 * TODO: Add file upload middleware for image handling
 * TODO: Add caching for public routes
 */

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProject);
router.post('/:id/like', toggleProjectLike);

// Protected routes (admin only)
router.use(protect); // All routes after this middleware require authentication
router.use(authorize('admin')); // All routes after this middleware require admin role

router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/images', uploadProjectImages);

// TODO: Add additional project routes
// router.get('/:id/analytics', getProjectAnalytics);
// router.post('/:id/duplicate', duplicateProject);
// router.put('/:id/publish', publishProject);
// router.put('/:id/archive', archiveProject);
// router.get('/category/:category', getProjectsByCategory);
// router.get('/technology/:tech', getProjectsByTechnology);

// TODO: Add bulk operations for admin
// router.post('/bulk/delete', bulkDeleteProjects);
// router.put('/bulk/status', bulkUpdateStatus);
// router.post('/bulk/export', exportProjects);

// TODO: Add SEO and sitemap routes
// router.get('/sitemap.xml', generateProjectSitemap);
// router.get('/:slug/meta', getProjectMeta);

export default router;