/**
 * Windows-Compatible Test Script
 * Tests your PixelCraft backend API endpoints
 * 
 * Run this from PowerShell: node test-windows.js
 */

import https from 'https';
import http from 'http';

const API_BASE = 'http://localhost:5000';

// Simple HTTP request function for Node.js (no fetch dependency)
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = protocol.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 300,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            success: false,
            data: { message: data }
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        status: 0,
        success: false,
        error: error.message
      });
    });

    // Send request body if provided
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Test functions
async function testServer() {
  console.log('🔍 Testing PixelCraft Backend Server...\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResult = await makeRequest(`${API_BASE}/api/health`);
    
    if (healthResult.success) {
      console.log('✅ Server is running!');
      console.log(`   Message: ${healthResult.data.message}`);
      console.log(`   Environment: ${healthResult.data.environment}`);
      console.log(`   Timestamp: ${healthResult.data.timestamp}\n`);
    } else {
      console.log('❌ Health check failed');
      console.log(`   Status: ${healthResult.status}`);
      console.log(`   Error: ${healthResult.data.message}\n`);
      return;
    }

    // Test 2: Get Projects (should work even without data)
    console.log('2️⃣ Testing Projects Endpoint...');
    const projectsResult = await makeRequest(`${API_BASE}/api/projects`);
    
    if (projectsResult.success) {
      console.log('✅ Projects endpoint working!');
      console.log(`   Found: ${projectsResult.data.data?.projects?.length || 0} projects\n`);
    } else {
      console.log('❌ Projects endpoint failed');
      console.log(`   Status: ${projectsResult.status}`);
      console.log(`   Error: ${projectsResult.data.message}\n`);
    }

    // Test 3: Test a simple POST (contact form)
    console.log('3️⃣ Testing Contact Form...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the Windows test script.'
    };

    const contactResult = await makeRequest(`${API_BASE}/api/contact`, {
      method: 'POST',
      body: contactData
    });

    if (contactResult.success) {
      console.log('✅ Contact form working!');
      console.log(`   Contact ID: ${contactResult.data.data?.id}\n`);
    } else {
      console.log('❌ Contact form failed');
      console.log(`   Status: ${contactResult.status}`);
      console.log(`   Error: ${contactResult.data.message}\n`);
    }

    console.log('🎉 Backend testing completed!\n');
    console.log('📋 Summary:');
    console.log(`   Server Status: ${healthResult.success ? '✅ Running' : '❌ Down'}`);
    console.log(`   Projects API: ${projectsResult.success ? '✅ Working' : '❌ Failed'}`);
    console.log(`   Contact API: ${contactResult.success ? '✅ Working' : '❌ Failed'}`);
    
  } catch (error) {
    console.log('❌ Failed to connect to server');
    console.log('🔧 Make sure your server is running with: npm start');
    console.log(`   Error: ${error.error || error.message}`);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Run "npm start" in another terminal');
    console.log('   2. Wait for "PixelCraft Backend Server" message');
    console.log('   3. Then run this test again');
  }
}

// Run the test
testServer().catch(console.error);
