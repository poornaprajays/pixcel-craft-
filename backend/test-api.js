/**
 * Simple API Test Script
 * Run this script to test the basic functionality of your PixelCraft backend
 * 
 * Usage: node test-api.js
 */

const API_BASE = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'John Doe',
  email: 'john@test.com',
  password: 'Password123'
};

const testProject = {
  title: 'Test Project',
  description: 'This is a test project for our portfolio',
  category: 'web-development',
  technologies: ['React', 'Node.js', 'MongoDB'],
  links: {
    live: 'https://example.com',
    github: 'https://github.com/test'
  }
};

const testContact = {
  name: 'Jane Smith',
  email: 'jane@test.com',
  phone: '+1234567890',
  company: 'Test Company',
  subject: 'Inquiry about web development',
  message: 'I would like to inquire about your web development services. Please contact me.',
  projectType: 'web-development',
  budget: '10k-25k',
  timeline: '2-3-months'
};

let authToken = '';
let createdProjectId = '';
let createdContactId = '';

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const url = `${API_BASE}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🏥 Testing Health Check...');
  const result = await apiRequest('/health');
  
  if (result.success) {
    console.log('✅ Health check passed');
    console.log(`   Server: ${result.data.message}`);
  } else {
    console.log('❌ Health check failed');
    console.log(`   Error: ${result.error || result.data.message}`);
  }
}

async function testUserRegistration() {
  console.log('\n👤 Testing User Registration...');
  const result = await apiRequest('/users/register', 'POST', testUser);
  
  if (result.success) {
    console.log('✅ User registration successful');
    console.log(`   User: ${result.data.data.user.name} (${result.data.data.user.email})`);
    authToken = result.data.data.token;
  } else {
    console.log('❌ User registration failed');
    console.log(`   Error: ${result.data.message}`);
  }
}

async function testUserLogin() {
  console.log('\n🔐 Testing User Login...');
  const result = await apiRequest('/users/login', 'POST', {
    email: testUser.email,
    password: testUser.password
  });
  
  if (result.success) {
    console.log('✅ User login successful');
    console.log(`   User: ${result.data.data.user.name}`);
    authToken = result.data.data.token;
  } else {
    console.log('❌ User login failed');
    console.log(`   Error: ${result.data.message}`);
  }
}

async function testProjectCreation() {
  console.log('\n🎨 Testing Project Creation...');
  const result = await apiRequest('/projects', 'POST', testProject, authToken);
  
  if (result.success) {
    console.log('✅ Project creation successful');
    console.log(`   Project: ${result.data.data.project.title}`);
    createdProjectId = result.data.data.project._id;
  } else {
    console.log('❌ Project creation failed');
    console.log(`   Error: ${result.data.message}`);
  }
}

async function testProjectRetrieval() {
  console.log('\n📋 Testing Project Retrieval...');
  const result = await apiRequest('/projects');
  
  if (result.success) {
    console.log('✅ Projects retrieved successfully');
    console.log(`   Found ${result.data.data.projects.length} projects`);
  } else {
    console.log('❌ Project retrieval failed');
    console.log(`   Error: ${result.data.message}`);
  }
}

async function testContactSubmission() {
  console.log('\n📞 Testing Contact Form Submission...');
  const result = await apiRequest('/contact', 'POST', testContact);
  
  if (result.success) {
    console.log('✅ Contact form submission successful');
    console.log(`   Contact ID: ${result.data.data.id}`);
    createdContactId = result.data.data.id;
  } else {
    console.log('❌ Contact form submission failed');
    console.log(`   Error: ${result.data.message}`);
  }
}

async function testContactManagement() {
  console.log('\n📨 Testing Contact Management...');
  const result = await apiRequest('/contact', 'GET', null, authToken);
  
  if (result.success) {
    console.log('✅ Contact management access successful');
    console.log(`   Found ${result.data.data.contacts.length} contact submissions`);
  } else {
    console.log('❌ Contact management failed');
    console.log(`   Error: ${result.data.message}`);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting PixelCraft Backend API Tests...');
  console.log(`📡 API Base URL: ${API_BASE}`);
  
  // Test basic connectivity
  await testHealthCheck();
  
  // Test user authentication
  await testUserRegistration();
  await testUserLogin();
  
  // Test project management
  await testProjectCreation();
  await testProjectRetrieval();
  
  // Test contact system
  await testContactSubmission();
  await testContactManagement();
  
  console.log('\n🎉 All tests completed!');
  console.log('\n📝 Test Summary:');
  console.log(`   Auth Token: ${authToken ? '✅ Generated' : '❌ Not generated'}`);
  console.log(`   Project Created: ${createdProjectId ? '✅ ' + createdProjectId : '❌ Failed'}`);
  console.log(`   Contact Submitted: ${createdContactId ? '✅ ' + createdContactId : '❌ Failed'}`);
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This test requires Node.js 18+ or you can install node-fetch');
  console.log('   npm install node-fetch');
  console.log('   Then uncomment the import line below');
  // import fetch from 'node-fetch';
} else {
  runTests().catch(console.error);
}