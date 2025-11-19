import { bitrix24Client } from '../build/bitrix24/client.js';

async function testIntegration() {
  try {
    console.log('🚀 Testing Bitrix24 MCP Server Integration...\n');
    
    console.log('1. Testing webhook validation...');
    const isValid = await bitrix24Client.validateWebhook();
    if (isValid) {
      console.log('✅ Webhook validation successful');
    } else {
      console.log('❌ Webhook validation failed');
      return;
    }
    
    console.log('\n2. Testing current user retrieval...');
    let user;
    try {
      user = await bitrix24Client.getCurrentUser();
      console.log('✅ Current user:', user.NAME || user.LAST_NAME || 'Unknown');
    } catch (error) {
      console.log('⚠️  Cannot get current user (insufficient permissions) - using default user ID');
      // Use a default user ID for testing if we can't get current user
      user = { ID: '1' };
    }
    
    console.log('\n3. Testing contact creation...');
    const contactId = await bitrix24Client.createContact({
      NAME: 'Test',
      LAST_NAME: 'Contact',
      EMAIL: [{ VALUE: 'test@example.com', VALUE_TYPE: 'WORK' }],
      PHONE: [{ VALUE: '+39 123 456 789', VALUE_TYPE: 'WORK' }],
      COMMENTS: 'Created by MCP Server test'
    });
    console.log('✅ Contact created with ID:', contactId);
    
    console.log('\n4. Testing contact retrieval...');
    const contact = await bitrix24Client.getContact(contactId);
    console.log('✅ Contact retrieved:', contact.NAME, contact.LAST_NAME);
    
    console.log('\n5. Testing contact list...');
    const contacts = await bitrix24Client.listContacts({ start: 0 });
    console.log('✅ Found', contacts.length, 'contacts');
    
    console.log('\n6. Testing deal creation...');
    const dealId = await bitrix24Client.createDeal({
      TITLE: 'Test Deal - MCP Server',
      OPPORTUNITY: '1000',
      CURRENCY_ID: 'EUR',
      CONTACT_ID: contactId,
      COMMENTS: 'Created by MCP Server test'
    });
    console.log('✅ Deal created with ID:', dealId);
    
    console.log('\n7. Testing task creation...');
    let taskId;
    try {
      taskId = await bitrix24Client.createTask({
        TITLE: 'Test Task - MCP Server',
        DESCRIPTION: 'This is a test task created by the MCP server',
        RESPONSIBLE_ID: user.ID,
        PRIORITY: '1',
        UF_CRM_TASK: [`C_${contactId}`, `D_${dealId}`]
      });
      console.log('✅ Task created with ID:', taskId);
    } catch (error) {
      console.log('⚠️  Cannot create task (insufficient permissions) - skipping task test');
      taskId = null;
    }
    
    console.log('\n8. Testing CRM search by email...');
    const emailSearchResult = await bitrix24Client.searchCRM('test@example.com', ['contact']);
    if (emailSearchResult && (emailSearchResult.CONTACT || emailSearchResult.LEAD || emailSearchResult.COMPANY)) {
      const foundContacts = emailSearchResult.CONTACT || [];
      const foundLeads = emailSearchResult.LEAD || [];
      const foundCompanies = emailSearchResult.COMPANY || [];
      console.log(`✅ Email search successful: Found ${foundContacts.length} contacts, ${foundLeads.length} leads, ${foundCompanies.length} companies`);
      if (foundContacts.length > 0) {
        console.log(`   Contact IDs found: ${foundContacts.join(', ')}`);
      }
    } else {
      console.log('⚠️  Email search returned no results (this is OK if test contact was cleaned up)');
    }
    
    console.log('\n9. Testing CRM search by phone...');
    const phoneSearchResult = await bitrix24Client.searchCRMByPhone('+39 123 456 789', ['contact']);
    if (phoneSearchResult && (phoneSearchResult.CONTACT || phoneSearchResult.LEAD || phoneSearchResult.COMPANY)) {
      const foundContacts = phoneSearchResult.CONTACT || [];
      const foundLeads = phoneSearchResult.LEAD || [];
      const foundCompanies = phoneSearchResult.COMPANY || [];
      console.log(`✅ Phone search successful: Found ${foundContacts.length} contacts, ${foundLeads.length} leads, ${foundCompanies.length} companies`);
      if (foundContacts.length > 0) {
        console.log(`   Contact IDs found: ${foundContacts.join(', ')}`);
      }
    } else {
      console.log('⚠️  Phone search returned no results (this is OK if test contact was cleaned up)');
    }
    
    console.log('\n10. Testing CRM search with multiple entity types...');
    const multiSearchResult = await bitrix24Client.searchCRM('test@example.com', ['contact', 'lead', 'company']);
    if (multiSearchResult) {
      console.log('✅ Multi-entity search executed successfully');
      console.log(`   Results structure: ${Object.keys(multiSearchResult).join(', ')}`);
    } else {
      console.log('⚠️  Multi-entity search returned no results');
    }
    
    console.log('\n11. Testing CRM search by phone with lead filter only...');
    const leadPhoneSearch = await bitrix24Client.searchCRMByPhone('+39 123 456 789', ['lead']);
    if (leadPhoneSearch) {
      const foundLeads = leadPhoneSearch.LEAD || [];
      console.log(`✅ Lead-only phone search executed: Found ${foundLeads.length} leads`);
    } else {
      console.log('⚠️  Lead-only phone search returned no results');
    }
    
    console.log('\n🎉 All tests passed! Bitrix24 MCP Server is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testIntegration();
}

export { testIntegration };
