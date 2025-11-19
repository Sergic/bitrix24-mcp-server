#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const readline = require('readline');

console.log('🔧 Bitrix24 Webhook Permission Fix Tool\n');

// Current webhook URL from .env
const currentWebhookUrl = 'https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/';

async function testWebhookUrl(webhookUrl) {
  return new Promise((resolve) => {
    const url = new URL(webhookUrl + 'app.info');
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            resolve({ success: false, error: result.error });
          } else {
            resolve({ success: true, data: result.result });
          }
        } catch (error) {
          resolve({ success: false, error: 'Invalid JSON response' });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ success: false, error: error.message });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ success: false, error: 'Request timeout' });
    });

    req.end();
  });
}

async function testCRMPermissions(webhookUrl) {
  console.log('🔍 Testing CRM permissions...');
  
  const tests = [
    { name: 'Leads', endpoint: 'crm.lead.list?start=0' },
    { name: 'Contacts', endpoint: 'crm.contact.list?start=0' },
    { name: 'Deals', endpoint: 'crm.deal.list?start=0' },
    { name: 'Companies', endpoint: 'crm.company.list?start=0' }
  ];

  const results = {};

  for (const test of tests) {
    const result = await testWebhookUrl(webhookUrl + test.endpoint);
    results[test.name] = result.success;
    console.log(`   ${result.success ? '✅' : '❌'} ${test.name}: ${result.success ? 'OK' : result.error}`);
  }

  return results;
}

async function updateLocalEnv(newWebhookUrl) {
  const envContent = `BITRIX24_WEBHOOK_URL=${newWebhookUrl}
NODE_ENV=development
LOG_LEVEL=info`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ Updated local .env file');
}

async function updateAzureConfig(newWebhookUrl) {
  console.log('\n🔧 To update Azure App Service environment variables:');
  console.log('1. Go to Azure Portal: https://portal.azure.com');
  console.log('2. Navigate to your App Service: bitrix24-mcp-server');
  console.log('3. Go to Settings → Configuration');
  console.log('4. Update the BITRIX24_WEBHOOK_URL setting to:');
  console.log(`   ${newWebhookUrl}`);
  console.log('5. Click Save and restart the app service');
  
  console.log('\n💡 Or use Azure CLI:');
  console.log(`az webapp config appsettings set \\`);
  console.log(`  --resource-group <your-resource-group> \\`);
  console.log(`  --name bitrix24-mcp-server \\`);
  console.log(`  --settings BITRIX24_WEBHOOK_URL="${newWebhookUrl}"`);
}

async function main() {
  console.log('1️⃣ Testing current webhook URL...');
  const currentTest = await testWebhookUrl(currentWebhookUrl);
  
  if (currentTest.success) {
    console.log('✅ Current webhook is working!');
    console.log('📋 App info:', currentTest.data?.app_name || 'Available');
    
    // Test permissions
    await testCRMPermissions(currentWebhookUrl);
    
    console.log('\n🎉 Your webhook is working! The issue might be with Azure configuration.');
    console.log('💡 Try updating Azure environment variables with the current webhook URL.');
    await updateAzureConfig(currentWebhookUrl);
    return;
  }

  console.log('❌ Current webhook failed:', currentTest.error);
  
  if (currentTest.error === 'INVALID_CREDENTIALS') {
    console.log('\n🔧 Your webhook has expired or been deactivated.');
    console.log('📋 Steps to fix:');
    console.log('1. Log into Bitrix24: https://sviluppofranchising.bitrix24.it');
    console.log('2. Go to Applications → Webhooks');
    console.log('3. Create a new webhook or reactivate the existing one');
    console.log('4. Ensure it has these permissions:');
    console.log('   - CRM (crm)');
    console.log('   - Leads (crm.lead)');
    console.log('   - Contacts (crm.contact)');
    console.log('   - Deals (crm.deal)');
    console.log('   - Companies (crm.company)');
    console.log('5. Copy the new webhook URL');
    
    // Ask for new webhook URL
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('\n🔗 Enter your new webhook URL (or press Enter to skip): ', async (newUrl) => {
      rl.close();
      
      if (newUrl.trim()) {
        console.log('\n2️⃣ Testing new webhook URL...');
        const newTest = await testWebhookUrl(newUrl.trim());
        
        if (newTest.success) {
          console.log('✅ New webhook is working!');
          
          // Test permissions
          const permissions = await testCRMPermissions(newUrl.trim());
          
          const allPermissionsOk = Object.values(permissions).every(p => p);
          
          if (allPermissionsOk) {
            console.log('\n🎉 All permissions are working!');
            
            // Update local .env
            await updateLocalEnv(newUrl.trim());
            
            // Show Azure update instructions
            await updateAzureConfig(newUrl.trim());
            
            console.log('\n✅ Next steps:');
            console.log('1. Update Azure environment variables (see instructions above)');
            console.log('2. Test again: node test-webhook-connection.cjs');
            
          } else {
            console.log('\n⚠️  Some permissions are missing. Please check webhook permissions in Bitrix24.');
          }
          
        } else {
          console.log('❌ New webhook also failed:', newTest.error);
          console.log('💡 Please check the webhook URL and try again.');
        }
      } else {
        console.log('\n💡 Please get a new webhook URL from Bitrix24 and run this script again.');
      }
    });
  }
}

main().catch(console.error);
