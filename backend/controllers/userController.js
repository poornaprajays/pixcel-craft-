import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * User Controller
 * Handles user authentication and management operations
 */

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError('User with this email already exists', 400));
  }

  // Create user (password will be hashed automatically by the pre-save middleware)
  const user = await User.create({
    name,
    email,
    password
  });

  // Generate JWT token
  const token = user.getSignedJwtToken();

  // Remove password from response
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt
  };

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: userResponse,
      token
    }
  });
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ApiError('Invalid email or password', 401));
  }

  // Check if password matches
  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    return next(new ApiError('Invalid email or password', 401));
  }

  // Generate JWT token
  const token = user.getSignedJwtToken();

  // Remove password from response
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt
  };

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: userResponse,
      token
    }
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/users/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'User profile retrieved successfully',
    data: {
      user
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {};
  
  // Only include fields that are provided
  if (req.body.name) fieldsToUpdate.name = req.body.name;
  if (req.body.email) fieldsToUpdate.email = req.body.email;

  // Check if email is being updated and if it already exists
  if (req.body.email && req.body.email !== req.user.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(new ApiError('Email is already in use', 400));
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.id, 
    fieldsToUpdate, 
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

/**
 * @desc    Update password
 * @route   PUT /api/users/updatepassword
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password field
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  // Check current password
  const isCurrentPasswordMatch = await user.matchPassword(currentPassword);
  if (!isCurrentPasswordMatch) {
    return next(new ApiError('Current password is incorrect', 400));
  }

  // Update password (will be hashed automatically)
  user.password = newPassword;
  await user.save();

  // Generate new token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
    data: {
      token
    }
  });
});

/**
 * @desc    Forgot password
 * @route   POST /api/users/forgotpassword
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  
  if (!user) {
    return next(new ApiError('There is no user with that email', 404));
  }

  // For now, just send success response
  // In production, you would generate a reset token and send email
  res.status(200).json({
    success: true,
    message: 'Password reset instructions sent to email (feature not yet implemented)',
    data: {}
  });
});

/**
 * @desc    Reset password
 * @route   PUT /api/users/resetpassword/:resettoken
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  // For now, just send a placeholder response
  // In production, you would verify the reset token and update password
  res.status(200).json({
    success: true,
    message: 'Password reset successful (feature not yet implemented)',
    data: {}
  });
});

/**
 * @desc    Logout user (client-side token clearing)
 * @route   GET /api/users/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  // JWT logout is handled on the client side by removing the token
  // Server-side logout would require token blacklisting (advanced feature)
  
  res.status(200).json({
    success: true,
    message: 'Logout successful. Please remove token from client storage.',
    data: {}
  });
});

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  const total = await User.countDocuments();

  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/users/account
 * @access  Private
 */
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully',
    data: {}
  });
});