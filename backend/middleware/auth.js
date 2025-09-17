import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError } from './errorHandler.js';
import { asyncHandler } from './errorHandler.js';

/**
 * JWT Authentication Middleware
 * Protects routes that require user authentication
 */

/**
 * Protect middleware - ensures user is authenticated
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return next(new ApiError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID and attach to request object
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return next(new ApiError('No user found with this token', 401));
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('🚨 JWT Verification Error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError('Token expired, please login again', 401));
    } else if (error.name === 'JsonWebTokenError') {
      return next(new ApiError('Invalid token', 401));
    } else {
      return next(new ApiError('Token verification failed', 401));
    }
  }
});

/**
 * Role-based authorization middleware
 * @param {...string} roles - Allowed roles for the route
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError('User not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(
        `User role '${req.user.role}' is not authorized to access this route`,
        403
      ));
    }
    
    next();
  };
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't block access
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, continue without user
  if (!token) {
    return next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID
    const user = await User.findById(decoded.id);
    
    if (user) {
      req.user = user;
    }
  } catch (error) {
    // If token is invalid, just continue without user
    console.log('⚠️ Optional auth failed:', error.message);
  }

  next();
});

/**
 * Admin only middleware - shortcut for authorize('admin')
 */
export const adminOnly = authorize('admin');

/**
 * Check if user owns the resource or is an admin
 * Useful for routes where users can only access their own data
 */
export const ownerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError('User not authenticated', 401));
    }

    // Allow if user is admin or owns the resource
    if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId.toString()) {
      return next();
    }

    return next(new ApiError('Not authorized to access this resource', 403));
  };
};
