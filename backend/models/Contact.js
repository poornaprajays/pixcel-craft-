import mongoose from 'mongoose';

/**
 * Contact Model Schema
 * For handling contact form submissions and inquiries
 * TODO: Add email notification integration
 * TODO: Add spam detection and rate limiting
 */
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
    maxlength: [200, 'Subject cannot be more than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  projectType: {
    type: String,
    enum: [
      'web-development',
      'mobile-app',
      'ui-ux-design',
      'branding',
      'ecommerce',
      'digital-marketing',
      'consultation',
      'other'
    ]
  },
  budget: {
    type: String,
    enum: [
      'under-5k',
      '5k-10k',
      '10k-25k',
      '25k-50k',
      'over-50k',
      'not-specified'
    ],
    default: 'not-specified'
  },
  timeline: {
    type: String,
    enum: [
      'asap',
      '1-month',
      '2-3-months',
      '3-6-months',
      'flexible',
      'not-specified'
    ],
    default: 'not-specified'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'responded', 'closed', 'spam'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social-media', 'google', 'other'],
    default: 'website'
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String
  },
  notes: {
    internal: [{
      note: String,
      addedBy: String, // TODO: Reference to User model
      addedAt: {
        type: Date,
        default: Date.now
      }
    }],
    client: [{
      note: String,
      addedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  // TODO: Add follow-up system
  followUp: {
    scheduled: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  },
  // TODO: Add email thread tracking
  // emailThread: [{
  //   messageId: String,
  //   direction: { type: String, enum: ['inbound', 'outbound'] },
  //   sentAt: Date,
  //   subject: String,
  //   body: String
  // }]
}, {
  timestamps: true
});

// TODO: Add indexes for better query performance
// contactSchema.index({ status: 1, priority: -1 });
// contactSchema.index({ email: 1 });
// contactSchema.index({ createdAt: -1 });

// TODO: Add pre-save middleware for data processing
// contactSchema.pre('save', function(next) {
//   // Auto-assign priority based on budget and timeline
//   if (this.budget === 'over-50k' || this.timeline === 'asap') {
//     this.priority = 'high';
//   }
//   next();
// });

// TODO: Add method to send email notifications
// contactSchema.methods.sendNotification = async function() {
//   // Email notification logic
// };

// TODO: Add virtual for response time tracking
// contactSchema.virtual('responseTime').get(function() {
//   if (this.status === 'responded') {
//     // Calculate time between creation and first response
//   }
// });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;