# Bitrix24 MCP Server - Dockerfile for Coolify
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files (including package-lock.json)
COPY package*.json ./

# Install all dependencies (including dev for building TypeScript)
RUN npm ci

# Copy TypeScript config and source code (needed for build)
COPY tsconfig.json ./
COPY src/ ./src/
COPY http-streamable-server.js ./

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files (including package-lock.json)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy built files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/http-streamable-server.js ./

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (default 3000, but can be overridden via PORT env var)
# Note: EXPOSE is just metadata, actual port is controlled by PORT env var
EXPOSE 3000

# Health check (uses PORT env var, defaults to 3000)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const port = process.env.PORT || '3000'; require('http').get('http://localhost:' + port + '/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })"

# Start the HTTP Streamable server
CMD ["node", "http-streamable-server.js"]
