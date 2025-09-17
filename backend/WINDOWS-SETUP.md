# 🪟 Windows Setup Guide for PixelCraft Backend

## 🔧 Fixing Your Current Error

The error you're seeing:
```
curl curl http://localhost:5000/api/health
```

**Problems:**
1. ❌ You typed "curl curl" (duplicate)  
2. ❌ Server might not be running
3. ❌ Windows PowerShell curl syntax differences

## 🚀 Quick Fix - Step by Step

### Step 1: Open PowerShell as Administrator
```powershell
# Right-click PowerShell → "Run as Administrator"
```

### Step 2: Navigate to Your Backend Folder
```powershell
cd "C:\Users\poorn\OneDrive\Desktop\pixcel craft\backend"
```

### Step 3: Check if You Have Node.js
```powershell
node --version
npm --version
```
*Should show version numbers. If not, install Node.js from https://nodejs.org*

### Step 4: Install Dependencies (if needed)
```powershell
npm install
```

### Step 5: Start Your Server
```powershell
npm start
```

**Wait for this message:**
```
🚀 PixelCraft Backend Server
🌍 Server: http://localhost:5000
```

### Step 6: Test Your API (NEW TERMINAL WINDOW)
Open a **NEW** PowerShell window and run:

```powershell
# Option 1: Use correct curl syntax
curl http://localhost:5000/api/health

# Option 2: Use PowerShell native command
Invoke-WebRequest -Uri http://localhost:5000/api/health

# Option 3: Use short alias
iwr http://localhost:5000/api/health
```

## 🎯 Even Easier - Use Our Scripts!

We've created Windows-specific scripts for you:

### Method 1: Batch File (Double-click)
```bash
# Double-click this file in Windows Explorer:
start-server.bat
```

### Method 2: PowerShell Script
```powershell
# Right-click → "Run with PowerShell":
.\test-api.ps1
```

### Method 3: Node.js Test Script
```powershell
# In your backend folder:
node test-windows.js
```

## 📋 Complete Windows Workflow

### Terminal 1 - Start Server:
```powershell
cd "C:\Users\poorn\OneDrive\Desktop\pixcel craft\backend"
npm start
```

### Terminal 2 - Test APIs:
```powershell
cd "C:\Users\poorn\OneDrive\Desktop\pixcel craft\backend"

# Test health check
curl http://localhost:5000/api/health

# Test projects
curl http://localhost:5000/api/projects

# Run comprehensive test
node test-windows.js
```

## 🔍 Troubleshooting Common Windows Issues

### Issue 1: "curl is not recognized"
**Solution:** Use PowerShell's built-in command:
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/health
```

### Issue 2: "Cannot find module"
**Solution:** Install dependencies:
```powershell
npm install
```

### Issue 3: "Port 5000 already in use"
**Solution:** Kill the process or use a different port:
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Or use different port
$env:PORT=5001
npm start
```

### Issue 4: "Permission denied"
**Solution:** Run PowerShell as Administrator:
```powershell
# Right-click PowerShell → "Run as Administrator"
```

### Issue 5: MongoDB connection issues
**Solution:** Check your .env file:
```env
MONGO_URI=mongodb+srv://prajayswork_db_user:kSYzUXmOy05FdcN9@pixcelcraftdb.whmftoq.mongodb.net/?retryWrites=true&w=majority&appName=pixcelcraftDB
```

## 🎯 PowerShell Commands Cheat Sheet

```powershell
# Navigate to directory
cd "C:\Users\poorn\OneDrive\Desktop\pixcel craft\backend"

# List files
dir
ls  # (if you have Git Bash)

# Start server
npm start

# Test API endpoints
curl http://localhost:5000/api/health
curl http://localhost:5000/api/projects
Invoke-WebRequest -Uri http://localhost:5000/api/health

# POST request (contact form)
$body = @{
    name = "Test User"
    email = "test@example.com" 
    subject = "Test"
    message = "Test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/contact -Method POST -Body $body -ContentType "application/json"
```

## 🚨 If Nothing Works - Fresh Start

1. **Delete node_modules folder**
```powershell
Remove-Item -Recurse -Force node_modules
```

2. **Reinstall everything**
```powershell
npm install
```

3. **Start fresh**
```powershell
npm start
```

4. **Test with our script**
```powershell
node test-windows.js
```

## 🎉 Success Signs

You'll know it's working when you see:

```json
{
  "success": true,
  "message": "PixelCraft API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

## 📞 Still Having Issues?

Run this diagnostic command and share the output:

```powershell
Write-Host "=== PIXELCRAFT DIAGNOSTIC ==="
Write-Host "Node Version: $(node --version)"
Write-Host "NPM Version: $(npm --version)"
Write-Host "Current Directory: $(Get-Location)"
Write-Host "Files in directory:"
dir
Write-Host "Port 5000 status:"
netstat -ano | findstr :5000
Write-Host "============================="
```

Your backend is complete and ready - these Windows-specific steps will get you up and running! 🚀