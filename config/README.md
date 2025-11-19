# Configuration Directory

Configuration files organized by platform and purpose.

## 📁 Structure

```
config/
├── claude/    # Claude Desktop configuration files
└── azure/     # Azure deployment configuration files
```

## 🤖 Claude Desktop Config (`claude/`)

Example configuration files for Claude Desktop integration:

- `claude_desktop_config.json` - Main configuration
- `claude_desktop_config_final.json` - Final configuration
- `claude_desktop_config_remote.json` - Remote configuration
- `claude_desktop_config_updated.json` - Updated configuration

**Location on your system:**
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

**Usage:**
Copy the appropriate configuration file to your Claude Desktop config location and update the `BITRIX24_WEBHOOK_URL` value.

## ☁️ Azure Configuration (`azure/`)

Configuration files for Azure App Service deployment:

- `web.config` - IIS web server configuration
- `nixpacks.toml` - Nixpacks build configuration
- `update-azure-env.ps1` - PowerShell script to update Azure environment variables

**Usage:**
These files are used during Azure deployment. See [Azure Deployment Guide](../docs/deployment/AZURE_DEPLOYMENT_GUIDE.md) for details.

## 📝 Notes

- Configuration files may contain sensitive information - never commit actual credentials
- Use `.env` files for local development
- Azure configs are platform-specific

