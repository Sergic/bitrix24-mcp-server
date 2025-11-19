#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Test configuration
const BITRIX24_WEBHOOK_URL = 'https://sviluppofranchising.bitrix24.it/rest/906/huvok17bty3v0kj8/';
const AZURE_SERVER_URL = 'https://bitrix24-mcp-server.azurewebsites.net';

console.log('🔍 Testing Bitrix24 MCP Server Authentication...\n');

// Test 1: Direct Bitrix24 webhook test
async function testBitrix24Webhook() {
  console.log('1️⃣ Testing direct Bitrix24 webhook connection...');
  
  return new Promise((resolve) => {
    const url = new URL(BITRIX24_WEBHOOK_URL + 'app.info');
    
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
            console.log('   ❌ Bitrix24 webhook error:', result.error);
            resolve(false);
          } else {
            console.log('   ✅ Bitrix24 webhook is working');
            console.log('   📋 App info:', result.result?.app_name || 'Available');
            resolve(true);
          }
        } catch (error) {
          console.log('   ❌ Failed to parse Bitrix24 response:', error.message);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('   ❌ Bitrix24 connection error:', error.message);
      resolve(false);
    });

    req.setTimeout(10000, () => {
      console.log('   ❌ Bitrix24 request timeout');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Test 2: Azure server health check
async function testAzureHealth() {
  console.log('\n2️⃣ Testing Azure server health...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'bitrix24-mcp-server.azurewebsites.net',
      port: 443,
      path: '/health',
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
          console.log('   ✅ Azure server is running');
          console.log('   📋 Status:', result.status);
          console.log('   ⏱️ Uptime:', Math.round(result.uptime), 'seconds');
          resolve(true);
        } catch (error) {
          console.log('   ❌ Failed to parse Azure health response:', error.message);
          console.log('   📄 Raw response:', data);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('   ❌ Azure server connection error:', error.message);
      resolve(false);
    });

    req.setTimeout(10000, () => {
      console.log('   ❌ Azure server request timeout');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Test 3: MCP webhook validation through Azure
async function testMCPValidation() {
  console.log('\n3️⃣ Testing MCP webhook validation through Azure...');
  
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: "bitrix24_validate_webhook",
        arguments: {}
      },
      id: 1
    });

    const options = {
      hostname: 'bitrix24-mcp-server.azurewebsites.net',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
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
            console.log('   ❌ MCP validation failed:', result.error.message);
            if (result.error.message.includes('401') || result.error.message.includes('Unauthorized')) {
              console.log('   🔧 This confirms the authentication issue - environment variables are missing in Azure');
            }
            resolve(false);
          } else {
            console.log('   ✅ MCP webhook validation successful');
            console.log('   📋 Result:', result.result);
            resolve(true);
          }
        } catch (error) {
          console.log('   ❌ Failed to parse MCP response:', error.message);
          console.log('   📄 Raw response:', data);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('   ❌ MCP validation connection error:', error.message);
      resolve(false);
    });

    req.setTimeout(15000, () => {
      console.log('   ❌ MCP validation request timeout');
      req.destroy();
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

// Test 4: Try to get leads through Azure
async function testGetLeads() {
  console.log('\n4️⃣ Testing lead retrieval through Azure...');
  
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: "bitrix24_get_latest_leads",
        arguments: { limit: 5 }
      },
      id: 2
    });

    const options = {
      hostname: 'bitrix24-mcp-server.azurewebsites.net',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
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
            console.log('   ❌ Lead retrieval failed:', result.error.message);
            resolve(false);
          } else {
            console.log('   ✅ Lead retrieval successful');
            const leads = JSON.parse(result.result.content[0].text);
            console.log('   📊 Retrieved', leads.leads?.length || 0, 'leads');
            resolve(true);
          }
        } catch (error) {
          console.log('   ❌ Failed to parse leads response:', error.message);
          console.log('   📄 Raw response:', data.substring(0, 200) + '...');
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('   ❌ Lead retrieval connection error:', error.message);
      resolve(false);
    });

    req.setTimeout(15000, () => {
      console.log('   ❌ Lead retrieval request timeout');
      req.destroy();
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

// Run all tests
async function runAllTests() {
  console.log('Starting comprehensive authentication tests...\n');
  
  const bitrixOk = await testBitrix24Webhook();
  const azureOk = await testAzureHealth();
  const mcpOk = await testMCPValidation();
  const leadsOk = await testGetLeads();
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`Bitrix24 Webhook: ${bitrixOk ? '✅ Working' : '❌ Failed'}`);
  console.log(`Azure Server: ${azureOk ? '✅ Working' : '❌ Failed'}`);
  console.log(`MCP Validation: ${mcpOk ? '✅ Working' : '❌ Failed'}`);
  console.log(`Lead Retrieval: ${leadsOk ? '✅ Working' : '❌ Failed'}`);
  
  console.log('\n🔧 Recommended Actions:');
  console.log('=======================');
  
  if (!bitrixOk) {
    console.log('❗ Check your Bitrix24 webhook URL and permissions');
  }
  
  if (!azureOk) {
    console.log('❗ Azure server may be down or misconfigured');
  }
  
  if (bitrixOk && azureOk && !mcpOk) {
    console.log('❗ Environment variables are missing in Azure App Service');
    console.log('   → Follow the AUTHENTICATION_FIX_GUIDE.md to configure them');
  }
  
  if (mcpOk && !leadsOk) {
    console.log('❗ Webhook validation works but lead access fails');
    console.log('   → Check Bitrix24 webhook permissions for CRM access');
  }
  
  if (bitrixOk && azureOk && mcpOk && leadsOk) {
    console.log('🎉 Everything is working correctly!');
  }
  
  console.log('\n📖 For detailed fix instructions, see: AUTHENTICATION_FIX_GUIDE.md');
}

// Run the tests
runAllTests().catch(console.error);
