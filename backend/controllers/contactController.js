import Contact from '../models/Contact.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * Contact Controller
 * Handles contact form submissions and inquiry management
 */

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactForm = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    company,
    subject,
    message,
    projectType,
    budget,
    timeline
  } = req.body;
  
  // Add metadata from request
  const metadata = {
    ipAddress: req.ip || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    referrer: req.headers.referer || req.headers.referrer,
    // Extract UTM parameters if present
    utmSource: req.query.utm_source,
    utmMedium: req.query.utm_medium,
    utmCampaign: req.query.utm_campaign
  };
  
  // Create contact entry
  const contact = await Contact.create({
    name,
    email,
    phone,
    company,
    subject,
    message,
    projectType,
    budget,
    timeline,
    metadata
  });
  
  // In a real application, you would:
  // 1. Send notification email to admin
  // 2. Send acknowledgment email to user
  // 3. Potentially integrate with CRM or other services
  
  console.log('New contact form submission:', {
    id: contact._id,
    name: contact.name,
    email: contact.email,
    subject: contact.subject
  });
  
  res.status(201).json({
    success: true,
    message: 'Contact form submitted successfully. We will get back to you soon!',
    data: {
      id: contact._id,
      submittedAt: contact.createdAt
    }
  });
});

/**
 * @desc    Get all contact submissions with filtering and pagination
 * @route   GET /api/contact
 * @access  Private (Admin only)
 */
export const getContactSubmissions = asyncHandler(async (req, res, next) => {
  const { 
    status, 
    priority, 
    projectType,
    page = 1, 
    limit = 20, 
    sort = '-createdAt' 
  } = req.query;
  
  // Build query
  let query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (projectType) query.projectType = projectType;
  
  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Execute query with pagination
  const contacts = await Contact.find(query)
    .sort(sort)
    .limit(parseInt(limit))
    .skip(skip)
    .select('-metadata -__v'); // Exclude metadata from list view for cleaner response

  const total = await Contact.countDocuments(query);
  
  res.status(200).json({
    success: true,
    message: 'Contact submissions retrieved successfully',
    data: {
      contacts,
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
 * @desc    Get single contact submission
 * @route   GET /api/contact/:id
 * @access  Private (Admin only)
 */
export const getContactSubmission = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return next(new ApiError(`Contact submission not found with id of ${req.params.id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    message: 'Contact submission retrieved successfully',
    data: {
      contact
    }
  });
});

/**
 * @desc    Update contact submission status
 * @route   PUT /api/contact/:id/status
 * @access  Private (Admin only)
 */
export const updateContactStatus = asyncHandler(async (req, res, next) => {
  const { status, priority, internalNote } = req.body;
  
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return next(new ApiError(`Contact submission not found with id of ${req.params.id}`, 404));
  }
  
  // Update fields
  if (status) contact.status = status;
  if (priority) contact.priority = priority;
  
  // Add internal note if provided
  if (internalNote) {
    contact.notes.internal.push({
      note: internalNote,
      addedBy: req.user?.name || 'Admin',
      addedAt: new Date()
    });
  }
  
  await contact.save();
  
  res.status(200).json({
    success: true,
    message: 'Contact submission updated successfully',
    data: {
      contact
    }
  });
});

/**
 * @desc    Add note to contact submission
 * @route   POST /api/contact/:id/notes
 * @access  Private (Admin only)
 */
export const addContactNote = asyncHandler(async (req, res, next) => {
  const { note, type = 'internal' } = req.body;
  
  if (!note || note.trim().length === 0) {
    return next(new ApiError('Note content is required', 400));
  }
  
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return next(new ApiError(`Contact submission not found with id of ${req.params.id}`, 404));
  }
  
  const noteObj = {
    note: note.trim(),
    addedAt: new Date()
  };
  
  if (type === 'internal') {
    noteObj.addedBy = req.user?.name || 'Admin';
    contact.notes.internal.push(noteObj);
  } else if (type === 'client') {
    contact.notes.client.push(noteObj);
  } else {
    return next(new ApiError('Invalid note type. Must be "internal" or "client"', 400));
  }
  
  await contact.save();
  
  res.status(201).json({
    success: true,
    message: 'Note added successfully',
    data: {
      note: noteObj
    }
  });
});

/**
 * @desc    Delete contact submission
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin only)
 */
export const deleteContactSubmission = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return next(new ApiError(`Contact submission not found with id of ${req.params.id}`, 404));
  }
  
  await contact.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Contact submission deleted successfully',
    data: {}
  });
});

/**
 * @desc    Get contact statistics
 * @route   GET /api/contact/stats
 * @access  Private (Admin only)
 */
export const getContactStats = asyncHandler(async (req, res, next) => {
  // Get status breakdown
  const statusStats = await Contact.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get priority breakdown
  const priorityStats = await Contact.aggregate([
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get project type breakdown
  const projectTypeStats = await Contact.aggregate([
    {
      $group: {
        _id: '$projectType',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get budget breakdown
  const budgetStats = await Contact.aggregate([
    {
      $group: {
        _id: '$budget',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const totalContacts = await Contact.countDocuments();
  
  // Contacts from last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentContacts = await Contact.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });

  // Contacts from this month
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const thisMonthContacts = await Contact.countDocuments({
    createdAt: { $gte: startOfMonth }
  });
  
  res.status(200).json({
    success: true,
    message: 'Contact statistics retrieved successfully',
    data: {
      totalContacts,
      recentContacts,
      thisMonthContacts,
      statusStats,
      priorityStats,
      projectTypeStats,
      budgetStats
    }
  });
});

/**
 * @desc    Schedule follow-up for contact
 * @route   POST /api/contact/:id/followup
 * @access  Private (Admin only)
 */
export const scheduleFollowUp = asyncHandler(async (req, res, next) => {
  const { scheduledDate } = req.body;
  
  if (!scheduledDate) {
    return next(new ApiError('Scheduled date is required', 400));
  }
  
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return next(new ApiError(`Contact submission not found with id of ${req.params.id}`, 404));
  }
  
  contact.followUp.scheduled = new Date(scheduledDate);
  contact.followUp.completed = false;
  await contact.save();
  
  // In a real application, you would schedule a reminder/notification here
  
  res.status(200).json({
    success: true,
    message: 'Follow-up scheduled successfully',
    data: {
      followUp: contact.followUp
    }
  });
});

/**
 * @desc    Mark follow-up as completed
 * @route   PUT /api/contact/:id/followup/complete
 * @access  Private (Admin only)
 */
export const completeFollowUp = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return next(new ApiError(`Contact submission not found with id of ${req.params.id}`, 404));
  }
  
  contact.followUp.completed = true;
  contact.followUp.completedAt = new Date();
  await contact.save();
  
  res.status(200).json({
    success: true,
    message: 'Follow-up marked as completed',
    data: {
      followUp: contact.followUp
    }
  });
});