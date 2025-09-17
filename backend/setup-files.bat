@echo off
echo ===============================================
echo 📁 PixelCraft Backend Setup Files
echo ===============================================
echo.

echo Checking if you have all required files...
echo.

REM Check if essential directories exist
if not exist config mkdir config
if not exist controllers mkdir controllers
if not exist middleware mkdir middleware
if not exist models mkdir models
if not exist routes mkdir routes

echo ✅ Directory structure created

REM Check if package.json has correct dependencies
echo.
echo 📦 Checking package.json dependencies...

findstr /C:"express-validator" package.json >nul
if %errorlevel% neq 0 (
    echo ⚠️  express-validator not found in package.json
    echo Installing express-validator...
    npm install express-validator
) else (
    echo ✅ express-validator found
)

findstr /C:"bcryptjs" package.json >nul
if %errorlevel% neq 0 (
    echo ⚠️  bcryptjs not found in package.json  
    echo Installing bcryptjs...
    npm install bcryptjs
) else (
    echo ✅ bcryptjs found
)

findstr /C:"jsonwebtoken" package.json >nul
if %errorlevel% neq 0 (
    echo ⚠️  jsonwebtoken not found in package.json
    echo Installing jsonwebtoken...
    npm install jsonwebtoken
) else (
    echo ✅ jsonwebtoken found
)

echo.
echo 🔍 Checking essential files...

REM List files that should exist
set "ESSENTIAL_FILES=.env config\db.js middleware\auth.js middleware\errorHandler.js middleware\validation.js models\User.js models\Project.js models\Contact.js controllers\userController.js controllers\projectController.js controllers\contactController.js routes\userRoutes.js routes\projectRoutes.js routes\contactRoutes.js"

for %%f in (%ESSENTIAL_FILES%) do (
    if exist "%%f" (
        echo ✅ %%f
    ) else (
        echo ❌ %%f - MISSING
    )
)

echo.
echo ===============================================
echo 📋 File Status Summary
echo ===============================================
echo.

if exist .env (
    echo ✅ Environment configuration ready
) else (
    echo ❌ .env file missing - server will not start!
    echo.
    echo Creating basic .env file...
    echo PORT=5000 > .env
    echo NODE_ENV=development >> .env
    echo MONGO_URI=mongodb+srv://prajayswork_db_user:kSYzUXmOy05FdcN9@pixcelcraftdb.whmftoq.mongodb.net/?retryWrites=true^&w=majority^&appName=pixcelcraftDB >> .env
    echo JWT_SECRET=pixelcraftsecret123 >> .env
    echo JWT_EXPIRE=7d >> .env
    echo CLIENT_URL=http://localhost:3000 >> .env
    echo ✅ Basic .env file created
)

if exist server.js (
    echo ✅ Main server file ready
) else (
    echo ❌ server.js missing
)

if exist node_modules (
    echo ✅ Dependencies installed
) else (
    echo ⚠️  node_modules missing - run 'npm install'
)

echo.
echo 🚀 Ready to start server?
echo.
echo Next steps:
echo   1. npm install (if not done already)
echo   2. npm start
echo   3. Open browser to http://localhost:5000/api/health
echo   4. Run 'node test-complete.js' to test all endpoints
echo.
echo ===============================================

pause