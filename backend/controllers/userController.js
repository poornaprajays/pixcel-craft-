import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * User Controller
 * Handles user-related operations like registration, login, profile management
 * TODO: Implement all user management functionality
 */

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res, next) => {
  // TODO: Implement user registration logic
  // const { name, email, password } = req.body;
  
  // Validation
  // Check if user already exists
  // Hash password
  // Create user
  // Generate JWT token
  // Send response
  
  res.status(201).json({
    success: true,
    message: 'User registration endpoint - TODO: Implement logic',
    data: {
      // user: newUser,
      // token: token
    }
  });
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res, next) => {
  // TODO: Implement user login logic
  // const { email, password } = req.body;
  
  // Validation
  // Find user by email
  // Check password match
  // Generate JWT token
  // Send response
  
  res.status(200).json({
    success: true,
    message: 'User login endpoint - TODO: Implement logic',
    data: {
      // user: user,
      // token: token
    }
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/users/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
  // TODO: Implement get current user logic
  // const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    message: 'Get current user endpoint - TODO: Implement logic',
    data: {
      // user: user
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res, next) => {
  // TODO: Implement update profile logic
  // const fieldsToUpdate = {
  //   name: req.body.name,
  //   email: req.body.email
  // };
  
  // const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
  //   new: true,
  //   runValidators: true
  // });
  
  res.status(200).json({
    success: true,
    message: 'Update profile endpoint - TODO: Implement logic',
    data: {
      // user: user
    }
  });
});

/**
 * @desc    Update password
 * @route   PUT /api/users/updatepassword
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res, next) => {
  // TODO: Implement update password logic
  // const user = await User.findById(req.user.id).select('+password');
  
  // Check current password
  // if (!(await user.matchPassword(req.body.currentPassword))) {
  //   return next(new ApiError('Password is incorrect', 401));
  // }
  
  // Update password
  // user.password = req.body.newPassword;
  // await user.save();
  
  res.status(200).json({
    success: true,
    message: 'Update password endpoint - TODO: Implement logic',
    data: {
      // token: user.getSignedJwtToken()
    }
  });
});

/**
 * @desc    Forgot password
 * @route   POST /api/users/forgotpassword
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  // TODO: Implement forgot password logic
  // const user = await User.findOne({ email: req.body.email });
  
  // if (!user) {
  //   return next(new ApiError('There is no user with that email', 404));
  // }
  
  // Get reset token
  // const resetToken = user.getResetPasswordToken();
  // await user.save({ validateBeforeSave: false });
  
  // Send email with reset token
  
  res.status(200).json({
    success: true,
    message: 'Forgot password endpoint - TODO: Implement logic',
    data: {
      message: 'Email sent'
    }
  });
});

/**
 * @desc    Reset password
 * @route   PUT /api/users/resetpassword/:resettoken
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  // TODO: Implement reset password logic
  // Get hashed token
  // const resetPasswordToken = crypto
  //   .createHash('sha256')
  //   .update(req.params.resettoken)
  //   .digest('hex');
  
  // Find user by token
  // const user = await User.findOne({
  //   resetPasswordToken,
  //   resetPasswordExpire: { $gt: Date.now() }
  // });
  
  // if (!user) {
  //   return next(new ApiError('Invalid token', 400));
  // }
  
  // Set new password
  // user.password = req.body.password;
  // user.resetPasswordToken = undefined;
  // user.resetPasswordExpire = undefined;
  // await user.save();
  
  res.status(200).json({
    success: true,
    message: 'Reset password endpoint - TODO: Implement logic',
    data: {
      // token: user.getSignedJwtToken()
    }
  });
});

/**
 * @desc    Logout user / clear cookie
 * @route   GET /api/users/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  // TODO: Implement logout logic
  // Add token to blacklist or clear cookie
  
  res.status(200).json({
    success: true,
    message: 'Logout endpoint - TODO: Implement logic',
    data: {}
  });
});