# 🚀 Bitrix24 Integration Guide for Business Users
## Using Claude Desktop with Bitrix24 CRM

This guide shows you how to use natural language with Claude Desktop to interact with your Bitrix24 CRM system. No technical knowledge required!

---

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Contact Management](#contact-management)
3. [Deal Management](#deal-management)
4. [Lead Management](#lead-management)
5. [Task Management](#task-management)
6. [Search & Utilities](#search--utilities)
7. [Common Use Cases](#common-use-cases)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Getting Started

### What You Can Do
With Claude Desktop connected to your Bitrix24, you can:
- **Create, view, and update** contacts, deals, leads, and tasks
- **Search** across all your CRM data
- **Get reports** on recent activities
- **Filter and sort** your data by various criteria
- **Automate** routine CRM tasks

### How to Ask Claude
Simply use natural language! Here are examples:

✅ **Good Examples:**
- "Show me the latest 10 leads"
- "Create a new contact for John Smith with email john@company.com"
- "Find all deals from 2025"
- "Update deal #123 to set the amount to €5000"

❌ **Avoid Technical Terms:**
- Don't worry about API endpoints or technical parameters
- Claude will handle all the technical details for you

---

## 👥 Contact Management

### View Contacts

**What you can ask:**
- "Show me the latest 20 contacts"
- "List all contacts"
- "Get contact details for ID 123"
- "Find contacts with the name 'Smith'"

**Example Results:**
```
Latest Contacts:
1. John Smith (ID: 456) - john@company.com - Created: 2025-03-15
2. Maria Garcia (ID: 455) - maria@business.com - Created: 2025-03-14
3. David Johnson (ID: 454) - david@corp.com - Created: 2025-03-13
```

### Create New Contacts

**What you can ask:**
- "Create a new contact for Sarah Wilson, email sarah@example.com, phone +1234567890"
- "Add a contact: Name: Mike Brown, Company: Tech Corp, Position: Manager"

**Required Information:**
- ✅ **First Name** (required)
- ✅ **Last Name** (required)
- 📝 Phone, Email, Company, Position, Comments (optional)

### Update Contacts

**What you can ask:**
- "Update contact #123 to change the email to newemail@company.com"
- "Change the phone number for contact ID 456 to +9876543210"

---

## 💼 Deal Management

### View Deals

**What you can ask:**
- "Show me the latest 10 deals"
- "List all deals from 2025"
- "Get deals between January 1, 2025 and March 31, 2025"
- "Show me deal details for ID 789"
- "Find deals with 'Project' in the title"

**Sorting Options:**
- By creation date (newest first) - *default*
- By modification date
- By deal amount
- By title (alphabetical)

**Example Results:**
```
Latest Deals:
1. Website Redesign Project (ID: 789) - €15,000 - Created: 2025-03-20
2. Software License Deal (ID: 788) - €8,500 - Created: 2025-03-19
3. Consulting Services (ID: 787) - €12,000 - Created: 2025-03-18
```

### Create New Deals

**What you can ask:**
- "Create a new deal: Title: 'Mobile App Development', Amount: €25000, Currency: EUR"
- "Add a deal for contact #123: 'Website Maintenance', €5000"

**Required Information:**
- ✅ **Title** (required)
- 📝 Amount, Currency, Contact ID, Stage, Comments (optional)

### Update Deals

**What you can ask:**
- "Update deal #789 to set the amount to €20000"
- "Change the stage of deal ID 788 to 'Won'"
- "Add comments to deal #787: 'Client approved the proposal'"

---

## 🎯 Lead Management

### View Leads

**What you can ask:**
- "Show me the latest 15 leads"
- "Get all leads from 2025"
- "Find leads from March 2025"
- "Show me lead details for ID 456"
- "List leads with status 'NEW'"

**Example Results:**
```
Latest Leads:
1. Mail da inviare a Sfontanesi521@gmail.com (ID: 658) - 2025-04-04 ⭐ Most Recent
2. Lead #656 (ID: 656) - 2025-03-11
3. Lead #654 (ID: 654) - 2025-03-10
```

### Create New Leads

**What you can ask:**
- "Create a new lead: Title: 'Potential Client Inquiry', Name: 'Anna Johnson', Email: anna@company.com"
- "Add a lead from website contact form: Company: TechStart, Phone: +1234567890"

**Required Information:**
- ✅ **Title** (required)
- 📝 Name, Last Name, Company, Phone, Email, Source, Status, Expected Amount (optional)

### Update Leads

**What you can ask:**
- "Update lead #456 to change status to 'QUALIFIED'"
- "Add phone number +1234567890 to lead ID 789"

---

## ✅ Task Management

### View Tasks

**What you can ask:**
- "Show me all tasks"
- "List tasks assigned to user ID 123"
- "Get task details for ID 456"
- "Find tasks with 'Project' in the title"

### Create New Tasks

**What you can ask:**
- "Create a task: Title: 'Follow up with client', Responsible: User ID 123, Deadline: 2025-04-15"
- "Add a high priority task: 'Prepare proposal', Description: 'Create detailed proposal for new client'"

**Task Priorities:**
- **0** = Low Priority
- **1** = Normal Priority (default)
- **2** = High Priority

**Task Statuses:**
- **1** = New
- **2** = Pending
- **3** = In Progress
- **4** = Completed
- **5** = Deferred

### Update Tasks

**What you can ask:**
- "Update task #456 to set status to completed"
- "Change the deadline of task ID 789 to 2025-04-20"
- "Set task #123 to high priority"

---

## 🔍 Search & Utilities

### Search Across CRM

**What you can ask:**
- "Search for 'john@company.com' across all CRM data"
- "Find all records with phone number '+1234567890'"
- "Search for 'TechCorp' in contacts, companies, and deals"

**Search covers:**
- 📧 Email addresses
- 📞 Phone numbers
- 👤 Names and titles
- 🏢 Company names

### System Diagnostics

**What you can ask:**
- "Check if the Bitrix24 connection is working"
- "Diagnose any permission issues"
- "Test the leads API functionality"
- "Check CRM settings and configuration"

---

## 💡 Common Use Cases

### Daily CRM Tasks

**Morning CRM Review:**
- "Show me the latest 10 leads from yesterday"
- "List any new deals created this week"
- "Get all tasks assigned to me that are due today"

**Lead Follow-up:**
- "Find all leads with status 'NEW' from the last 7 days"
- "Create a task to follow up with lead #456"
- "Update lead #789 status to 'CONTACTED'"

**Deal Pipeline Management:**
- "Show me all deals in 'NEGOTIATION' stage"
- "Get deals worth more than €10,000"
- "Update deal #123 to 'WON' status"

**Contact Database Maintenance:**
- "Find contacts without email addresses"
- "Search for duplicate contacts with name 'Smith'"
- "Update contact #456 with new phone number"

### Weekly Reports

**Sales Performance:**
- "Get all deals created this month"
- "Show me won deals from Q1 2025"
- "List the top 10 highest value deals"

**Lead Generation Analysis:**
- "Get all leads from the last 30 days"
- "Show me leads by source (web, email, phone)"
- "Find leads that haven't been contacted yet"

### Data Import/Export Scenarios

**Bulk Operations:**
- "Create multiple contacts from this list: [provide details]"
- "Update several deals with new stage information"
- "Generate a report of all 2025 activities"

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

**❌ "No recent data found"**
- ✅ Try: "Get all leads without date filters first"
- ✅ Check: "Show me leads from 2024 to see if data exists"

**❌ "Permission denied"**
- ✅ Ask: "Diagnose permission issues"
- ✅ Check: "Validate the Bitrix24 webhook connection"

**❌ "Slow response times"**
- ✅ Note: Large datasets (1000+ records) may take 10-15 seconds
- ✅ Try: Use smaller limits like "Show me latest 5 leads" for faster results

**❌ "Can't find specific record"**
- ✅ Try: "Search for [email/phone/name] across all CRM data"
- ✅ Check: "List all [contacts/deals/leads] to see available records"

### Getting Help

**System Status:**
- "Check if Bitrix24 is working properly"
- "Test all API connections"
- "Diagnose any system issues"

**Data Verification:**
- "Show me a sample of contacts to verify data format"
- "Get one example of each: contact, deal, lead, task"

---

## 📊 Data Formats & Examples

### Date Formats
- **Input:** "2025-03-15" or "March 15, 2025"
- **Output:** "2025-03-15T10:30:00+00:00"

### Currency Formats
- **Supported:** EUR, USD, GBP, etc.
- **Example:** "€15,000" or "15000 EUR"

### Phone Formats
- **Flexible:** "+1234567890", "(123) 456-7890", "123-456-7890"

### Email Formats
- **Standard:** "user@domain.com"

---

## 🎯 Pro Tips for Business Users

### 1. **Be Specific with Requests**
✅ Good: "Show me deals from January 2025 worth more than €5000"
❌ Vague: "Show me some deals"

### 2. **Use Natural Language**
✅ Good: "Create a contact for John Smith at TechCorp with email john@techcorp.com"
❌ Technical: "Execute bitrix24_create_contact with parameters..."

### 3. **Combine Operations**
✅ Good: "Find lead #456 and create a follow-up task for tomorrow"

### 4. **Ask for Clarification**
✅ Good: "I need help finding contacts from last month - can you show me different ways to search?"

### 5. **Use Filters Effectively**
- Date ranges: "from January 1 to March 31, 2025"
- Status filters: "with status 'NEW'"
- Amount filters: "worth more than €10,000"

---

## 🚀 Getting Started Checklist

1. ✅ **Verify Connection**: "Check if Bitrix24 is working"
2. ✅ **Test Basic Functions**: "Show me the latest 5 contacts"
3. ✅ **Try Creating Data**: "Create a test contact"
4. ✅ **Practice Searching**: "Search for my email address"
5. ✅ **Explore Your Data**: "Show me what types of records I have"

---

## 📞 Support & Resources

### Quick Reference Commands
- **Latest Data**: "Show me the latest [X] [contacts/deals/leads/tasks]"
- **Search**: "Find [search term] in [entity type]"
- **Create**: "Create a new [entity] with [details]"
- **Update**: "Update [entity] #[ID] to [changes]"
- **Filter**: "Get [entities] from [date range] with [criteria]"

### Need More Help?
Simply ask Claude: "I need help with [specific task]" and provide details about what you're trying to accomplish!

---

*This guide covers all available Bitrix24 functions accessible through Claude Desktop. The system handles all technical details automatically - just use natural language to describe what you need!* 🎉
