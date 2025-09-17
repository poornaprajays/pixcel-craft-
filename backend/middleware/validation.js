import { body, param, validationResult } from 'express-validator';
import { ApiError } from './errorHandler.js';

/**
 * Validation Middleware
 * Handles input validation and sanitization for all API endpoints
 */

// Middleware to check validation results
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    return next(new ApiError(
      `Validation failed: ${errorMessages.map(e => e.message).join(', ')}`, 
      400,
      errorMessages
    ));
  }
  next();
};

// User validation rules
export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),
  
  body('password')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 and 100 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

export const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),
  
  handleValidationErrors
];

export const validateUpdatePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6, max: 100 })
    .withMessage('New password must be between 6 and 100 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  handleValidationErrors
];

// Project validation rules
export const validateCreateProject = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Project title must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Project description must be between 10 and 500 characters'),
  
  body('fullDescription')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Full description cannot exceed 2000 characters'),
  
  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array')
    .custom((value) => {
      if (value && value.length > 10) {
        throw new Error('Cannot have more than 10 technologies');
      }
      return true;
    }),
  
  body('technologies.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each technology must be between 1 and 30 characters'),
  
  body('category')
    .isIn(['web-development', 'mobile-app', 'ui-ux-design', 'branding', 'ecommerce', 'other'])
    .withMessage('Invalid project category'),
  
  body('links.live')
    .optional()
    .isURL()
    .withMessage('Live project link must be a valid URL'),
  
  body('links.github')
    .optional()
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
  
  body('links.behance')
    .optional()
    .isURL()
    .withMessage('Behance link must be a valid URL'),
  
  handleValidationErrors
];

export const validateUpdateProject = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Project title must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Project description must be between 10 and 500 characters'),
  
  body('category')
    .optional()
    .isIn(['web-development', 'mobile-app', 'ui-ux-design', 'branding', 'ecommerce', 'other'])
    .withMessage('Invalid project category'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid project status'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  
  handleValidationErrors
];

// Contact form validation rules
export const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  
  body('subject')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  body('projectType')
    .optional()
    .isIn(['web-development', 'mobile-app', 'ui-ux-design', 'branding', 'ecommerce', 'digital-marketing', 'consultation', 'other'])
    .withMessage('Invalid project type'),
  
  body('budget')
    .optional()
    .isIn(['under-5k', '5k-10k', '10k-25k', '25k-50k', 'over-50k', 'not-specified'])
    .withMessage('Invalid budget range'),
  
  body('timeline')
    .optional()
    .isIn(['asap', '1-month', '2-3-months', '3-6-months', 'flexible', 'not-specified'])
    .withMessage('Invalid timeline'),
  
  handleValidationErrors
];

// Parameter validation
export const validateMongoId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  handleValidationErrors
];

// Generic validation helpers
export const validatePagination = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];