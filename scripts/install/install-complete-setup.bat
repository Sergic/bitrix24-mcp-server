@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo  Bitrix24 MCP Server - Complete Setup
echo ========================================
echo.
echo This script will automatically install and configure everything needed:
echo - Check for Node.js installation
echo - Install project dependencies
echo - Build the TypeScript project
echo - Configure environment variables
echo - Set up Claude Desktop integration
echo - Test the installation
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [INFO] Running with administrator privileges
) else (
    echo [WARNING] Not running as administrator - some operations may fail
    echo [INFO] If you encounter permission errors, run as administrator
)

echo.
pause

:: Store current directory
set "PROJECT_DIR=%~dp0"
set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

echo.
echo ========================================
echo  Step 1: Checking Prerequisites
echo ========================================

:: Check for Node.js
echo [INFO] Checking for Node.js installation...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Recommended version: 18.x or higher
    echo.
    echo After installing Node.js:
    echo 1. Restart your computer
    echo 2. Run this script again
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [SUCCESS] Node.js found: !NODE_VERSION!
)

:: Check for npm
echo [INFO] Checking for npm...
npm --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] npm is not available
    echo Please reinstall Node.js which includes npm
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [SUCCESS] npm found: !NPM_VERSION!
)

echo.
echo ========================================
echo  Step 2: Installing Dependencies
echo ========================================

echo [INFO] Installing project dependencies...
cd /d "%PROJECT_DIR%"
call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

echo.
echo ========================================
echo  Step 3: Building the Project
echo ========================================

echo [INFO] Building TypeScript project...
call npm run build
if %errorLevel% neq 0 (
    echo [ERROR] Build failed
    echo Please check the error messages above
    pause
    exit /b 1
)
echo [SUCCESS] Project built successfully

echo.
echo ========================================
echo  Step 4: Environment Configuration
echo ========================================

:: Check if .env exists
if not exist ".env" (
    echo [INFO] Creating .env file from template...
    copy ".env.example" ".env" >nul
    echo [SUCCESS] .env file created
    echo.
    echo [IMPORTANT] You need to configure your Bitrix24 webhook URL
    echo.
    echo Please follow these steps:
    echo 1. Go to your Bitrix24 instance
    echo 2. Navigate to Applications ^> Webhooks
    echo 3. Create an Incoming webhook
    echo 4. Copy the webhook URL
    echo 5. Edit the .env file and replace the BITRIX24_WEBHOOK_URL
    echo.
    echo The .env file will now open for editing...
    timeout /t 3 >nul
    notepad ".env"
) else (
    echo [INFO] .env file already exists
    echo [INFO] Please ensure your Bitrix24 webhook URL is configured
)

echo.
echo ========================================
echo  Step 5: Claude Desktop Configuration
echo ========================================

:: Detect Claude Desktop config path
set "CLAUDE_CONFIG_DIR=%APPDATA%\Claude"
set "CLAUDE_CONFIG_FILE=%CLAUDE_CONFIG_DIR%\claude_desktop_config.json"

echo [INFO] Setting up Claude Desktop integration...
echo [INFO] Config location: %CLAUDE_CONFIG_FILE%

:: Create Claude config directory if it doesn't exist
if not exist "%CLAUDE_CONFIG_DIR%" (
    echo [INFO] Creating Claude config directory...
    mkdir "%CLAUDE_CONFIG_DIR%"
)

:: Create or update Claude Desktop config
echo [INFO] Configuring Claude Desktop MCP server...

:: Create the JSON configuration
(
echo {
echo   "mcpServers": {
echo     "bitrix24": {
echo       "command": "node",
echo       "args": ["%PROJECT_DIR%\\build\\index.js"],
echo       "env": {
echo         "BITRIX24_WEBHOOK_URL": "https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/"
echo       }
echo     }
echo   }
echo }
) > "%CLAUDE_CONFIG_FILE%"

if %errorLevel% equ 0 (
    echo [SUCCESS] Claude Desktop configuration created
    echo [INFO] Config file: %CLAUDE_CONFIG_FILE%
) else (
    echo [WARNING] Could not create Claude Desktop config automatically
    echo [INFO] Please manually add the following to: %CLAUDE_CONFIG_FILE%
    echo.
    echo {
    echo   "mcpServers": {
    echo     "bitrix24": {
    echo       "command": "node",
    echo       "args": ["%PROJECT_DIR%\\build\\index.js"],
    echo       "env": {
    echo         "BITRIX24_WEBHOOK_URL": "YOUR_WEBHOOK_URL_HERE"
    echo       }
    echo     }
    echo   }
    echo }
)

echo.
echo ========================================
echo  Step 6: Testing Installation
echo ========================================

echo [INFO] Testing the MCP server...
timeout /t 2 >nul

:: Test if the server starts
echo [INFO] Starting server test...
node build\index.js --test >nul 2>&1
if %errorLevel% equ 0 (
    echo [SUCCESS] Server starts correctly
) else (
    echo [WARNING] Server test had issues - this may be normal if webhook is not configured
)

:: Run integration test if available
if exist "test\integration.test.js" (
    echo [INFO] Running integration tests...
    call npm test
    if %errorLevel% equ 0 (
        echo [SUCCESS] Integration tests passed
    ) else (
        echo [WARNING] Integration tests failed - check your webhook configuration
    )
)

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo [SUCCESS] Bitrix24 MCP Server has been installed and configured!
echo.
echo Next steps:
echo 1. Ensure your .env file has the correct Bitrix24 webhook URL
echo 2. Restart Claude Desktop to load the MCP server
echo 3. Test the integration by asking Claude: "What Bitrix24 tools do you have?"
echo.
echo Project location: %PROJECT_DIR%
echo Claude config: %CLAUDE_CONFIG_FILE%
echo.
echo Available commands:
echo - npm start          : Start the MCP server manually
echo - npm run dev        : Development mode with auto-rebuild
echo - npm test           : Run integration tests
echo - npm run build      : Rebuild the project
echo.
echo Documentation:
echo - README.md          : Complete documentation
echo - SETUP.md           : Setup guide
echo - .env               : Environment configuration
echo.
echo Troubleshooting:
echo - Check TROUBLESHOOTING_GUIDE.md for common issues
echo - Ensure Claude Desktop is installed and restarted
echo - Verify your Bitrix24 webhook URL and permissions
echo.

:: Check if Claude Desktop is running
tasklist /FI "IMAGENAME eq Claude.exe" 2>NUL | find /I /N "Claude.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [INFO] Claude Desktop is currently running
    echo [RECOMMENDATION] Restart Claude Desktop to load the new MCP server
) else (
    echo [INFO] Claude Desktop is not currently running
    echo [INFO] Start Claude Desktop when you're ready to use the integration
)

echo.
echo ========================================
echo  Quick Test Commands
echo ========================================
echo.
echo To test the installation, you can run:
echo.
echo 1. Test server startup:
echo    node build\index.js
echo.
echo 2. Test integration:
echo    npm test
echo.
echo 3. Start development mode:
echo    npm run dev
echo.
echo Press any key to finish...
pause >nul

echo.
echo Thank you for installing Bitrix24 MCP Server!
echo For support, check the documentation or GitHub issues.
echo.
