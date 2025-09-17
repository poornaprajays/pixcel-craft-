import mongoose from 'mongoose';

/**
 * Project Model Schema
 * For showcasing portfolio projects on the website
 */
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  fullDescription: {
    type: String,
    maxlength: [2000, 'Full description cannot be more than 2000 characters']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Please specify a project category'],
    enum: [
      'web-development',
      'mobile-app',
      'ui-ux-design',
      'branding',
      'ecommerce',
      'other'
    ]
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: {
    thumbnail: {
      type: String,
      default: null
    },
    gallery: [{
      url: String,
      alt: String,
      caption: String
    }]
  },
  links: {
    live: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    },
    github: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    },
    behance: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    }
  },
  client: {
    name: String,
    company: String,
    testimonial: String
  },
  timeline: {
    startDate: Date,
    endDate: Date,
    duration: String
  },
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
projectSchema.pre('save', function(next) {
  if (!this.seo.slug && this.title) {
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Add indexes for better query performance
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ 'seo.slug': 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
