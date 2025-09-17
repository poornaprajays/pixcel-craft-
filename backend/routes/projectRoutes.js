import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  toggleProjectLike,
  uploadProjectImages,
  getProjectsByCategory,
  getProjectStats
} from '../controllers/projectController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import {
  validateCreateProject,
  validateUpdateProject,
  validateMongoId
} from '../middleware/validation.js';

/**
 * Project Routes
 * Handles all project portfolio endpoints with proper validation and authentication
 */

const router = express.Router();

// Public routes (no authentication required)
router.get('/', optionalAuth, getProjects); // Optional auth to show admin-only projects to admins
router.get('/featured', getFeaturedProjects);
router.get('/category/:category', getProjectsByCategory);

// Public routes with ID validation
router.get('/:id', optionalAuth, getProject);
router.post('/:id/like', validateMongoId, toggleProjectLike);

// Protected routes (admin only)
router.use(protect); // All routes after this middleware require authentication
router.use(authorize('admin')); // All routes after this middleware require admin role

// Admin project management routes
router.post('/', validateCreateProject, createProject);
router.put('/:id', validateMongoId, validateUpdateProject, updateProject);
router.delete('/:id', validateMongoId, deleteProject);
router.post('/:id/images', validateMongoId, uploadProjectImages);

// Admin statistics route
router.get('/admin/stats', getProjectStats);

export default router;