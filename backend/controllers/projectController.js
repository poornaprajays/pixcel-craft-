import Project from '../models/Project.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';
import mongoose from 'mongoose';

/**
 * Project Controller
 * Handles project portfolio operations - CRUD operations for showcasing work
 */

/**
 * @desc    Get all projects with filtering, sorting, and pagination
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = asyncHandler(async (req, res, next) => {
  const { category, featured, status, page = 1, limit = 10, sort = '-createdAt' } = req.query;
  
  // Build query object
  let query = {};
  
  // Add filters
  if (category) query.category = category;
  if (featured !== undefined) query.featured = featured === 'true';
  if (status) query.status = status;
  
  // For public access, only show published projects
  if (!req.user || req.user.role !== 'admin') {
    query.status = 'published';
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Execute query with pagination and sorting
  const projects = await Project.find(query)
    .sort(sort)
    .limit(parseInt(limit))
    .skip(skip)
    .select('-__v');

  // Get total count for pagination
  const total = await Project.countDocuments(query);

  res.status(200).json({
    success: true,
    message: 'Projects retrieved successfully',
    data: {
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    }
  });
});

/**
 * @desc    Get single project by ID or slug
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProject = asyncHandler(async (req, res, next) => {
  let project;
  
  // Check if param is ObjectId or slug
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    project = await Project.findById(req.params.id).select('-__v');
  } else {
    project = await Project.findOne({ 'seo.slug': req.params.id }).select('-__v');
  }
  
  if (!project) {
    return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  }

  // For public access, only show published projects
  if (project.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
    return next(new ApiError('Project not found', 404));
  }
  
  // Increment view count
  project.metrics.views += 1;
  await project.save();
  
  res.status(200).json({
    success: true,
    message: 'Project retrieved successfully',
    data: {
      project
    }
  });
});

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private (Admin only)
 */
export const createProject = asyncHandler(async (req, res, next) => {
  // Add user reference if needed (when user system is fully implemented)
  // req.body.createdBy = req.user.id;
  
  const project = await Project.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: {
      project
    }
  });
});

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin only)
 */
export const updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  }
  
  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: {
      project
    }
  });
});

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin only)
 */
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  }
  
  await project.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
    data: {}
  });
});

/**
 * @desc    Get featured projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
export const getFeaturedProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ 
    featured: true, 
    status: 'published' 
  })
    .sort('-createdAt')
    .limit(6)
    .select('-__v');
  
  res.status(200).json({
    success: true,
    message: 'Featured projects retrieved successfully',
    data: {
      projects
    }
  });
});

/**
 * @desc    Like/unlike a project
 * @route   POST /api/projects/:id/like
 * @access  Public
 */
export const toggleProjectLike = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  }

  if (project.status !== 'published') {
    return next(new ApiError('Project not found', 404));
  }
  
  // Simple like increment (in a real app, you'd track which users liked what)
  project.metrics.likes += 1;
  await project.save();
  
  res.status(200).json({
    success: true,
    message: 'Project liked successfully',
    data: {
      likes: project.metrics.likes
    }
  });
});

/**
 * @desc    Upload project images
 * @route   POST /api/projects/:id/images
 * @access  Private (Admin only)
 */
export const uploadProjectImages = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  }
  
  // For now, just return success message
  // In production, you would implement file upload using multer
  res.status(200).json({
    success: true,
    message: 'Image upload endpoint ready (multer implementation needed)',
    data: {
      project
    }
  });
});

/**
 * @desc    Get projects by category
 * @route   GET /api/projects/category/:category
 * @access  Public
 */
export const getProjectsByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;
  
  const validCategories = ['web-development', 'mobile-app', 'ui-ux-design', 'branding', 'ecommerce', 'other'];
  
  if (!validCategories.includes(category)) {
    return next(new ApiError('Invalid category', 400));
  }

  const query = { category, status: 'published' };
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const projects = await Project.find(query)
    .sort('-createdAt')
    .limit(parseInt(limit))
    .skip(skip)
    .select('-__v');

  const total = await Project.countDocuments(query);

  res.status(200).json({
    success: true,
    message: `Projects in category '${category}' retrieved successfully`,
    data: {
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    }
  });
});

/**
 * @desc    Get project statistics (Admin only)
 * @route   GET /api/projects/stats
 * @access  Private (Admin only)
 */
export const getProjectStats = asyncHandler(async (req, res, next) => {
  const totalProjects = await Project.countDocuments();
  const publishedProjects = await Project.countDocuments({ status: 'published' });
  const featuredProjects = await Project.countDocuments({ featured: true });
  
  const categoryStats = await Project.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    }
  ]);

  const statusStats = await Project.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    message: 'Project statistics retrieved successfully',
    data: {
      totalProjects,
      publishedProjects,
      featuredProjects,
      categoryStats,
      statusStats
    }
  });
});