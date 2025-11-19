# Bitrix24 MCP Server - Setup Guide

## 🎯 Quick Start

Your Bitrix24 MCP Server is now ready! Here's how to get it running:

## 🐳 Docker Compose Setup (Recommended for Production)

For Linux servers and production deployments:

### 1. Clone and Configure
```bash
git clone git@github.com:Sergic/bitrix24-mcp-server.git
cd bitrix24-mcp-server
```

### 2. Create `.env` file
```bash
BITRIX24_WEBHOOK_URL=https://your-domain.bitrix24.com/rest/USER_ID/WEBHOOK_CODE/
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
```

### 3. Start with Docker Compose
```bash
docker-compose up -d
```

### 4. Verify it's running
```bash
# Check status
docker-compose ps

# Check health
curl http://localhost:3000/health

# View logs
docker-compose logs -f
```

**📖 Full Docker Compose guide:** See [DOCKER_COMPOSE_GUIDE.md](DOCKER_COMPOSE_GUIDE.md)

**Key Features:**
- ✅ No Node.js installation required
- ✅ Configurable port via `PORT` environment variable
- ✅ Automatic health checks
- ✅ Production-ready setup

---

## 💻 Local Development Setup

### 1. Verify Installation
```bash
# Check if the server starts correctly
node build/index.js
# You should see: "Starting Bitrix24 MCP Server..." with 15 available tools
```

### 2. Configure Claude Desktop

**Windows:** Copy the configuration to `%APPDATA%\Claude\claude_desktop_config.json`
**macOS:** Copy the configuration to `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bitrix24": {
      "command": "node",
      "args": ["C:/Dev/bitrix24/build/index.js"],
      "env": {
        "BITRIX24_WEBHOOK_URL": "https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/"
      }
    }
  }
}
```

### 3. Restart Claude Desktop
After adding the configuration, restart Claude Desktop to load the MCP server.

## 🔧 Available Tools (15 total)

### Contact Management
- `bitrix24_create_contact` - Create new contacts
- `bitrix24_get_contact` - Get contact by ID
- `bitrix24_list_contacts` - List contacts with filtering
- `bitrix24_update_contact` - Update existing contacts

### Deal Management
- `bitrix24_create_deal` - Create new deals
- `bitrix24_get_deal` - Get deal by ID
- `bitrix24_list_deals` - List deals with filtering
- `bitrix24_update_deal` - Update existing deals

### Task Management
- `bitrix24_create_task` - Create new tasks
- `bitrix24_get_task` - Get task by ID
- `bitrix24_list_tasks` - List tasks with filtering
- `bitrix24_update_task` - Update existing tasks

### Utilities
- `bitrix24_search_crm` - Search across all CRM entities
- `bitrix24_get_current_user` - Get current user information
- `bitrix24_validate_webhook` - Validate webhook connection

## 🚀 Usage Examples

Once integrated with Claude Desktop, you can use natural language commands:

### Creating Contacts
```
"Create a new contact named Mario Rossi with email mario@example.com and phone +39 123 456 789"
```

### Managing Deals
```
"Create a deal titled 'Website Development' for €5000 and link it to contact ID 123"
```

### Task Management
```
"Create a high-priority task 'Follow up with client' with deadline tomorrow"
```

### Advanced Operations
```
"Search for all contacts and deals related to 'example.com' and create a summary report"
```

## 🔍 Testing the Integration

### Manual Test
```bash
# Run the integration test
npm test
```

### Verify Tools in Claude
After setup, ask Claude:
```
"What Bitrix24 tools do you have available?"
```

You should see all 15 tools listed.

## 🛠️ Development Commands

### Local Development
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Development mode (watch for changes)
npm run dev

# Start the server
npm start

# Start HTTP streamable server
npm run start:http

# Run integration tests
npm test
```

### Docker Commands
```bash
# Start server
docker-compose up -d

# View logs
docker-compose logs -f

# Stop server
docker-compose down

# Restart server
docker-compose restart

# Rebuild and start
docker-compose up -d --build

# Check status
docker-compose ps
```

## 🔒 Security Notes

- Your webhook URL contains sensitive authentication information
- Never commit the `.env` file to version control
- The webhook URL is configured for user ID 27 on sviluppofranchising.bitrix24.it
- Rate limiting is built-in (2 requests/second) to respect Bitrix24 API limits

## 📁 Project Structure

```
bitrix24-mcp-server/
├── src/                    # TypeScript source code
│   ├── bitrix24/          # Bitrix24 API client
│   ├── tools/             # MCP tool definitions
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration management
│   └── index.ts           # Main MCP server
├── build/                 # Compiled JavaScript (generated)
├── test/                  # Integration tests
├── .env                   # Environment variables (DO NOT COMMIT)
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker image definition
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
├── DOCKER_COMPOSE_GUIDE.md # Docker Compose documentation
└── README.md              # Full documentation
```

## 🎉 Success Indicators

✅ **Build Success**: `npm run build` completes without errors
✅ **Server Starts**: Shows "Starting Bitrix24 MCP Server..." with 15 tools
✅ **Claude Integration**: Claude Desktop shows Bitrix24 tools available
✅ **API Connection**: Webhook validation passes

## 🆘 Troubleshooting

### Common Issues

**"Cannot find module" errors**
- Run `npm install` to install dependencies
- Ensure you've built with `npm run build`

**"Webhook validation failed"**
- Check your webhook URL in `.env`
- Verify Bitrix24 instance is accessible
- Ensure webhook has proper permissions

**Claude Desktop not showing tools**
- Verify configuration file path is correct
- Restart Claude Desktop after configuration changes
- Check that the server path in config matches your installation

### Debug Mode
Set environment variables for detailed logging:
```bash
NODE_ENV=development
LOG_LEVEL=debug
```

## 🔄 Next Steps

1. **Test Basic Operations**: Try creating a contact through Claude
2. **Explore Advanced Features**: Use search and filtering capabilities
3. **Integrate with Workflows**: Build AI-powered CRM automation
4. **Extend Functionality**: Add custom tools for specific business needs

Your Bitrix24 MCP Server is now ready to transform your CRM workflows with AI automation! 🚀
