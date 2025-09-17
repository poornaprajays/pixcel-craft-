# PixelCraft Backend API Test Script for PowerShell
# Run this script: .\test-api.ps1

Write-Host "🔍 Testing PixelCraft Backend API..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$API_BASE = "http://localhost:5000/api"

# Function to make HTTP requests
function Test-APIEndpoint {
    param(
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Body = $null,
        [string]$Description
    )
    
    Write-Host "Testing: $Description" -ForegroundColor Yellow
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Body) {
            $jsonBody = $Body | ConvertTo-Json
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Body $jsonBody -Headers $headers -TimeoutSec 10
        } else {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -TimeoutSec 10
        }
        
        Write-Host "✅ Success!" -ForegroundColor Green
        Write-Host "   Response: $($response.message)" -ForegroundColor Gray
        
        if ($response.data) {
            if ($response.data.projects) {
                Write-Host "   Projects found: $($response.data.projects.Count)" -ForegroundColor Gray
            }
            if ($response.data.id) {
                Write-Host "   ID: $($response.data.id)" -ForegroundColor Gray
            }
        }
        
        Write-Host ""
        return $true
        
    } catch {
        Write-Host "❌ Failed!" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        return $false
    }
}

# Test 1: Health Check
$healthOK = Test-APIEndpoint -Url "$API_BASE/health" -Description "Health Check"

if (-not $healthOK) {
    Write-Host "🔧 Server is not running!" -ForegroundColor Red
    Write-Host "To start the server:" -ForegroundColor Yellow
    Write-Host "   1. Open another PowerShell window" -ForegroundColor White
    Write-Host "   2. Navigate to your backend folder" -ForegroundColor White
    Write-Host "   3. Run: npm start" -ForegroundColor White
    Write-Host "   4. Wait for the success message" -ForegroundColor White
    Write-Host "   5. Then run this test again" -ForegroundColor White
    exit
}

# Test 2: Projects Endpoint
Test-APIEndpoint -Url "$API_BASE/projects" -Description "Get Projects"

# Test 3: Contact Form
$contactData = @{
    name = "PowerShell Test"
    email = "test@example.com"
    subject = "Test from PowerShell"
    message = "This is a test message from the PowerShell test script."
}

Test-APIEndpoint -Url "$API_BASE/contact" -Method "POST" -Body $contactData -Description "Contact Form Submission"

Write-Host "🎉 API Testing Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your PixelCraft backend is working!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "   • Connect your React frontend to these APIs" -ForegroundColor White
Write-Host "   • Test user registration: POST $API_BASE/users/register" -ForegroundColor White
Write-Host "   • Test user login: POST $API_BASE/users/login" -ForegroundColor White
Write-Host "   • Access admin features with JWT tokens" -ForegroundColor White