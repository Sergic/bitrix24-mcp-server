# Bitrix24 MCP Server - HTTP Streamable Transport Guide

## Overview

This guide explains how to use the Bitrix24 MCP Server with **HTTP Streamable Transport** according to the MCP specification 2025-03-26.

## What is HTTP Streamable Transport?

HTTP Streamable is the modern MCP transport protocol that allows:
- ✅ **One HTTP endpoint** for all MCP operations
- ✅ **Automatic tool discovery** - clients get the list of all available tools with one request
- ✅ **Standard HTTP POST** for sending JSON-RPC requests
- ✅ **Optional SSE streams** for server-initiated messages
- ✅ **Easy deployment** on cloud platforms (Azure, AWS, GCP, etc.)
- ✅ **No stdio/process management** required

## Quick Start

### 1. Start the Server

```bash
npm run start:http
```

The server will start on port 3000 (configurable via `PORT` environment variable).

### 2. Server Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Status page with documentation |
| `/health` | GET | Health check endpoint |
| `/mcp` | POST | MCP JSON-RPC endpoint (main endpoint) |
| `/mcp` | GET | SSE stream endpoint (optional) |

### 3. Configuration

#### Environment Variables

```bash
PORT=3000                          # Server port
BITRIX24_WEBHOOK_URL=your_url     # Bitrix24 webhook URL
BITRIX24_API_KEY=your_key         # Bitrix24 API key
```

## Using the MCP Server

### 1. List All Available Tools

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "bitrix24_create_contact",
        "description": "Create a new contact in Bitrix24 CRM",
        "inputSchema": { ... }
      },
      ...
    ]
  }
}
```

### 2. Call a Tool

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "bitrix24_get_latest_contacts",
      "arguments": {
        "limit": 5
      }
    }
  }'
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{ \"success\": true, \"contacts\": [...] }"
      }
    ]
  }
}
```

### 3. Initialize Connection

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "initialize"
  }'
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "protocolVersion": "2025-03-26",
    "capabilities": {
      "tools": {}
    },
    "serverInfo": {
      "name": "bitrix24-mcp-server",
      "version": "1.0.0"
    }
  }
}
```

## Integration with MCP Clients

### Claude Desktop Configuration

Edit your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bitrix24": {
      "transport": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

### Other MCP Clients

Any MCP-compatible client can connect using:

```javascript
{
  "transport": "http",
  "url": "http://localhost:3000/mcp"
}
```

## SSE Streaming (Optional)

The server supports Server-Sent Events (SSE) for receiving server-initiated messages.

### Open SSE Stream

```bash
curl -N -H "Accept: text/event-stream" http://localhost:3000/mcp
```

This will keep the connection open and you'll receive:
- Keep-alive pings every 30 seconds
- Any server-initiated notifications

### SSE with Last-Event-ID

To resume after disconnection:

```bash
curl -N -H "Accept: text/event-stream" \
        -H "Last-Event-ID: 12345" \
        http://localhost:3000/mcp
```

## Available MCP Methods

| Method | Description |
|--------|-------------|
| `initialize` | Initialize MCP connection |
| `tools/list` | Get list of all available tools |
| `tools/call` | Execute a tool |
| `ping` | Ping the server |

## Available Tools (50)

### Contact Management
- `bitrix24_create_contact` - Create a new contact
- `bitrix24_get_contact` - Get contact by ID
- `bitrix24_list_contacts` - List contacts
- `bitrix24_get_latest_contacts` - Get recent contacts
- `bitrix24_update_contact` - Update contact
- `bitrix24_get_contacts_with_user_names` - Get contacts with resolved user names

### Deal Management
- `bitrix24_create_deal` - Create a new deal
- `bitrix24_get_deal` - Get deal by ID
- `bitrix24_list_deals` - List deals
- `bitrix24_get_latest_deals` - Get recent deals
- `bitrix24_get_deals_from_date_range` - Get deals by date range
- `bitrix24_update_deal` - Update deal
- `bitrix24_get_deals_with_user_names` - Get deals with resolved user names
- `bitrix24_get_deal_pipelines` - Get all deal pipelines
- `bitrix24_get_deal_stages` - Get deal stages
- `bitrix24_filter_deals_by_pipeline` - Filter deals by pipeline
- `bitrix24_filter_deals_by_budget` - Filter deals by budget
- `bitrix24_filter_deals_by_status` - Filter deals by status

### Lead Management
- `bitrix24_create_lead` - Create a new lead
- `bitrix24_get_lead` - Get lead by ID
- `bitrix24_list_leads` - List leads
- `bitrix24_get_latest_leads` - Get recent leads
- `bitrix24_get_leads_from_date_range` - Get leads by date range
- `bitrix24_update_lead` - Update lead
- `bitrix24_get_leads_with_user_names` - Get leads with resolved user names

### Company Management
- `bitrix24_create_company` - Create a new company
- `bitrix24_get_company` - Get company by ID
- `bitrix24_list_companies` - List companies
- `bitrix24_update_company` - Update company
- `bitrix24_get_latest_companies` - Get recent companies
- `bitrix24_get_companies_from_date_range` - Get companies by date range
- `bitrix24_get_companies_with_user_names` - Get companies with resolved user names

### Sales Team Monitoring
- `bitrix24_monitor_user_activities` - Monitor user activities
- `bitrix24_get_user_performance_summary` - Get user performance summary
- `bitrix24_analyze_account_performance` - Analyze account performance
- `bitrix24_compare_user_performance` - Compare user performance
- `bitrix24_track_deal_progression` - Track deal progression
- `bitrix24_monitor_sales_activities` - Monitor sales activities
- `bitrix24_generate_sales_report` - Generate sales report
- `bitrix24_get_team_dashboard` - Get team dashboard
- `bitrix24_analyze_customer_engagement` - Analyze customer engagement
- `bitrix24_forecast_performance` - Forecast performance

### User Management
- `bitrix24_get_user` - Get user by ID
- `bitrix24_get_all_users` - Get all users
- `bitrix24_resolve_user_names` - Resolve user IDs to names

### Utilities
- `bitrix24_search_crm` - Search across CRM entities
- `bitrix24_validate_webhook` - Validate webhook connection
- `bitrix24_diagnose_permissions` - Diagnose permissions
- `bitrix24_check_crm_settings` - Check CRM settings
- `bitrix24_test_leads_api` - Test leads API

## Deployment

### Local Development

```bash
npm run start:http
```

### Production Deployment

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:http"]
```

#### Azure Web App

1. Set environment variables in Azure Portal
2. Deploy using GitHub Actions or Azure CLI
3. The `azure:start` script is configured to use HTTP Streamable

#### AWS/GCP/Other Cloud

The server works on any platform that supports Node.js and HTTP. Just:
1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Start: `npm run start:http`

## Monitoring

### Health Check

```bash
curl http://localhost:3000/health
```

Response includes:
- Server status
- Uptime
- Available tools count
- Protocol version

### Logs

The server logs all requests to stderr:
```
📨 Received JSON-RPC request: {...}
📤 Sending response: {...}
```

## Troubleshooting

### Server won't start (EADDRINUSE)

Port 3000 is already in use. Either:
1. Stop the other process: `lsof -ti:3000 | xargs kill`
2. Use a different port: `PORT=3001 npm run start:http`

### Tools not working

1. Check your `.env` file has correct Bitrix24 credentials
2. Test webhook: Call `bitrix24_validate_webhook` tool
3. Check logs for error messages

### Connection refused

Make sure the server is running:
```bash
curl http://localhost:3000/health
```

## Security Considerations

1. **API Keys**: Never commit `.env` file with real credentials
2. **CORS**: The server allows all origins by default. Restrict in production:
   ```javascript
   res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com');
   ```
3. **HTTPS**: Use HTTPS in production (handled by cloud providers)
4. **Rate Limiting**: Consider adding rate limiting for production

## Advantages Over stdio Transport

| Feature | stdio | HTTP Streamable |
|---------|-------|-----------------|
| **Deployment** | Complex (process management) | Simple (standard HTTP server) |
| **Cloud Hosting** | Difficult | Easy (Azure, AWS, etc.) |
| **Multiple Clients** | One process per client | Multiple clients, one server |
| **Debugging** | Hard (stdin/stdout) | Easy (curl, HTTP tools) |
| **Scalability** | Limited | High (load balancers, etc.) |
| **Firewall Friendly** | No | Yes (standard HTTP/HTTPS) |

## Specification Compliance

This implementation follows the **MCP HTTP Streamable Transport specification (2025-03-26)**:
- ✅ JSON-RPC 2.0 protocol
- ✅ POST requests with Accept: application/json or text/event-stream
- ✅ GET requests for SSE streams
- ✅ Last-Event-ID header support for resumption
- ✅ Proper error codes and messages

## Links

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)
- [Bitrix24 API Documentation](https://dev.bitrix24.com/)
- [GitHub Repository](https://github.com/yourusername/bitrix24-mcp-server)

## Support

For issues or questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review server logs
3. Test with curl examples above
4. Open an issue on GitHub
