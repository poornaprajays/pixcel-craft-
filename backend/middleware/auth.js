import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * JWT Authentication Middleware
 * Protects routes that require user authentication
 * TODO: Add token refresh logic and blacklist support
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // TODO: Find user by ID and attach to request object
      // const user = await User.findById(decoded.id);
      // if (!user) {
      //   return res.status(401).json({
      //     success: false,
      //     message: 'User not found'
      //   });
      // }
      
      // req.user = user;
      req.user = { id: decoded.id }; // Placeholder
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Role-based authorization middleware
 * TODO: Implement role checking logic
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // TODO: Check if user role is in allowed roles array
    // if (!roles.includes(req.user.role)) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'User role is not authorized to access this route'
    //   });
    // }
    
    next(); // Placeholder - always authorize for now
  };
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't block access
 * TODO: Implement optional auth logic
 */
export const optionalAuth = async (req, res, next) => {
  try {
    // TODO: Similar to protect middleware but doesn't return error if no token
    next();
  } catch (error) {
    next(error);
  }
};