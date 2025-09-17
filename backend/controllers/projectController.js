import Project from '../models/Project.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * Project Controller
 * Handles project portfolio operations - CRUD operations for showcasing work
 * TODO: Implement all project management functionality
 */

/**
 * @desc    Get all projects with filtering, sorting, and pagination
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = asyncHandler(async (req, res, next) => {
  // TODO: Implement get all projects logic
  // const { category, featured, status, page, limit, sort } = req.query;
  
  // Build query object
  // let query = {};
  
  // Add filters
  // if (category) query.category = category;
  // if (featured) query.featured = featured === 'true';
  // if (status) query.status = status;
  
  // Execute query with pagination and sorting
  // const projects = await Project.find(query)
  //   .sort(sort || '-createdAt')
  //   .limit(limit * 1 || 10)
  //   .skip((page - 1) * limit || 0)
  //   .populate('createdBy', 'name email');
  
  res.status(200).json({
    success: true,
    message: 'Get all projects endpoint - TODO: Implement logic',
    data: {
      // projects: projects,
      // pagination: { ... }
    }
  });
});

/**
 * @desc    Get single project by ID or slug
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProject = asyncHandler(async (req, res, next) => {
  // TODO: Implement get single project logic
  // let project;
  
  // Check if param is ObjectId or slug
  // if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   project = await Project.findById(req.params.id).populate('createdBy', 'name email');
  // } else {
  //   project = await Project.findOne({ 'seo.slug': req.params.id }).populate('createdBy', 'name email');
  // }
  
  // if (!project) {
  //   return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  // }
  
  // Increment view count
  // project.metrics.views += 1;
  // await project.save();
  
  res.status(200).json({
    success: true,
    message: 'Get single project endpoint - TODO: Implement logic',
    data: {
      // project: project
    }
  });
});

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private (Admin only)
 */
export const createProject = asyncHandler(async (req, res, next) => {
  // TODO: Implement create project logic
  // Add user to req.body
  // req.body.createdBy = req.user.id;
  
  // const project = await Project.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Create project endpoint - TODO: Implement logic',
    data: {
      // project: project
    }
  });
});

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin only)
 */
export const updateProject = asyncHandler(async (req, res, next) => {
  // TODO: Implement update project logic
  // let project = await Project.findById(req.params.id);
  
  // if (!project) {
  //   return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  // }
  
  // project = await Project.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true
  // });
  
  res.status(200).json({
    success: true,
    message: 'Update project endpoint - TODO: Implement logic',
    data: {
      // project: project
    }
  });
});

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin only)
 */
export const deleteProject = asyncHandler(async (req, res, next) => {
  // TODO: Implement delete project logic
  // const project = await Project.findById(req.params.id);
  
  // if (!project) {
  //   return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  // }
  
  // await project.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Delete project endpoint - TODO: Implement logic',
    data: {}
  });
});

/**
 * @desc    Get featured projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
export const getFeaturedProjects = asyncHandler(async (req, res, next) => {
  // TODO: Implement get featured projects logic
  // const projects = await Project.find({ featured: true, status: 'published' })
  //   .sort('-createdAt')
  //   .limit(6)
  //   .populate('createdBy', 'name email');
  
  res.status(200).json({
    success: true,
    message: 'Get featured projects endpoint - TODO: Implement logic',
    data: {
      // projects: projects
    }
  });
});

/**
 * @desc    Like/unlike a project
 * @route   POST /api/projects/:id/like
 * @access  Public
 */
export const toggleProjectLike = asyncHandler(async (req, res, next) => {
  // TODO: Implement like/unlike project logic
  // const project = await Project.findById(req.params.id);
  
  // if (!project) {
  //   return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  // }
  
  // Toggle like count (in real app, you'd track which users liked what)
  // project.metrics.likes += 1;
  // await project.save();
  
  res.status(200).json({
    success: true,
    message: 'Toggle project like endpoint - TODO: Implement logic',
    data: {
      // likes: project.metrics.likes
    }
  });
});

/**
 * @desc    Upload project images
 * @route   POST /api/projects/:id/images
 * @access  Private (Admin only)
 */
export const uploadProjectImages = asyncHandler(async (req, res, next) => {
  // TODO: Implement image upload logic
  // const project = await Project.findById(req.params.id);
  
  // if (!project) {
  //   return next(new ApiError(`Project not found with id of ${req.params.id}`, 404));
  // }
  
  // Handle file upload (use multer middleware)
  // Process and resize images
  // Update project with image URLs
  
  res.status(200).json({
    success: true,
    message: 'Upload project images endpoint - TODO: Implement logic',
    data: {
      // images: uploadedImages
    }
  });
});