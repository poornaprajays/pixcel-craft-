# PixelCraft Backend API

A modern Node.js/Express backend API for the PixelCraft creative agency website, built with ES6 modules and MongoDB.

## 🏗️ Architecture

This backend follows a clean, scalable architecture with clear separation of concerns:

```
backend/
├── config/          # Configuration files
│   └── db.js         # Database connection setup
├── controllers/      # Route logic and business logic
│   ├── userController.js
│   ├── projectController.js
│   └── contactController.js
├── middleware/       # Custom middleware functions
│   ├── auth.js       # JWT authentication middleware
│   └── errorHandler.js # Global error handling
├── models/          # MongoDB schemas and models
│   ├── User.js
│   ├── Project.js
│   └── Contact.js
├── routes/          # API route definitions
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── contactRoutes.js
├── .env             # Environment variables
├── .gitignore       # Git ignore rules
├── package.json     # Project dependencies and scripts
└── server.js        # Main application entry point
```

## 🚀 Features

- **Modern ES6+ Syntax**: Uses import/export modules
- **JWT Authentication**: Secure user authentication and authorization
- **MongoDB Integration**: Mongoose ODM for data modeling
- **Security**: Helmet, CORS, rate limiting, input validation
- **Error Handling**: Comprehensive error handling with custom error classes
- **Modular Structure**: Clean separation of routes, controllers, and middleware
- **Environment Configuration**: Flexible configuration via environment variables

## 📋 API Endpoints

### Authentication & Users
```
POST   /api/users/register      # Register new user
POST   /api/users/login         # User login
GET    /api/users/me            # Get current user
PUT    /api/users/profile       # Update user profile
PUT    /api/users/updatepassword # Update password
POST   /api/users/forgotpassword # Forgot password
PUT    /api/users/resetpassword/:token # Reset password
GET    /api/users/logout        # User logout
```

### Projects (Portfolio)
```
GET    /api/projects            # Get all projects (public)
GET    /api/projects/featured   # Get featured projects
GET    /api/projects/:id        # Get single project
POST   /api/projects/:id/like   # Like/unlike project
POST   /api/projects            # Create project (admin)
PUT    /api/projects/:id        # Update project (admin)
DELETE /api/projects/:id        # Delete project (admin)
POST   /api/projects/:id/images # Upload project images (admin)
```

### Contact Management
```
POST   /api/contact             # Submit contact form (public)
GET    /api/contact             # Get all submissions (admin)
GET    /api/contact/stats       # Get contact statistics (admin)
GET    /api/contact/:id         # Get single submission (admin)
PUT    /api/contact/:id/status  # Update submission status (admin)
POST   /api/contact/:id/notes   # Add notes to submission (admin)
POST   /api/contact/:id/followup # Schedule follow-up (admin)
DELETE /api/contact/:id         # Delete submission (admin)
```

### System
```
GET    /api/health              # Health check endpoint
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js >= 18.0.0
- MongoDB database
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Copy `.env` and update the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/pixelcraft
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Or start production server**
   ```bash
   npm start
   ```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Secure error responses (no sensitive data leakage)

## 📝 Development Status

This is a foundational setup with placeholder implementations. Each controller and route contains TODO comments indicating what needs to be implemented:

### ✅ Completed
- [x] Project structure and architecture
- [x] Environment configuration
- [x] Database connection setup
- [x] Middleware structure
- [x] Route definitions
- [x] Model schemas
- [x] Error handling framework

### 🔄 TODO (Implementation Required)
- [ ] User registration and authentication logic
- [ ] Project CRUD operations
- [ ] Contact form processing
- [ ] Image upload handling
- [ ] Email integration
- [ ] Admin dashboard functionality
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
- [ ] Logging system
- [ ] Monitoring and analytics

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:coverage
```

## 📊 Monitoring

The server includes basic health check endpoint at `/api/health`. For production, consider adding:
- Application monitoring (New Relic, DataDog)
- Log aggregation (Winston, ELK stack)
- Error tracking (Sentry)
- Performance monitoring

## 🚀 Deployment

This backend is ready for deployment to platforms like:
- **Heroku**: Simple deployment with Procfile
- **Railway**: Modern deployment platform
- **DigitalOcean App Platform**: Easy scaling
- **AWS/Azure/GCP**: Full cloud deployment

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement the functionality
4. Add tests
5. Submit a pull request

---

**Note**: This is a foundational backend structure. All controller methods contain placeholder implementations and need to be completed based on your specific requirements.