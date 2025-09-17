import express from 'express';
import {
  submitContactForm,
  getContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  addContactNote,
  deleteContactSubmission,
  getContactStats,
  scheduleFollowUp
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

/**
 * Contact Routes
 * Handles all contact form and inquiry endpoints
 * TODO: Add rate limiting for contact form submission
 * TODO: Add input validation and sanitization middleware
 * TODO: Add spam detection middleware
 */

const router = express.Router();

// Public routes
router.post('/', submitContactForm);

// Protected routes (admin only)
router.use(protect); // All routes after this middleware require authentication
router.use(authorize('admin')); // All routes after this middleware require admin role

router.get('/', getContactSubmissions);
router.get('/stats', getContactStats);
router.get('/:id', getContactSubmission);
router.put('/:id/status', updateContactStatus);
router.post('/:id/notes', addContactNote);
router.post('/:id/followup', scheduleFollowUp);
router.delete('/:id', deleteContactSubmission);

// TODO: Add additional contact management routes
// router.post('/bulk/status', bulkUpdateContactStatus);
// router.post('/bulk/assign', bulkAssignContacts);
// router.post('/bulk/delete', bulkDeleteContacts);
// router.post('/bulk/export', exportContacts);

// TODO: Add email integration routes
// router.post('/:id/reply', replyToContact);
// router.get('/:id/thread', getEmailThread);
// router.post('/:id/forward', forwardContact);

// TODO: Add contact analytics routes
// router.get('/analytics/summary', getContactAnalytics);
// router.get('/analytics/trends', getContactTrends);
// router.get('/analytics/sources', getContactSources);
// router.get('/analytics/conversion', getConversionRates);

// TODO: Add automation routes
// router.post('/automation/rules', createAutomationRule);
// router.get('/automation/rules', getAutomationRules);
// router.put('/automation/rules/:id', updateAutomationRule);
// router.delete('/automation/rules/:id', deleteAutomationRule);

// TODO: Add notification/webhook routes
// router.post('/webhooks/slack', handleSlackWebhook);
// router.post('/webhooks/discord', handleDiscordWebhook);
// router.get('/notifications/settings', getNotificationSettings);
// router.put('/notifications/settings', updateNotificationSettings);

export default router;