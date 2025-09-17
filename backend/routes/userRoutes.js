import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

/**
 * User Routes
 * Handles all user-related endpoints
 * TODO: Add rate limiting for authentication routes
 * TODO: Add input validation middleware
 */

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware are protected

router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/updatepassword', updatePassword);
router.get('/logout', logout);

// TODO: Add additional user routes
// router.post('/verify-email', verifyEmail);
// router.post('/resend-verification', resendVerification);
// router.post('/change-email', changeEmail);
// router.delete('/account', deleteAccount);

// TODO: Add admin-only routes for user management
// router.get('/users', authorize('admin'), getAllUsers);
// router.get('/users/:id', authorize('admin'), getUserById);
// router.put('/users/:id', authorize('admin'), updateUserById);
// router.delete('/users/:id', authorize('admin'), deleteUserById);

export default router;