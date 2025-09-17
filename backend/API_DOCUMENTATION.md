# PixelCraft Backend API Documentation

A complete REST API for the PixelCraft creative agency website with authentication, project portfolio management, and contact form handling.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or start in development mode
npm run dev
```

The server will start on `http://localhost:5000`

## 📋 API Endpoints Overview

### Base URL
```
http://localhost:5000/api
```

### Response Format
All API responses follow this standard format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {
    // Response data
  }
}
```

## 🔐 Authentication

### Register New User
**POST** `/api/users/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "64f7b1234567890123456789",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User
**POST** `/api/users/login`

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Get Current User Profile
**GET** `/api/users/me`
- **Headers:** `Authorization: Bearer <token>`

### Update User Profile
**PUT** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

### Update Password
**PUT** `/api/users/updatepassword`
- **Headers:** `Authorization: Bearer <token>`

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456"
}
```

### Logout
**GET** `/api/users/logout`
- **Headers:** `Authorization: Bearer <token>`

---

## 🎨 Project Management

### Get All Projects
**GET** `/api/projects`

**Query Parameters:**
- `category`: Filter by category (`web-development`, `mobile-app`, `ui-ux-design`, `branding`, `ecommerce`, `other`)
- `featured`: Filter by featured status (`true`, `false`)
- `status`: Filter by status (`published`, `draft`, `archived`)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (default: `-createdAt`)

**Example:**
```
GET /api/projects?category=web-development&featured=true&page=1&limit=5
```

### Get Featured Projects
**GET** `/api/projects/featured`

Returns up to 6 featured projects that are published.

### Get Single Project
**GET** `/api/projects/:id`

Get project by ID or slug.

### Get Projects by Category
**GET** `/api/projects/category/:category`

**Example:**
```
GET /api/projects/category/web-development?page=1&limit=10
```

### Like a Project
**POST** `/api/projects/:id/like`

Increment the like count for a project.

### Create New Project (Admin Only)
**POST** `/api/projects`
- **Headers:** `Authorization: Bearer <admin-token>`

```json
{
  "title": "E-commerce Website",
  "description": "Modern e-commerce platform built with React and Node.js",
  "fullDescription": "A comprehensive e-commerce solution...",
  "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
  "category": "web-development",
  "featured": true,
  "links": {
    "live": "https://example-ecommerce.com",
    "github": "https://github.com/user/project"
  },
  "client": {
    "name": "ABC Company",
    "testimonial": "Excellent work!"
  }
}
```

### Update Project (Admin Only)
**PUT** `/api/projects/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

### Delete Project (Admin Only)
**DELETE** `/api/projects/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

### Get Project Statistics (Admin Only)
**GET** `/api/projects/admin/stats`
- **Headers:** `Authorization: Bearer <admin-token>`

---

## 📞 Contact Management

### Submit Contact Form
**POST** `/api/contact`

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Tech Startup",
  "subject": "Website Development Inquiry",
  "message": "I would like to discuss a new website project...",
  "projectType": "web-development",
  "budget": "10k-25k",
  "timeline": "2-3-months"
}
```

**Required Fields:** `name`, `email`, `subject`, `message`

**Optional Fields:**
- `phone`: Phone number
- `company`: Company name
- `projectType`: `web-development`, `mobile-app`, `ui-ux-design`, `branding`, `ecommerce`, `digital-marketing`, `consultation`, `other`
- `budget`: `under-5k`, `5k-10k`, `10k-25k`, `25k-50k`, `over-50k`, `not-specified`
- `timeline`: `asap`, `1-month`, `2-3-months`, `3-6-months`, `flexible`, `not-specified`

### Get All Contact Submissions (Admin Only)
**GET** `/api/contact`
- **Headers:** `Authorization: Bearer <admin-token>`

**Query Parameters:**
- `status`: Filter by status (`new`, `in-progress`, `responded`, `closed`, `spam`)
- `priority`: Filter by priority (`low`, `medium`, `high`, `urgent`)
- `projectType`: Filter by project type
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `sort`: Sort field (default: `-createdAt`)

### Get Single Contact Submission (Admin Only)
**GET** `/api/contact/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

### Update Contact Status (Admin Only)
**PUT** `/api/contact/:id/status`
- **Headers:** `Authorization: Bearer <admin-token>`

```json
{
  "status": "in-progress",
  "priority": "high",
  "internalNote": "High-value client, prioritize response"
}
```

### Add Note to Contact (Admin Only)
**POST** `/api/contact/:id/notes`
- **Headers:** `Authorization: Bearer <admin-token>`

```json
{
  "note": "Called client, meeting scheduled for tomorrow",
  "type": "internal"
}
```

- `type`: `internal` (admin only) or `client` (visible to client)

### Schedule Follow-up (Admin Only)
**POST** `/api/contact/:id/followup`
- **Headers:** `Authorization: Bearer <admin-token>`

```json
{
  "scheduledDate": "2024-01-20T14:00:00.000Z"
}
```

### Complete Follow-up (Admin Only)
**PUT** `/api/contact/:id/followup/complete`
- **Headers:** `Authorization: Bearer <admin-token>`

### Get Contact Statistics (Admin Only)
**GET** `/api/contact/stats`
- **Headers:** `Authorization: Bearer <admin-token>`

### Delete Contact Submission (Admin Only)
**DELETE** `/api/contact/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

---

## 🔧 System Endpoints

### Health Check
**GET** `/api/health`

Returns server status and basic information.

---

## 🛡️ Security & Validation

### Password Requirements
- Minimum 6 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

### Rate Limiting
- 100 requests per 15 minutes per IP address
- Applied to all `/api/` routes

### Input Validation
All endpoints include comprehensive input validation:
- Email format validation
- Required field validation
- String length limits
- Enum validation for select fields
- MongoDB ObjectId validation

### Error Responses
```json
{
  "success": false,
  "message": "Validation failed: Email is required, Password must be at least 6 characters",
  "errors": [
    {
      "field": "email",
      "message": "Email is required",
      "value": ""
    }
  ]
}
```

---

## 📱 Frontend Integration Examples

### JavaScript/React Authentication
```javascript
// Register user
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Store token in localStorage
    localStorage.setItem('token', data.data.token);
    return data.data.user;
  } else {
    throw new Error(data.message);
  }
};

// Make authenticated request
const getProfile = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:5000/api/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return await response.json();
};
```

### Submit Contact Form
```javascript
const submitContactForm = async (formData) => {
  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  return await response.json();
};
```

---

## 🧪 Testing

### Manual Testing
Use the included test script:
```bash
node test-api.js
```

### API Testing Tools
You can use tools like:
- **Postman** - Import the endpoints and test manually
- **Insomnia** - REST API client
- **curl** - Command line testing

### Example curl Commands
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","password":"Password123"}'

# Login user
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Password123"}'

# Get projects
curl http://localhost:5000/api/projects

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@test.com","subject":"Test","message":"This is a test message"}'
```

---

## 🚨 Common Error Codes

- **400 Bad Request** - Invalid input or validation errors
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Insufficient permissions (e.g., non-admin trying to access admin route)
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server-side error

---

## 🔄 Next Steps

1. **Set up your frontend** to consume these APIs
2. **Test all endpoints** with your actual data
3. **Configure email services** for contact form notifications
4. **Add file upload** functionality for project images
5. **Implement advanced features** like search, filtering, and analytics

Your PixelCraft backend is now fully functional with all core MVP features implemented! 🎉