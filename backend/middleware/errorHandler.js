/**
 * Global Error Handler Middleware
 * Handles all errors throughout the application with proper logging and responses
 */

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, statusCode, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.data = data; // Additional error data (e.g., validation errors)

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error to console (in development)
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Error Stack:', err.stack);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ApiError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ApiError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => error.message).join(', ');
    error = new ApiError(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new ApiError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new ApiError(message, 401);
  }

  // Send error response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(error.data && { errors: error.data }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Catch async errors wrapper
 * Wraps async route handlers to catch errors automatically
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (err, promise) => {
  console.log('🚨 Unhandled Promise Rejection:', err.message);
  // Close server & exit process gracefully
  // server.close(() => {
  //   process.exit(1);
  // });
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (err) => {
  console.log('🚨 Uncaught Exception:', err.message);
  process.exit(1);
});
