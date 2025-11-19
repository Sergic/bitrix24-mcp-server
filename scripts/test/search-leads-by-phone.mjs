const BITRIX24_WEBHOOK_URL = process.env.BITRIX24_WEBHOOK_URL || 
  'https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/';

async function searchLeadsByPhone(phone) {
  try {
    const baseUrl = BITRIX24_WEBHOOK_URL.replace(/\/$/, '');
    const url = `${baseUrl}/crm.duplicate.findbycomm`;
    
    const body = new URLSearchParams();
    body.append('type', 'PHONE');
    body.append('values[0]', phone);
    
    console.log(`Searching for leads with phone: ${phone}`);
    console.log(`URL: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Bitrix24 API Error: ${data.error.error} - ${data.error.error_description}`);
    }

    console.log('\nSearch results:', JSON.stringify(data.result, null, 2));
    
    // Extract lead IDs
    const leadIds = data.result?.LEAD || [];
    
    if (leadIds.length === 0) {
      console.log(`\n❌ No leads found with phone number ${phone}`);
      return [];
    }
    
    console.log(`\n✅ Found ${leadIds.length} lead(s) with phone ${phone}`);
    
    // Get full lead details
    const leads = [];
    for (const leadId of leadIds) {
      try {
        // Add delay to respect rate limit
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const leadUrl = `${baseUrl}/crm.lead.get`;
        const leadBody = new URLSearchParams();
        leadBody.append('id', leadId);
        
        const leadResponse = await fetch(leadUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
          body: leadBody.toString(),
        });

        if (leadResponse.ok) {
          const leadData = await leadResponse.json();
          if (leadData.result) {
            const lead = leadData.result;
            leads.push(lead);
            
            console.log(`\n📋 Lead ID: ${lead.ID}`);
            console.log(`   Title: ${lead.TITLE || 'N/A'}`);
            console.log(`   Name: ${lead.NAME || ''} ${lead.LAST_NAME || ''}`.trim() || 'N/A');
            console.log(`   Company: ${lead.COMPANY_TITLE || 'N/A'}`);
            console.log(`   Phone: ${JSON.stringify(lead.PHONE || [])}`);
            console.log(`   Email: ${JSON.stringify(lead.EMAIL || [])}`);
            console.log(`   Status: ${lead.STATUS_ID || 'N/A'}`);
            console.log(`   Source: ${lead.SOURCE_ID || 'N/A'}`);
            console.log(`   Created: ${lead.DATE_CREATE || 'N/A'}`);
            console.log(`   Modified: ${lead.DATE_MODIFY || 'N/A'}`);
            if (lead.COMMENTS) {
              console.log(`   Comments: ${lead.COMMENTS}`);
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching lead ${leadId}:`, error.message);
      }
    }
    
    return leads;
  } catch (error) {
    console.error('❌ Error searching leads:', error.message);
    throw error;
  }
}

const phone = process.argv[2] || '+380971518745';
console.log(`\n🔍 Searching for leads with phone: ${phone}\n`);

searchLeadsByPhone(phone)
  .then(leads => {
    console.log(`\n✅ Total leads found: ${leads.length}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Search failed:', error.message);
    process.exit(1);
  });
