# PowerShell script to update Azure App Service environment variables
# Run this script to update your Azure deployment with the new webhook URL

Write-Host "🔧 Updating Azure App Service Environment Variables" -ForegroundColor Cyan
Write-Host ""

$resourceGroup = "bitrix24-mcp-rg"  # Update this if your resource group name is different
$appName = "bitrix24-mcp-server"
$newWebhookUrl = "https://sviluppofranchising.bitrix24.it/rest/906/huvok17bty3v0kj8/"

Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "   Resource Group: $resourceGroup"
Write-Host "   App Name: $appName"
Write-Host "   New Webhook URL: $newWebhookUrl"
Write-Host ""

# Check if Azure CLI is installed
try {
    $azVersion = az version --output json | ConvertFrom-Json
    Write-Host "✅ Azure CLI found (version: $($azVersion.'azure-cli'))" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI not found. Please install Azure CLI first." -ForegroundColor Red
    Write-Host "   Download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
}

# Check if logged in to Azure
try {
    $account = az account show --output json | ConvertFrom-Json
    Write-Host "✅ Logged in to Azure as: $($account.user.name)" -ForegroundColor Green
} catch {
    Write-Host "❌ Not logged in to Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Updating environment variables..." -ForegroundColor Cyan

# Update the environment variables
try {
    $result = az webapp config appsettings set `
        --resource-group $resourceGroup `
        --name $appName `
        --settings `
            "BITRIX24_WEBHOOK_URL=$newWebhookUrl" `
            "NODE_ENV=production" `
            "LOG_LEVEL=info" `
        --output json | ConvertFrom-Json
    
    Write-Host "✅ Environment variables updated successfully!" -ForegroundColor Green
    
    # Show the updated settings
    Write-Host ""
    Write-Host "📋 Updated settings:" -ForegroundColor Yellow
    foreach ($setting in $result) {
        if ($setting.name -eq "BITRIX24_WEBHOOK_URL") {
            Write-Host "   $($setting.name): $($setting.value)" -ForegroundColor White
        } elseif ($setting.name -in @("NODE_ENV", "LOG_LEVEL")) {
            Write-Host "   $($setting.name): $($setting.value)" -ForegroundColor White
        }
    }
    
} catch {
    Write-Host "❌ Failed to update environment variables: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Manual steps:" -ForegroundColor Yellow
    Write-Host "1. Go to Azure Portal: https://portal.azure.com"
    Write-Host "2. Navigate to your App Service: $appName"
    Write-Host "3. Go to Settings → Configuration"
    Write-Host "4. Update BITRIX24_WEBHOOK_URL to: $newWebhookUrl"
    Write-Host "5. Click Save and restart the app"
    exit 1
}

Write-Host ""
Write-Host "🔄 Restarting App Service..." -ForegroundColor Cyan

# Restart the app service
try {
    az webapp restart --resource-group $resourceGroup --name $appName --output none
    Write-Host "✅ App Service restarted successfully!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Failed to restart app service automatically. Please restart manually in Azure Portal." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "⏳ Waiting 30 seconds for the app to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "🧪 Testing the updated deployment..." -ForegroundColor Cyan

# Test the health endpoint
try {
    $healthResponse = Invoke-RestMethod -Uri "https://$appName.azurewebsites.net/health" -Method Get
    Write-Host "✅ Health check passed!" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.status)"
    Write-Host "   Uptime: $([math]::Round($healthResponse.uptime)) seconds"
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test the MCP webhook validation
try {
    $mcpRequest = @{
        jsonrpc = "2.0"
        method = "tools/call"
        params = @{
            name = "bitrix24_validate_webhook"
            arguments = @{}
        }
        id = 1
    } | ConvertTo-Json -Depth 3

    $mcpResponse = Invoke-RestMethod -Uri "https://$appName.azurewebsites.net/mcp" -Method Post -Body $mcpRequest -ContentType "application/json"
    
    $result = $mcpResponse.result.content[0].text | ConvertFrom-Json
    
    if ($result.valid) {
        Write-Host "✅ MCP webhook validation passed!" -ForegroundColor Green
        Write-Host "   Your Bitrix24 integration is now working on Azure!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MCP webhook validation still failing: $($result.message)" -ForegroundColor Yellow
        Write-Host "   The environment variables may need a few more minutes to take effect." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ MCP test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Azure update process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Wait a few minutes for changes to fully propagate"
Write-Host "2. Test your MCP server in Claude Desktop"
Write-Host "3. Run 'node test-webhook-connection.cjs' to verify everything is working"
Write-Host ""
Write-Host "💡 If you still have issues, check the Azure App Service logs:"
Write-Host "   az webapp log tail --resource-group $resourceGroup --name $appName"
