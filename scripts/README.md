# Scripts Directory

This directory contains various utility scripts organized by purpose.

## 📁 Structure

```
scripts/
├── test/          # Test scripts for development and debugging
├── install/       # Installation scripts (Windows batch files)
└── utils/         # Utility scripts for debugging and maintenance
```

## 🧪 Test Scripts (`test/`)

Scripts for testing various Bitrix24 API endpoints and functionality:

- `test-*.js`, `test-*.mjs`, `test-*.cjs` - Various test scripts
- `test-contacts.mjs` - Test contact operations
- `test-deals-2025.mjs` - Test deal operations
- `test-leads.mjs` - Test lead operations
- `test-tasks.js` - Test task operations
- `test-webhook-connection.cjs` - Test webhook connectivity

**Usage:**
```bash
node scripts/test/test-contacts.mjs
```

## 🔧 Utility Scripts (`utils/`)

Utility scripts for debugging and maintenance:

- `debug-webhook.js` - Debug webhook connections
- `fix-webhook-permissions.cjs` - Fix webhook permissions
- `get-all-leads.mjs` - Retrieve all leads
- `investigate-recent-leads.mjs` - Investigate recent leads
- `mcp-proxy.cjs` - MCP proxy utility

**Usage:**
```bash
node scripts/utils/debug-webhook.js
```

## 📦 Installation Scripts (`install/`)

Windows batch files for automated installation:

- `install-complete-setup.bat` - Complete automated setup
- `install-extension.bat` - Install extension
- `install-simple.bat` - Simple installation

**Usage:**
```bash
# Windows only
install-complete-setup.bat
```

## 📝 Notes

- Most scripts require Node.js and proper environment variables
- Test scripts may require a valid Bitrix24 webhook URL
- Installation scripts are Windows-specific

