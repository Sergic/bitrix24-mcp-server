# Quick Start: HTTP Streamable Transport

## 🚀 5-Minute Setup

### 1. Configure Environment

Create `.env` file:
```bash
BITRIX24_WEBHOOK_URL=https://your-domain.bitrix24.com/rest/USER_ID/WEBHOOK_CODE/
BITRIX24_API_KEY=your_api_key_if_needed
PORT=3000
```

### 2. Install & Build

```bash
npm install
npm run build
```

### 3. Start Server

```bash
npm run start:http
```

You should see:
```
🚀 Bitrix24 MCP Server (HTTP Streamable) started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 MCP Endpoint: http://localhost:3000/mcp
🌐 Status Page:  http://localhost:3000/
💚 Health Check: http://localhost:3000/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Available tools: 50
📦 Protocol: MCP HTTP Streamable (2025-03-26)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Ready to accept connections!
```

### 4. Test It

Open browser: http://localhost:3000

Or use curl:
```bash
# List all tools
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' \
  | jq '.result.tools | length'

# Should output: 50
```

### 5. Connect Claude Desktop

Edit config file:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add:
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

Restart Claude Desktop.

### 6. Try It

In Claude Desktop, type:
```
List all available Bitrix24 tools
```

Or:
```
Get the latest 5 contacts from Bitrix24
```

## 🎯 What You Get

- **50 tools** for Bitrix24 CRM operations
- **Web UI** at http://localhost:3000
- **Health check** at http://localhost:3000/health
- **Auto-discovery** - Claude finds all tools automatically
- **No process management** - just one HTTP server

## 📚 Learn More

- [Full HTTP Streamable Guide](HTTP_STREAMABLE_GUIDE.md)
- [Main README](README.md)

## 🐛 Troubleshooting

### Port already in use?

```bash
# Kill existing process
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run start:http
```

### Tools not working?

```bash
# Test webhook
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"bitrix24_validate_webhook","arguments":{}}}' \
  | jq '.'
```

Should return:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{
      "type": "text",
      "text": "{\"success\":true,\"valid\":true,\"message\":\"Webhook is valid\"}"
    }]
  }
}
```

## 🌐 Deploy to Cloud

The HTTP server is ready for cloud deployment:

### Azure
```bash
# Already configured!
git push azure main
```

### AWS/GCP/Other
Just deploy as a standard Node.js HTTP app. The server:
- Listens on `PORT` environment variable
- Handles standard HTTP requests
- Includes health check endpoint
- Supports graceful shutdown

---

**Need help?** See [HTTP_STREAMABLE_GUIDE.md](HTTP_STREAMABLE_GUIDE.md) for detailed documentation.
