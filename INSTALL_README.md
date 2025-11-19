# 🚀 Easy Installation for Bitrix24 MCP Server

Choose your installation method:

## 🐳 Docker Compose (Recommended for Linux Servers)

**Perfect for:** Production deployments, Linux servers, cloud hosting

```bash
# 1. Clone repository
git clone git@github.com:Sergic/bitrix24-mcp-server.git
cd bitrix24-mcp-server

# 2. Create .env file
cat > .env << EOF
BITRIX24_WEBHOOK_URL=https://your-domain.bitrix24.com/rest/USER_ID/WEBHOOK_CODE/
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
EOF

# 3. Start server
docker-compose up -d

# 4. Verify
curl http://localhost:3000/health
```

**📖 Full guide:** See [DOCKER_COMPOSE_GUIDE.md](docs/deployment/DOCKER_COMPOSE_GUIDE.md)

**Advantages:**
- ✅ No Node.js installation required
- ✅ Isolated environment
- ✅ Configurable port (set `PORT` in `.env`)
- ✅ Automatic health checks
- ✅ Production-ready

---

## 📦 Installation Options (Windows/macOS)

### 🎯 **Recommended: Full Automated Setup**
```
Double-click: install-complete-setup.bat
```
**Perfect for:** First-time users, complete automation
- ✅ Installs everything automatically
- ✅ Configures Claude Desktop
- ✅ Tests the installation
- ✅ Provides troubleshooting help

### ⚡ **Quick Setup**
```
Double-click: install-simple.bat
```
**Perfect for:** Experienced users, minimal setup
- ✅ Installs dependencies and builds project
- ✅ Creates environment file
- ⚠️ Requires manual Claude Desktop configuration

### 🛠️ **Manual Installation**
```
See: docs/installation/INSTALLATION_GUIDE.md
```
**Perfect for:** Advanced users, custom setups
- Full control over each step
- Detailed troubleshooting options
- Cross-platform instructions

## 🎬 Quick Start (30 seconds)

1. **Run the installer:**
   ```
   Right-click install-complete-setup.bat → "Run as administrator"
   ```

2. **Configure your webhook:**
   - The script will open your .env file
   - Replace `YOUR_WEBHOOK_URL` with your Bitrix24 webhook

3. **Restart Claude Desktop**
   - Close and reopen Claude Desktop
   - Ask: "What Bitrix24 tools do you have?"

4. **Done!** 🎉

## 📋 What You Need

- **Windows 10/11**
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **Claude Desktop** ([Download here](https://claude.ai/download))
- **Bitrix24 webhook URL** (see [INSTALLATION_GUIDE.md](docs/installation/INSTALLATION_GUIDE.md) for setup)

## 🆘 Need Help?

- **Installation issues:** See [INSTALLATION_GUIDE.md](docs/installation/INSTALLATION_GUIDE.md)
- **Bitrix24 setup:** See [SETUP.md](SETUP.md)
- **Troubleshooting:** See [TROUBLESHOOTING_GUIDE.md](docs/troubleshooting/TROUBLESHOOTING_GUIDE.md)

---

**Ready to automate your Bitrix24 with AI?** Choose an installation method above! 🚀
