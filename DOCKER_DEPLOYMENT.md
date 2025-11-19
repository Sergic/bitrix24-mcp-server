# Docker Deployment Guide - Quick Reference

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone git@github.com:Sergic/bitrix24-mcp-server.git
cd bitrix24-mcp-server
```

### 2. Configure Environment
Create `.env` file:
```bash
BITRIX24_WEBHOOK_URL=https://your-domain.bitrix24.com/rest/USER_ID/WEBHOOK_CODE/
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
```

### 3. Start Server
```bash
docker-compose up -d
```

### 4. Verify
```bash
# Check status
docker-compose ps

# Health check
curl http://localhost:3000/health

# View logs
docker-compose logs -f
```

## 🔧 Configuration

### Port Configuration
The port is fully configurable via the `PORT` environment variable:

```bash
# Use port 8080
PORT=8080 docker-compose up -d

# Or in .env file
PORT=8080
```

**Important:** The port variable controls both internal and external port mapping. If you set `PORT=8080`, the server will be accessible on port 8080.

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BITRIX24_WEBHOOK_URL` | ✅ Yes | - | Bitrix24 webhook URL |
| `PORT` | ❌ No | `3000` | Server port (internal and external) |
| `NODE_ENV` | ❌ No | `production` | Environment mode |
| `LOG_LEVEL` | ❌ No | `info` | Logging level (debug, info, warn, error) |

## 📋 Common Commands

```bash
# Start server
docker-compose up -d

# Stop server
docker-compose down

# Restart server
docker-compose restart

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up -d --build

# Check status
docker-compose ps

# Execute command in container
docker-compose exec bitrix24-mcp-server sh
```

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Find process using port
sudo lsof -i :3000

# Or use different port
PORT=8080 docker-compose up -d
```

### Container Keeps Restarting
```bash
# Check logs
docker-compose logs --tail=50

# Check health status
docker inspect bitrix24-mcp-server | grep -A 10 Health
```

### Webhook Not Working
1. Verify `BITRIX24_WEBHOOK_URL` in `.env`
2. Test webhook manually:
   ```bash
   curl -X GET "${BITRIX24_WEBHOOK_URL}app.info"
   ```
3. Check container logs for errors

## 📚 Full Documentation

For complete documentation, see:
- [DOCKER_COMPOSE_GUIDE.md](DOCKER_COMPOSE_GUIDE.md) - Comprehensive Docker Compose guide
- [README.md](README.md) - Main project documentation
- [SETUP.md](SETUP.md) - Setup instructions

## 🎯 What Changed

### Recent Updates (2025-11-19)
- ✅ Added Docker Compose support
- ✅ Fixed Dockerfile build issues (package-lock.json, tsconfig.json, src/)
- ✅ Made port fully configurable via `PORT` environment variable
- ✅ Fixed healthcheck to use dynamic port
- ✅ Moved `dotenv` from devDependencies to dependencies
- ✅ Updated `.dockerignore` to allow necessary build files

### Key Features
- **No Node.js Required**: Run on any Linux server with Docker
- **Dynamic Ports**: Use any available port via `PORT` variable
- **Health Checks**: Automatic health monitoring
- **Production Ready**: Isolated environment, automatic restarts

