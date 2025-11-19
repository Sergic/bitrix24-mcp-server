# 🚀 Complete Bitrix24 API Guide for Business Users
## All Available Functions with Examples

This comprehensive guide shows you every function available in your Bitrix24 integration with practical examples. Simply use natural language with Claude Desktop to perform any of these operations!

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Contact Management (5 Functions)](#contact-management)
3. [Deal Management (8 Functions)](#deal-management)
4. [Lead Management (6 Functions)](#lead-management)
5. [Company Management (6 Functions)](#company-management)
6. [Advanced Deal Filtering (5 Functions)](#advanced-deal-filtering)
7. [Search & Utilities (4 Functions)](#search--utilities)
8. [System Diagnostics (3 Functions)](#system-diagnostics)
9. [Real-World Business Scenarios](#real-world-business-scenarios)
10. [API Reference Quick Guide](#api-reference-quick-guide)

---

## 🎯 Quick Start

### What You Can Do
Your Bitrix24 integration provides **37 different functions** across 8 categories:
- **Contact Management**: Create, view, update, and list contacts
- **Deal Management**: Full deal lifecycle management with advanced filtering
- **Lead Management**: Lead creation, tracking, and conversion
- **Company Management**: Corporate account management
- **Advanced Deal Filtering**: Pipeline, budget, and status-based filtering
- **Search & Utilities**: Cross-CRM search capabilities
- **System Diagnostics**: Connection testing and troubleshooting

### How to Use This Guide
Each function below shows:
- ✅ **What you can ask Claude**
- 📝 **Required vs Optional parameters**
- 💡 **Practical examples**
- 📊 **Expected results**

---

## 👥 Contact Management (5 Functions)

### 1. Create Contact (`bitrix24_create_contact`)

**What you can ask:**
- "Create a new contact for John Smith with email john@company.com and phone +1234567890"
- "Add a contact: Sarah Wilson, TechCorp, Manager, sarah@techcorp.com"
- "Create contact: Mike Brown, phone +9876543210, company ABC Ltd"

**Required Parameters:**
- ✅ **First Name** (name)
- ✅ **Last Name** (lastName)

**Optional Parameters:**
- 📝 Phone, Email, Company, Position, Comments

**Example Request:**
```
Create a contact for Maria Garcia, email maria@business.com, phone +34123456789, 
company "Digital Solutions", position "Sales Director", 
comments "Met at trade show, interested in our premium package"
```

**Expected Result:**
```
✅ Contact created with ID: 789
- Name: Maria Garcia
- Email: maria@business.com
- Phone: +34123456789
- Company: Digital Solutions
- Position: Sales Director
```

---

### 2. Get Contact Details (`bitrix24_get_contact`)

**What you can ask:**
- "Show me contact details for ID 123"
- "Get information about contact #456"
- "Display contact 789"

**Required Parameters:**
- ✅ **Contact ID**

**Example Request:**
```
Get contact details for ID 456
```

**Expected Result:**
```
Contact #456:
- Name: John Smith
- Email: john@company.com
- Phone: +1234567890
- Company: TechStart Inc
- Position: CEO
- Created: 2025-03-15
- Last Modified: 2025-03-20
```

---

### 3. List Contacts with Filters (`bitrix24_list_contacts`)

**What you can ask:**
- "List all contacts with company name containing 'Tech'"
- "Show me 30 contacts with the last name 'Johnson'"
- "Get contacts where email contains '@gmail.com'"

**Optional Parameters:**
- 📝 Limit (default: 20)
- 📝 Filter criteria

**Example Request:**
```
List 25 contacts where the company name contains "Solutions"
```

**Expected Result:**
```
Found 25 contacts:
1. Maria Garcia - Digital Solutions - maria@business.com
2. David Chen - Tech Solutions Ltd - david@techsolutions.com
3. Sarah Wilson - Creative Solutions - sarah@creative.com
...
```

---

### 4. Get Latest Contacts (`bitrix24_get_latest_contacts`)

**What you can ask:**
- "Show me the latest 15 contacts"
- "Get the most recent 5 contacts created"
- "List the newest 30 contacts"

**Optional Parameters:**
- 📝 Limit (default: 20)

**Example Request:**
```
Show me the latest 10 contacts
```

**Expected Result:**
```
Latest 10 Contacts (newest first):
1. Anna Rodriguez (ID: 892) - anna@startup.com - Created: 2025-07-02 ⭐ Most Recent
2. Peter Kim (ID: 891) - peter@innovation.com - Created: 2025-07-01
3. Lisa Thompson (ID: 890) - lisa@consulting.com - Created: 2025-06-30
...
```

---

### 5. Update Contact (`bitrix24_update_contact`)

**What you can ask:**
- "Update contact #123 to change email to newemail@company.com"
- "Change contact 456 phone number to +9999999999"
- "Update contact #789: add company 'New Corp', position 'Director'"

**Required Parameters:**
- ✅ **Contact ID**

**Optional Parameters:**
- 📝 Name, Last Name, Phone, Email, Company, Position, Comments

**Example Request:**
```
Update contact #456: change email to john.smith@newcompany.com, 
add phone +1555123456, update company to "Innovation Labs"
```

**Expected Result:**
```
✅ Contact #456 updated successfully
Updated fields:
- Email: john.smith@newcompany.com
- Phone: +1555123456
- Company: Innovation Labs
```

---

## 💼 Deal Management (8 Functions)

### 1. Create Deal (`bitrix24_create_deal`)

**What you can ask:**
- "Create a deal: 'Website Development Project', amount €15000, currency EUR"
- "Add a deal for contact #123: 'Software License', €8500"
- "Create deal: 'Consulting Services', €12000, stage 'NEGOTIATION'"

**Required Parameters:**
- ✅ **Title**

**Optional Parameters:**
- 📝 Amount, Currency (default: EUR), Contact ID, Stage ID, Comments

**Example Request:**
```
Create a deal: "Mobile App Development", amount €25000, currency EUR, 
contact ID 456, comments "3-month project, includes iOS and Android apps"
```

**Expected Result:**
```
✅ Deal created with ID: 234
- Title: Mobile App Development
- Amount: €25,000
- Currency: EUR
- Contact: #456
- Status: New
```

---

### 2. Get Deal Details (`bitrix24_get_deal`)

**What you can ask:**
- "Show me deal details for ID 234"
- "Get information about deal #567"
- "Display deal 890"

**Required Parameters:**
- ✅ **Deal ID**

**Example Request:**
```
Show me deal details for ID 234
```

**Expected Result:**
```
Deal #234:
- Title: Mobile App Development
- Amount: €25,000
- Currency: EUR
- Stage: NEGOTIATION
- Contact: John Smith (#456)
- Created: 2025-06-15
- Expected Close: 2025-09-15
- Comments: 3-month project, includes iOS and Android apps
```

---

### 3. List Deals with Advanced Options (`bitrix24_list_deals`)

**What you can ask:**
- "List 30 deals ordered by amount descending"
- "Show deals with title containing 'Project' ordered by creation date"
- "Get deals ordered by modification date, limit 15"

**Optional Parameters:**
- 📝 Limit (default: 20)
- 📝 Filter criteria
- 📝 Order by: DATE_CREATE, DATE_MODIFY, ID, TITLE
- 📝 Order direction: ASC, DESC (default: DESC)

**Example Request:**
```
List 25 deals with title containing "Development" ordered by amount descending
```

**Expected Result:**
```
Found 25 Development Deals (by amount):
1. Enterprise Software Development - €85,000 - Stage: NEGOTIATION
2. E-commerce Platform Development - €45,000 - Stage: PROPOSAL
3. Mobile App Development - €25,000 - Stage: WON
...
```

---

### 4. Get Latest Deals (`bitrix24_get_latest_deals`)

**What you can ask:**
- "Show me the latest 20 deals"
- "Get the most recent 10 deals created"
- "List the newest 5 deals"

**Optional Parameters:**
- 📝 Limit (default: 20)

**Example Request:**
```
Show me the latest 15 deals
```

**Expected Result:**
```
Latest 15 Deals (newest first):
1. Cloud Migration Project (ID: 345) - €35,000 - Created: 2025-07-02 ⭐ Most Recent
2. Website Redesign (ID: 344) - €12,000 - Created: 2025-07-01
3. SEO Optimization (ID: 343) - €8,500 - Created: 2025-06-30
...
```

---

### 5. Get Deals from Date Range (`bitrix24_get_deals_from_date_range`)

**What you can ask:**
- "Get all deals created between January 1, 2025 and March 31, 2025"
- "Show me deals from June 2025"
- "List deals created after May 15, 2025"

**Required Parameters:**
- ✅ **Start Date** (YYYY-MM-DD format)

**Optional Parameters:**
- 📝 End Date (YYYY-MM-DD format)
- 📝 Limit (default: 50)

**Example Request:**
```
Get all deals created between 2025-06-01 and 2025-06-30, limit 30
```

**Expected Result:**
```
Found 30 deals from June 2025:
1. Q3 Marketing Campaign - €18,000 - Created: 2025-06-28
2. Database Optimization - €22,000 - Created: 2025-06-25
3. Security Audit - €15,000 - Created: 2025-06-20
...
Total Value: €485,000
```

---

### 6. Update Deal (`bitrix24_update_deal`)

**What you can ask:**
- "Update deal #234 to set amount to €30000"
- "Change deal 567 stage to 'WON'"
- "Update deal #890: add comments 'Client approved final proposal'"

**Required Parameters:**
- ✅ **Deal ID**

**Optional Parameters:**
- 📝 Title, Amount, Currency, Contact ID, Stage ID, Comments

**Example Request:**
```
Update deal #234: change amount to €30000, set stage to "WON", 
add comments "Project scope expanded, client signed contract"
```

**Expected Result:**
```
✅ Deal #234 updated successfully
Updated fields:
- Amount: €30,000 (was €25,000)
- Stage: WON (was NEGOTIATION)
- Comments: Project scope expanded, client signed contract
```

---

### 7. Get Deal Pipelines (`bitrix24_get_deal_pipelines`)

**What you can ask:**
- "Show me all deal pipelines"
- "List available deal categories"
- "Get deal pipeline information"

**No Parameters Required**

**Example Request:**
```
Show me all deal pipelines
```

**Expected Result:**
```
Available Deal Pipelines:
1. Sales Pipeline (ID: 0) - Default sales process
2. Enterprise Sales (ID: 1) - Large client deals
3. Recurring Revenue (ID: 2) - Subscription-based deals
4. Partner Channel (ID: 3) - Partner-sourced deals
```

---

### 8. Get Deal Stages (`bitrix24_get_deal_stages`)

**What you can ask:**
- "Show me all deal stages"
- "Get stages for pipeline ID 1"
- "List deal stages for Enterprise Sales pipeline"

**Optional Parameters:**
- 📝 Pipeline ID (if not provided, shows all stages)

**Example Request:**
```
Get stages for pipeline ID 1
```

**Expected Result:**
```
Deal Stages for Enterprise Sales Pipeline:
1. NEW (ID: C1:NEW) - Initial contact
2. QUALIFICATION (ID: C1:QUALIFICATION) - Needs assessment
3. PROPOSAL (ID: C1:PROPOSAL) - Proposal sent
4. NEGOTIATION (ID: C1:NEGOTIATION) - Terms discussion
5. WON (ID: C1:WON) - Deal closed successfully
6. LOST (ID: C1:LOST) - Deal lost
```

---

## 🎯 Lead Management (6 Functions)

### 1. Create Lead (`bitrix24_create_lead`)

**What you can ask:**
- "Create a lead: 'Website Inquiry', name John Doe, email john@startup.com"
- "Add a lead from contact form: Company TechStart, phone +1234567890"
- "Create lead: 'Product Demo Request', expected amount €5000"

**Required Parameters:**
- ✅ **Title**

**Optional Parameters:**
- 📝 Name, Last Name, Company, Phone, Email, Source ID, Status ID, Expected Amount, Currency, Comments

**Example Request:**
```
Create a lead: "Enterprise Software Inquiry", name "Sarah", last name "Johnson", 
company "Global Corp", email "sarah@globalcorp.com", phone "+1555987654", 
expected amount "50000", currency "EUR", source "WEB", 
comments "Interested in our enterprise package, needs demo"
```

**Expected Result:**
```
✅ Lead created with ID: 567
- Title: Enterprise Software Inquiry
- Contact: Sarah Johnson
- Company: Global Corp
- Email: sarah@globalcorp.com
- Expected Value: €50,000
- Source: WEB
- Status: NEW
```

---

### 2. Get Lead Details (`bitrix24_get_lead`)

**What you can ask:**
- "Show me lead details for ID 567"
- "Get information about lead #890"
- "Display lead 123"

**Required Parameters:**
- ✅ **Lead ID**

**Example Request:**
```
Show me lead details for ID 567
```

**Expected Result:**
```
Lead #567:
- Title: Enterprise Software Inquiry
- Contact: Sarah Johnson
- Company: Global Corp
- Email: sarah@globalcorp.com
- Phone: +1555987654
- Expected Value: €50,000
- Source: WEB
- Status: QUALIFIED
- Created: 2025-06-20
- Comments: Interested in our enterprise package, needs demo
```

---

### 3. List Leads with Filters (`bitrix24_list_leads`)

**What you can ask:**
- "List 25 leads with status 'NEW' ordered by creation date"
- "Show leads from company containing 'Tech' ordered by expected amount"
- "Get leads with source 'WEB' from the last month"

**Optional Parameters:**
- 📝 Limit (default: 20)
- 📝 Filter criteria
- 📝 Order by: DATE_CREATE, DATE_MODIFY, ID, TITLE
- 📝 Order direction: ASC, DESC (default: DESC)

**Example Request:**
```
List 20 leads with status "NEW" ordered by expected amount descending
```

**Expected Result:**
```
Found 20 NEW leads (by expected value):
1. Enterprise Integration Project - €75,000 - Global Tech Inc
2. Digital Transformation - €60,000 - Innovation Corp  
3. Cloud Migration - €45,000 - StartupXYZ
...
Total Pipeline Value: €580,000
```

---

### 4. Get Latest Leads (`bitrix24_get_latest_leads`)

**What you can ask:**
- "Show me the latest 15 leads"
- "Get the most recent 10 leads created"
- "List the newest 25 leads"

**Optional Parameters:**
- 📝 Limit (default: 20)

**Example Request:**
```
Show me the latest 12 leads
```

**Expected Result:**
```
Latest 12 Leads (newest first):
1. Mobile App Consultation (ID: 678) - TechStart - Created: 2025-07-02 ⭐ Most Recent
2. Website Redesign Inquiry (ID: 677) - Creative Agency - Created: 2025-07-01
3. SEO Services Request (ID: 676) - Local Business - Created: 2025-06-30
...
```

---

### 5. Get Leads from Date Range (`bitrix24_get_leads_from_date_range`)

**What you can ask:**
- "Get all leads created between May 1, 2025 and May 31, 2025"
- "Show me leads from this quarter"
- "List leads created after June 15, 2025"

**Required Parameters:**
- ✅ **Start Date** (YYYY-MM-DD format)

**Optional Parameters:**
- 📝 End Date (YYYY-MM-DD format)
- 📝 Limit (default: 50)

**Example Request:**
```
Get all leads created between 2025-06-01 and 2025-06-30
```

**Expected Result:**
```
Found 45 leads from June 2025:
1. E-commerce Platform - €35,000 - Created: 2025-06-29
2. Marketing Automation - €18,000 - Created: 2025-06-28
3. CRM Integration - €25,000 - Created: 2025-06-25
...
Total Expected Value: €890,000
Conversion Rate: 23% (10 converted to deals)
```

---

### 6. Update Lead (`bitrix24_update_lead`)

**What you can ask:**
- "Update lead #567 to change status to 'QUALIFIED'"
- "Change lead 890 expected amount to €75000"
- "Update lead #123: add phone +1234567890, set source to 'CALL'"

**Required Parameters:**
- ✅ **Lead ID**

**Optional Parameters:**
- 📝 Title, Name, Last Name, Company, Phone, Email, Source ID, Status ID, Expected Amount, Currency, Comments

**Example Request:**
```
Update lead #567: change status to "QUALIFIED", set expected amount to "75000", 
add comments "Had demo call, very interested, decision expected next week"
```

**Expected Result:**
```
✅ Lead #567 updated successfully
Updated fields:
- Status: QUALIFIED (was NEW)
- Expected Amount: €75,000 (was €50,000)
- Comments: Had demo call, very interested, decision expected next week
```

---

## 🏢 Company Management (6 Functions)

### 1. Create Company (`bitrix24_create_company`)

**What you can ask:**
- "Create a company: 'TechCorp Solutions', type CLIENT, industry SOFTWARE"
- "Add company: Global Innovations, 500 employees, revenue €10M"
- "Create company with website techstart.com, email info@techstart.com"

**Required Parameters:**
- ✅ **Company Name** (title)

**Optional Parameters:**
- 📝 Company Type, Industry, Phone, Email, Website, Address, Employees, Revenue, Comments, Assigned User ID

**Example Request:**
```
Create a company: "Digital Innovation Labs", type "CLIENT", industry "SOFTWARE", 
phone "+1555123456", email "contact@digilabs.com", website "digilabs.com", 
address "123 Tech Street, Silicon Valley, CA", employees "150", 
revenue "25000000", comments "Major client, enterprise software focus"
```

**Expected Result:**
```
✅ Company created with ID: 345
- Name: Digital Innovation Labs
- Type: CLIENT
- Industry: SOFTWARE
- Employees: 150
- Revenue: €25,000,000
- Website: digilabs.com
- Contact: contact@digilabs.com
```

---

### 2. Get Company Details (`bitrix24_get_company`)

**What you can ask:**
- "Show me company details for ID 345"
- "Get information about company #678"
- "Display company 901"

**Required Parameters:**
- ✅ **Company ID**

**Example Request:**
```
Show me company details for ID 345
```

**Expected Result:**
```
Company #345:
- Name: Digital Innovation Labs
- Type: CLIENT
- Industry: SOFTWARE
- Phone: +1555123456
- Email: contact@digilabs.com
- Website: digilabs.com
- Address: 123 Tech Street, Silicon Valley, CA
- Employees: 150
- Annual Revenue: €25,000,000
- Created: 2025-05-15
- Assigned to: Sales Team Lead
```

---

### 3. List Companies with Filters (`bitrix24_list_companies`)

**What you can ask:**
- "List 30 companies in the SOFTWARE industry"
- "Show companies with more than 100 employees"
- "Get CLIENT type companies ordered by revenue"

**Optional Parameters:**
- 📝 Limit (default: 20)
- 📝 Filter criteria
- 📝 Order by: DATE_CREATE, DATE_MODIFY, ID, TITLE
- 📝 Order direction: ASC, DESC (default: DESC)

**Example Request:**
```
List 25 companies with type "CLIENT" in "SOFTWARE" industry ordered by revenue descending
```

**Expected Result:**
```
Found 25 SOFTWARE CLIENT companies (by revenue):
1. Enterprise Tech Corp - €100M revenue - 2,500 employees
2. Digital Innovation Labs - €25M revenue - 150 employees
3. StartupXYZ Solutions - €15M revenue - 85 employees
...
Total Market Value: €485M
```

---

### 4. Update Company (`bitrix24_update_company`)

**What you can ask:**
- "Update company #345 to change revenue to €30000000"
- "Change company 678 phone to +1999888777"
- "Update company #901: add website newsite.com, change industry to FINTECH"

**Required Parameters:**
- ✅ **Company ID**

**Optional Parameters:**
- 📝 All company fields (same as create)

**Example Request:**
```
Update company #345: change revenue to "30000000", update employees to "200", 
add comments "Expanded operations, acquired smaller competitor"
```

**Expected Result:**
```
✅ Company #345 updated successfully
Updated fields:
- Revenue: €30,000,000 (was €25,000,000)
- Employees: 200 (was 150)
- Comments: Expanded operations, acquired smaller competitor
```

---

### 5. Get Latest Companies (`bitrix24_get_latest_companies`)

**What you can ask:**
- "Show me the latest 20 companies"
- "Get the most recent 15 companies created"
- "List the newest 10 companies"

**Optional Parameters:**
- 📝 Limit (default: 20)

**Example Request:**
```
Show me the latest 15 companies
```

**Expected Result:**
```
Latest 15 Companies (newest first):
1. AI Innovations Inc (ID: 456) - SOFTWARE - Created: 2025-07-02 ⭐ Most Recent
2. Green Energy Solutions (ID: 455) - ENERGY - Created: 2025-07-01
3. FinTech Startup (ID: 454) - FINTECH - Created: 2025-06-30
...
```

---

### 6. Get Companies from Date Range (`bitrix24_get_companies_from_date_range`)

**What you can ask:**
- "Get all companies created between April 1, 2025 and June 30, 2025"
- "Show me companies from Q2 2025"
- "List companies created after May 1, 2025"

**Required Parameters:**
- ✅ **Start Date** (YYYY-MM-DD format)

**Optional Parameters:**
- 📝 End Date (YYYY-MM-DD format)
- 📝 Limit (default: 50)

**Example Request:**
```
Get all companies created between 2025-05-01 and 2025-06-30, limit 40
```

**Expected Result:**
```
Found 40 companies from May-June 2025:
1. Blockchain Solutions Ltd - FINTECH - €50M revenue
2. IoT Devices Corp - HARDWARE - €35M revenue
3. Cloud Services Inc - SOFTWARE - €28M revenue
...
Industry Breakdown:
- SOFTWARE: 15 companies (37.5%)
- FINTECH: 8 companies (20%)
- HARDWARE: 7 companies (17.5%)
- Other: 10 companies (25%)
```

---

## 🔍 Advanced Deal Filtering (5 Functions)

### 1. Filter Deals by Pipeline (`bitrix24_filter_deals_by_pipeline`)

**What you can ask:**
- "Show me all deals in the Enterprise Sales pipeline"
- "Get deals from pipeline ID 1 ordered by amount"
- "List 30 deals in the Recurring Revenue pipeline"

**Required Parameters:**
- ✅ **Pipeline ID**

**Optional Parameters:**
- 📝 Limit (default: 50)
- 📝 Order by: DATE_CREATE, DATE_MODIFY, ID, TITLE, OPPORTUNITY
- 📝 Order direction: ASC, DESC (default: DESC)

**Example Request:**
```
Show me 25 deals in pipeline ID 1 ordered by opportunity amount descending
```

**Expected Result:**
```
Found 25 deals in Enterprise Sales Pipeline:
1. Global ERP Implementation - €150,000 - NEGOTIATION
2. Cloud Infrastructure Migration - €85,000 - PROPOSAL  
3. Security Audit & Compliance - €65,000 - QUALIFICATION
...
Total Pipeline Value: €1,250,000
Average Deal Size: €50,000
```

---

### 2. Filter Deals by Budget Range (`bitrix24_filter_deals_by_budget`)

**What you can ask:**
- "Show me deals worth between €10000 and €50000"
- "Get deals with budget over €100000 in EUR"
- "List deals worth more than $25000 in USD"

**Required Parameters:**
- ✅ **Minimum Budget**

**Optional Parameters:**
- 📝 Maximum Budget
- 📝 Currency (default: EUR)
- 📝 Limit (default: 50)
- 📝 Order by: DATE_CREATE, DATE_MODIFY, ID, TITLE, OPPORTUNITY
- 📝 Order direction: ASC, DESC (default: DESC by OPPORTUNITY)

**Example Request:**
```
Show me deals with budget between €25000 and €100000 in EUR, limit 30, ordered by creation date
```

**Expected Result:**
```
Found 30 deals with budget €25,000 - €100,000:
1. Enterprise Software License - €85,000 - Created: 2025-06-28
2. Website & Mobile App Bundle - €45,000 - Created: 2025-06-25
3. Digital Marketing Campaign - €35,000 - Created: 2025-06-20
...
Total Value: €1,680,000
Average Deal Size: €56,000
```

---

### 3. Filter Deals by Status/Stage (`bitrix24_filter_deals_by_status`)

**What you can ask:**
- "Show me deals in NEGOTIATION and PROPOSAL stages"
- "Get all WON deals from the last quarter"
- "List deals in NEW stage for pipeline ID 1"

**Required Parameters:**
- ✅ **Stage IDs** (array)

**Optional Parameters:**
- 📝 Pipeline ID (to limit to specific pipeline)
- 📝 Limit (default: 50)
- 📝 Order by: DATE_CREATE, DATE_MODIFY, ID, TITLE, OPPORTUNITY
- 📝 Order direction: ASC, DESC (default: DESC)

**Example Request:**
```
Show me deals in stages "NEGOTIATION" and "PROPOSAL" for pipeline ID 1, limit 20
```

**Expected Result:**
```
Found 20 deals in NEGOTIATION/PROPOSAL stages (Enterprise Pipeline):

NEGOTIATION (8 deals):
1. Global ERP Implementation - €150,000 - 45 days in stage
2. Cloud Migration Project - €85,000 - 12 days in stage
...

PROPOSAL (12 deals):  
1. Security Audit Package - €65,000 - 8 days in stage
2. Custom Software Development - €55,000 - 15 days in stage
...

Total Value: €1,125,000
```

---

### 4. Get Deal Pipelines (`bitrix24_get_deal_pipelines`)

**What you can ask:**
- "Show me all available deal pipelines"
- "List deal categories and their IDs"
- "Get pipeline information"

**No Parameters Required**

**Example Request:**
```
Show me all available deal pipelines
```

**Expected Result:**
```
Available Deal Pipelines:
1. Default Sales (ID: 0)
   - Description: Standard sales process
   - Active Deals: 45
   - Total Value: €850,000

2. Enterprise Sales (ID: 1)  
   - Description: Large client deals >€50K
   - Active Deals: 12
   - Total Value: €1,200,000

3. Recurring Revenue (ID: 2)
   - Description: Subscription & maintenance
   - Active Deals: 28
   - Total Value: €420,000

4. Partner Channel (ID: 3)
   - Description: Partner-sourced deals
   - Active Deals: 8
   - Total Value: €180,000
```

---

### 5. Get Deal Stages for Pipeline (`bitrix24_get_deal_stages`)

**What you can ask:**
- "Show me stages for Enterprise Sales pipeline"
- "Get all deal stages for pipeline ID 2"
- "List stages and their IDs for the default pipeline"

**Optional Parameters:**
- 📝 Pipeline ID (if not provided, shows all stages)

**Example Request:**
```
Show me stages for pipeline ID 1
```

**Expected Result:**
```
Deal Stages for Enterprise Sales Pipeline (ID: 1):

1. NEW (ID: C1:NEW)
   - Description: Initial contact made
   - Active Deals: 3 (€125,000)

2. QUALIFICATION (ID: C1:QUALIFICATION)  
   - Description: Needs assessment & budget confirmation
   - Active Deals: 4 (€280,000)

3. PROPOSAL (ID: C1:PROPOSAL)
   - Description: Formal proposal submitted
   - Active Deals: 2 (€195,000)

4. NEGOTIATION (ID: C1:NEGOTIATION)
   - Description: Terms & pricing discussion
   - Active Deals: 2 (€235,000)

5. WON (ID: C1:WON)
   - Description: Deal closed successfully
   - Closed Deals: 15 (€2,100,000 YTD)

6. LOST (ID: C1:LOST)
   - Description: Deal lost to competitor/budget
   - Lost Deals: 8 (€450,000 YTD)
```

---

## 🔍 Search & Utilities (4 Functions)

### 1. Search Across CRM (`bitrix24_search_crm`)

**What you can ask:**
- "Search for 'john@company.com' across all CRM data"
- "Find all records with phone number '+1234567890'"
- "Search for 'TechCorp' in contacts and companies only"

**Required Parameters:**
- ✅ **Search Query**

**Optional Parameters:**
- 📝 Entity Types (default: contact, company, deal, lead)

**Example Request:**
```
Search for "sarah@globalcorp.com" across all CRM entities
```

**Expected Result:**
```
Search Results for "sarah@globalcorp.com":

CONTACTS (1 match):
- Sarah Johnson (ID: 456) - Global Corp - sarah@globalcorp.com

LEADS (1 match):  
- Enterprise Software Inquiry (ID: 567) - Sarah Johnson - sarah@globalcorp.com

DEALS (2 matches):
- Enterprise Software License (ID: 234) - Contact: Sarah Johnson
- Cloud Migration Project (ID: 345) - Contact: Sarah Johnson

COMPANIES (1 match):
- Global Corp (ID: 789) - Contact: sarah@globalcorp.com
```

---

### 2. Validate Webhook Connection (`bitrix24_validate_webhook`)

**What you can ask:**
- "Check if the Bitrix24 connection is working"
- "Validate the webhook"
- "Test the API connection"

**No Parameters Required**

**Example Request:**
```
Check if the Bitrix24 connection is working
```

**Expected Result:**
```
✅ Webhook Connection Status: VALID
- Connection: Active
- Response Time: 245ms
- API Access: Full permissions
- Last Test: 2025-07-02 07:15:00
```

---

## 🛠️ System Diagnostics (3 Functions)

### 1. Diagnose Permissions (`bitrix24_diagnose_permissions`)

**What you can ask:**
- "Diagnose any permission issues"
- "Check what CRM access I have"
- "Test all API permissions"

**No Parameters Required**

**Example Request:**
```
Diagnose any permission issues
```

**Expected Result:**
```
🔍 Permission Diagnosis Results:

✅ WEBHOOK STATUS: Valid
✅ APP INFO: Accessible
✅ CRM ACCESS: Full access granted
✅ CONTACTS: Read/Write permissions
✅ DEALS: Read/Write permissions  
✅ LEADS: Read/Write permissions
✅ COMPANIES: Read/Write permissions

📊 SUMMARY:
- All core CRM functions available
- No permission restrictions detected
- API rate limits: Normal (2 req/sec)
```

---

### 2. Check CRM Settings (`bitrix24_check_crm_settings`)

**What you can ask:**
- "Check CRM settings and configuration"
- "Verify lead fields and statuses"
- "Get CRM mode information"

**No Parameters Required**

**Example Request:**
```
Check CRM settings and configuration
```

**Expected Result:**
```
🔧 CRM Configuration Status:

LEAD FIELDS: ✅ Available
- Standard fields: ID, TITLE, NAME, LAST_NAME, COMPANY_TITLE
- Contact fields: PHONE, EMAIL
- Business fields: OPPORTUNITY, CURRENCY_ID, SOURCE_ID, STATUS_ID
- System fields: DATE_CREATE, DATE_MODIFY, ASSIGNED_BY_ID

LEAD STATUSES: ✅ Configured
- NEW: New lead
- IN_PROCESS: Being processed
- PROCESSED: Processed
- JUNK: Spam/Invalid

CRM MODE: ✅ Active
- Lead processing: Enabled
- Deal conversion: Automatic
- Duplicate control: Active
```

---

### 3. Test Leads API (`bitrix24_test_leads_api`)

**What you can ask:**
- "Test the leads API functionality"
- "Check if leads are working properly"
- "Diagnose leads API issues"

**No Parameters Required**

**Example Request:**
```
Test the leads API functionality
```

**Expected Result:**
```
🧪 Leads API Test Results:

✅ BASIC LIST: Success (Retrieved 15 leads)
✅ FIELDS TEST: Success (All lead fields accessible)
✅ PARAMETERIZED LIST: Success (Filtering & sorting work)
✅ COUNT TEST: Success (Total: 156 leads in system)

📈 PERFORMANCE:
- Average response time: 180ms
- Data integrity: 100%
- No API errors detected

🎯 RECOMMENDATIONS:
- API functioning optimally
- No issues detected
- Ready for production use
```

---

## 💼 Real-World Business Scenarios

### Daily CRM Management

**Morning Pipeline Review:**
```
"Show me the latest 10 leads from yesterday"
"Get all deals in NEGOTIATION stage"
"List tasks assigned to me due today"
```

**Lead Qualification Process:**
```
"Create a lead: 'Enterprise CRM Inquiry', name John Smith, company TechCorp, 
email john@techcorp.com, expected amount €45000, source WEB"

"Update lead #567 to status QUALIFIED, add comments 'Budget confirmed, decision maker identified'"

"Create a deal from qualified lead: 'TechCorp CRM Implementation', amount €45000, contact #456"
```

**Deal Pipeline Management:**
```
"Show me all deals in Enterprise Sales pipeline worth over €50000"
"Filter deals by budget between €25000 and €100000 ordered by creation date"
"Update deal #234 to stage WON, add comments 'Contract signed, project starts Monday'"
```

### Weekly Sales Reports

**Pipeline Analysis:**
```
"Get all deals created this week"
"Show me deals in PROPOSAL and NEGOTIATION stages"
"Filter deals by pipeline ID 1 ordered by amount descending"
```

**Lead Generation Review:**
```
"Get leads from date range 2025-06-24 to 2025-06-30"
"List leads with source WEB from the last 7 days"
"Show me leads with expected amount over €25000"
```

**Contact Database Maintenance:**
```
"Get latest 50 contacts created this month"
"Search for 'gmail.com' across all contacts"
"List companies created between 2025-06-01 and 2025-06-30"
```

### Monthly Business Intelligence

**Revenue Analysis:**
```
"Get all WON deals from Q2 2025"
"Filter deals by budget over €100000 in the last 3 months"
"Show me deals in Enterprise Sales pipeline ordered by amount"
```

**Market Segmentation:**
```
"List companies in SOFTWARE industry with over 100 employees"
"Get companies with revenue over €10000000"
"Show me CLIENT type companies created this year"
```

**Performance Tracking:**
```
"Get all leads created between 2025-04-01 and 2025-06-30"
"Show me conversion rate from leads to deals this quarter"
"List top 10 highest value deals closed this year"
```

---

## 📚 API Reference Quick Guide

### Function Categories Summary

| Category | Functions | Key Use Cases |
|----------|-----------|---------------|
| **Contacts** | 5 functions | Customer relationship management, contact database |
| **Deals** | 8 functions | Sales pipeline, revenue tracking, deal management |
| **Leads** | 6 functions | Lead generation, qualification, conversion tracking |
| **Companies** | 6 functions | Account management, B2B relationships |
| **Advanced Filtering** | 5 functions | Pipeline analysis, budget-based filtering |
| **Search & Utilities** | 4 functions | Cross-CRM search, data discovery |
| **Diagnostics** | 3 functions | System health, troubleshooting |

### Required vs Optional Parameters

**Always Required:**
- Contact: First Name + Last Name
- Deal: Title
- Lead: Title  
- Company: Company Name
- Updates: Entity ID

**Commonly Optional:**
- Limit (defaults: 20-50 depending on function)
- Currency (default: EUR)
- Order direction (default: DESC - newest first)
- Filter criteria (default: no filters)

### Data Formats

**Dates:** YYYY-MM-DD (e.g., "2025-07-02")
**Currency:** EUR, USD, GBP, etc.
**Phone:** Any format (+1234567890, (123) 456-7890)
**Email:** Standard format (user@domain.com)

### Common Status Values

**Lead Statuses:**
- NEW, IN_PROCESS, PROCESSED, QUALIFIED, JUNK

**Deal Stages:**
- NEW, QUALIFICATION, PROPOSAL, NEGOTIATION, WON, LOST

**Company Types:**
- CLIENT, SUPPLIER, PARTNER, COMPETITOR

---

## 🎯 Pro Tips for Maximum Efficiency

### 1. **Use Specific Filters**
✅ Good: "Show me deals from Enterprise Sales pipeline worth €50K-€200K created this month"
❌ Vague: "Show me some deals"

### 2. **Combine Operations**
✅ Efficient: "Create lead for TechCorp inquiry, then create follow-up task for tomorrow"
❌ Inefficient: Multiple separate requests

### 3. **Leverage Date Ranges**
✅ Precise: "Get leads from 2025-06-01 to 2025-06-30"
✅ Flexible: "Show me leads from last month"

### 4. **Use Pipeline Intelligence**
✅ Strategic: "Show me NEGOTIATION stage deals over €25K in Enterprise pipeline"
✅ Analytical: "Compare deal values across all pipelines this quarter"

### 5. **Optimize Search Queries**
✅ Targeted: "Search for 'sarah@company.com' in contacts and leads only"
✅ Comprehensive: "Find all records containing 'TechCorp' across all entities"

---

## 🚀 Getting Started Checklist

### Initial Setup Verification
1. ✅ **Test Connection**: "Validate the Bitrix24 webhook"
2. ✅ **Check Permissions**: "Diagnose any permission issues"
3. ✅ **Verify Data Access**: "Show me the latest 5 contacts"
4. ✅ **Test Core Functions**: "Get all deal pipelines"

### First Week Usage
1. ✅ **Explore Your Data**: "Show me latest 10 of each: contacts, deals, leads, companies"
2. ✅ **Test Filtering**: "Get deals from this month ordered by amount"
3. ✅ **Try Searching**: "Search for your email address across all CRM data"
4. ✅ **Practice Updates**: "Create a test contact, then update it"

### Advanced Usage
1. ✅ **Pipeline Analysis**: "Show me deals by pipeline and stage"
2. ✅ **Budget Filtering**: "Find deals in different budget ranges"
3. ✅ **Date Range Reports**: "Get quarterly performance data"
4. ✅ **Cross-Entity Search**: "Find all records related to a specific company"

---

## 📞 Support & Troubleshooting

### Quick Diagnostic Commands
- **Connection Issues**: "Validate the Bitrix24 webhook"
- **Permission Problems**: "Diagnose any permission issues"
- **Data Access**: "Check CRM settings and configuration"
- **Performance**: "Test the leads API functionality"

### Common Solutions
- **Slow Responses**: Use smaller limits (5-10 records) for faster results
- **No Data Found**: Try broader date ranges or remove filters
- **Permission Errors**: Run diagnostics to identify specific access issues
- **API Limits**: Built-in rate limiting prevents overload (2 requests/second)

---

## 🎉 Conclusion

This guide covers all **37 available functions** in your Bitrix24 integration. Each function is designed to work with natural language - simply tell Claude what you want to accomplish, and it will use the appropriate API calls automatically.

**Remember:**
- Use natural language - no technical knowledge required
- Start with simple requests and build complexity
- Combine multiple operations for efficiency
- Use the diagnostic tools when troubleshooting

**Your CRM is now fully accessible through conversational AI!** 🚀

---

*Last Updated: July 2, 2025 | Total Functions: 37 | Categories: 8*
