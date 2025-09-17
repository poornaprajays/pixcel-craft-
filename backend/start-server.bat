@echo off
echo ===============================================
echo 🚀 Starting PixelCraft Backend Server
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

REM Check if package.json exists
if not exist package.json (
    echo ❌ package.json not found
    echo Make sure you're in the correct directory
    pause
    exit /b 1
)

echo ✅ package.json found

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo ✅ Dependencies ready

REM Check if .env exists
if not exist .env (
    echo ⚠️  .env file not found, creating one...
    echo PORT=5000 > .env
    echo NODE_ENV=development >> .env
    echo MONGO_URI=mongodb+srv://prajayswork_db_user:kSYzUXmOy05FdcN9@pixcelcraftdb.whmftoq.mongodb.net/?retryWrites=true^&w=majority^&appName=pixcelcraftDB >> .env
    echo JWT_SECRET=pixelcraftsecret123 >> .env
    echo JWT_EXPIRE=7d >> .env
    echo ✅ .env file created
)

echo.
echo 🚀 Starting server...
echo.
echo ===============================================
echo Server will start at: http://localhost:5000
echo Health check: http://localhost:5000/api/health
echo ===============================================
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
npm start