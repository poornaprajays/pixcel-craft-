import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updatePassword,
  logout,
  getAllUsers,
  deleteAccount
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateUpdatePassword
} from '../middleware/validation.js';

/**
 * User Routes
 * Handles all user-related endpoints with proper validation and authentication
 */

const router = express.Router();

// Public routes - Authentication
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware are protected

router.get('/me', getMe);
router.put('/profile', validateUpdateProfile, updateProfile);
router.put('/updatepassword', validateUpdatePassword, updatePassword);
router.get('/logout', logout);
router.delete('/account', deleteAccount);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);

export default router;
