import express from 'express';
import {
  submitContactForm,
  getContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  addContactNote,
  deleteContactSubmission,
  getContactStats,
  scheduleFollowUp,
  completeFollowUp
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateContactForm,
  validateMongoId
} from '../middleware/validation.js';

/**
 * Contact Routes
 * Handles all contact form and inquiry endpoints with proper validation
 */

const router = express.Router();

// Public routes - Contact form submission
router.post('/', validateContactForm, submitContactForm);

// Protected routes (admin only)
router.use(protect); // All routes after this middleware require authentication
router.use(authorize('admin')); // All routes after this middleware require admin role

// Admin contact management routes
router.get('/', getContactSubmissions);
router.get('/stats', getContactStats);
router.get('/:id', validateMongoId, getContactSubmission);
router.put('/:id/status', validateMongoId, updateContactStatus);
router.post('/:id/notes', validateMongoId, addContactNote);
router.post('/:id/followup', validateMongoId, scheduleFollowUp);
router.put('/:id/followup/complete', validateMongoId, completeFollowUp);
router.delete('/:id', validateMongoId, deleteContactSubmission);

export default router;