import { bitrix24Client } from './build/bitrix24/client.js';

console.log('🔍 Testing Bitrix24 webhook connection...');
console.log('Webhook URL:', process.env.BITRIX24_WEBHOOK_URL || 'https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/');

async function testWebhook() {
  try {
    console.log('\n1. Testing contact list endpoint (requires CRM permissions)...');
    const contacts = await bitrix24Client.listContacts({ start: 0 });
    console.log('✅ Success! Found', contacts.length, 'contacts');
    
    console.log('\n2. Testing webhook validation...');
    const isValid = await bitrix24Client.validateWebhook();
    console.log('✅ Webhook validation:', isValid);
    
    if (isValid) {
      console.log('\n3. Testing contact creation...');
      const contactId = await bitrix24Client.createContact({
        NAME: 'Test',
        LAST_NAME: 'MCP Server',
        COMMENTS: 'Created by MCP Server test'
      });
      console.log('✅ Contact created with ID:', contactId);
    }
    
  } catch (error) {
    console.error('❌ Error details:');
    console.error('Message:', error.message);
    console.error('Full error:', error);
    
    // Check if it's a specific HTTP error
    if (error.message.includes('400')) {
      console.log('\n🔧 HTTP 400 suggests the request format is incorrect.');
    } else if (error.message.includes('401')) {
      console.log('\n🔧 HTTP 401 suggests insufficient permissions.');
      console.log('The webhook needs the following permissions:');
      console.log('- CRM (crm) - for contacts, deals, companies');
      console.log('- Tasks (task) - for task management');
      console.log('- User (user) - for user information');
    }
  }
}

testWebhook();
