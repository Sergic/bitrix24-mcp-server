# Bitrix24 MCP Server Authentication Fix Guide

## Problem Diagnosis
Your Bitrix24 MCP server is deployed on Azure but is returning HTTP 401 Unauthorized errors because the environment variables (specifically `BITRIX24_WEBHOOK_URL`) are not configured in the Azure App Service.

## Current Configuration
- **Local .env file**: Contains `BITRIX24_WEBHOOK_URL=https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/`
- **Azure deployment**: Missing environment variables
- **MCP proxy**: Correctly pointing to `bitrix24-mcp-server.azurewebsites.net`

## Solution 1: Configure Azure App Service Environment Variables (Recommended)

### Step 1: Via Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your App Service: `bitrix24-mcp-server`
3. Go to **Settings** → **Configuration**
4. Under **Application settings**, click **+ New application setting**
5. Add the following settings:

| Name | Value |
|------|-------|
| `BITRIX24_WEBHOOK_URL` | `https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/` |
| `NODE_ENV` | `production` |
| `LOG_LEVEL` | `info` |

6. Click **Save** and **Continue**
7. Restart your App Service

### Step 2: Via Azure CLI (Alternative)
```bash
# Set the environment variables
az webapp config appsettings set --resource-group <your-resource-group> --name bitrix24-mcp-server --settings BITRIX24_WEBHOOK_URL="https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/" NODE_ENV="production" LOG_LEVEL="info"

# Restart the app
az webapp restart --resource-group <your-resource-group> --name bitrix24-mcp-server
```

## Solution 2: Update GitHub Actions for Automatic Deployment

Update your GitHub Actions workflow to include environment variables:

```yaml
# Add this to your .github/workflows/azure-deploy.yml
- name: Set App Settings
  uses: azure/appservice-settings@v1
  with:
    app-name: 'bitrix24-mcp-server'
    app-settings-json: |
      [
        {
          "name": "BITRIX24_WEBHOOK_URL",
          "value": "${{ secrets.BITRIX24_WEBHOOK_URL }}",
          "slotSetting": false
        },
        {
          "name": "NODE_ENV",
          "value": "production",
          "slotSetting": false
        },
        {
          "name": "LOG_LEVEL",
          "value": "info",
          "slotSetting": false
        }
      ]
```

Then add the secret to your GitHub repository:
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add repository secret: `BITRIX24_WEBHOOK_URL` with value `https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/`

## Solution 3: Test the Fix

After configuring the environment variables, test the connection:

### Test 1: Direct API Test
```bash
curl -X POST https://bitrix24-mcp-server.azurewebsites.net/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "bitrix24_validate_webhook",
      "arguments": {}
    },
    "id": 1
  }'
```

### Test 2: Health Check
```bash
curl https://bitrix24-mcp-server.azurewebsites.net/health
```

## Solution 4: Verify Bitrix24 Webhook

Ensure your Bitrix24 webhook is still active:

1. Log into your Bitrix24 account: `https://sviluppofranchising.bitrix24.it`
2. Go to **Applications** → **Webhooks**
3. Check if the webhook with code `wwugdez6m774803q` is active
4. Verify it has the necessary permissions:
   - CRM (crm)
   - Leads (crm.lead)
   - Contacts (crm.contact)
   - Deals (crm.deal)
   - Companies (crm.company)

## Solution 5: Alternative Local Testing

If you want to test locally while Azure is being fixed:

```bash
# In your project directory
npm run build
node build/index.js
```

Then update your Claude config temporarily:
```json
{
  "mcpServers": {
    "bitrix24-local": {
      "command": "node",
      "args": ["C:/Dev/bitrix24/build/index.js"],
      "env": {
        "BITRIX24_WEBHOOK_URL": "https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/"
      }
    }
  }
}
```

## Troubleshooting

### If you still get 401 errors:
1. Check if the webhook URL is correct and active in Bitrix24
2. Verify the webhook has sufficient permissions
3. Check Azure App Service logs for detailed error messages
4. Ensure the environment variables are properly set in Azure

### Check Azure Logs:
```bash
az webapp log tail --resource-group <your-resource-group> --name bitrix24-mcp-server
```

### Common Issues:
- **Webhook expired**: Regenerate the webhook in Bitrix24
- **Insufficient permissions**: Update webhook permissions in Bitrix24
- **Environment variables not loaded**: Restart Azure App Service after setting variables
- **Build issues**: Ensure the TypeScript is compiled to JavaScript in the build folder

## Next Steps

1. **Immediate**: Configure environment variables in Azure (Solution 1)
2. **Short-term**: Update GitHub Actions for automated deployments (Solution 2)
3. **Long-term**: Set up monitoring and alerting for the MCP server

After implementing Solution 1, your MCP server should work correctly and you'll be able to retrieve leads from your Bitrix24 CRM.
