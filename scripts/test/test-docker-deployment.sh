#!/bin/bash

# Bitrix24 MCP Server - Docker Deployment Test Script
# Tests Docker Compose deployment with different configurations

set -e  # Exit on error
set +e  # Temporarily disable for some checks

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEFAULT_PORT=3000
TEST_PORT=8080
MAX_WAIT_TIME=30  # seconds

# Docker Compose command (will be set during prerequisites check)
DOCKER_COMPOSE_CMD=""

# Counters
TESTS_PASSED=0
TESTS_FAILED=0

# Helper functions
print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((TESTS_PASSED++))
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    ((TESTS_FAILED++))
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

wait_for_health() {
    local port=$1
    local max_attempts=$MAX_WAIT_TIME
    local attempt=0
    
    print_info "Waiting for server to be healthy on port $port..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -sf "http://localhost:$port/health" > /dev/null 2>&1; then
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    return 1
}

check_health_endpoint() {
    local port=$1
    local response=$(curl -s "http://localhost:$port/health")
    
    if echo "$response" | jq -e '.status == "healthy"' > /dev/null 2>&1; then
        local tools=$(echo "$response" | jq -r '.tools // 0')
        print_success "Health check passed on port $port (Tools: $tools)"
        return 0
    else
        print_error "Health check failed on port $port"
        return 1
    fi
}

check_mcp_endpoint() {
    local port=$1
    local response=$(curl -s -X POST "http://localhost:$port/mcp" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}')
    
    if echo "$response" | jq -e '.result.tools | length > 0' > /dev/null 2>&1; then
        local tool_count=$(echo "$response" | jq '.result.tools | length')
        print_success "MCP endpoint works on port $port (Tools: $tool_count)"
        return 0
    else
        print_error "MCP endpoint failed on port $port"
        return 1
    fi
}

check_container_status() {
    set +e
    local status_output=$($DOCKER_COMPOSE_CMD ps --format json 2>/dev/null)
    local status=""
    
    # Try to parse JSON array
    if echo "$status_output" | jq -e 'type == "array" and length > 0' > /dev/null 2>&1; then
        status=$(echo "$status_output" | jq -r '.[0].State // "unknown"')
    # Try to parse single JSON object
    elif echo "$status_output" | jq -e 'type == "object"' > /dev/null 2>&1; then
        status=$(echo "$status_output" | jq -r '.State // "unknown"')
    # Fallback to text parsing
    else
        status=$($DOCKER_COMPOSE_CMD ps 2>/dev/null | grep -i "running" | head -1 | awk '{print $1}')
        if [ -n "$status" ]; then
            status="running"
        else
            status="unknown"
        fi
    fi
    set -e
    
    if [ "$status" = "running" ]; then
        print_success "Container is running"
        return 0
    else
        print_error "Container status: $status"
        return 1
    fi
}

test_port() {
    local port=$1
    local port_name=$2
    
    print_header "Testing on port $port ($port_name)"
    
    # Start container
    print_info "Starting container with PORT=$port..."
    PORT=$port $DOCKER_COMPOSE_CMD up -d
    
    # Wait a bit for container to start
    sleep 2
    
    # Check container status
    if ! check_container_status; then
        return 1
    fi
    
    # Wait for health
    if ! wait_for_health $port; then
        print_error "Server did not become healthy within $MAX_WAIT_TIME seconds"
        $DOCKER_COMPOSE_CMD logs --tail=20
        return 1
    fi
    
    # Check health endpoint
    check_health_endpoint $port
    
    # Check MCP endpoint
    check_mcp_endpoint $port
    
    # Check logs for port
    if $DOCKER_COMPOSE_CMD logs 2>/dev/null | grep -q "localhost:$port"; then
        print_success "Port $port correctly logged in server output"
    else
        print_error "Port $port not found in logs"
    fi
    
    return 0
}

cleanup() {
    if [ -n "$DOCKER_COMPOSE_CMD" ]; then
        print_info "Cleaning up..."
        $DOCKER_COMPOSE_CMD down > /dev/null 2>&1 || true
    fi
}

# Main execution
main() {
    print_header "Bitrix24 MCP Server - Docker Deployment Test"
    
    # Check prerequisites
    print_header "Checking Prerequisites"
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    print_success "Docker is installed"
    
    # Check for docker-compose or docker compose
    set +e
    if command -v docker-compose &> /dev/null 2>&1; then
        DOCKER_COMPOSE_CMD="docker-compose"
        print_success "Docker Compose is installed (docker-compose)"
        set -e
    elif docker compose version &> /dev/null 2>&1; then
        DOCKER_COMPOSE_CMD="docker compose"
        print_success "Docker Compose is installed (docker compose)"
        set -e
    else
        set -e
        print_error "Docker Compose is not installed"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        print_error "jq is not installed (required for JSON parsing)"
        print_info "Install with: brew install jq (macOS) or apt-get install jq (Linux)"
        exit 1
    fi
    print_success "jq is installed"
    
    if ! command -v curl &> /dev/null; then
        print_error "curl is not installed"
        exit 1
    fi
    print_success "curl is installed"
    
    # Check docker-compose config
    print_header "Validating Docker Compose Configuration"
    if $DOCKER_COMPOSE_CMD config > /dev/null 2>&1; then
        print_success "Docker Compose configuration is valid"
    else
        print_error "Docker Compose configuration is invalid"
        $DOCKER_COMPOSE_CMD config
        exit 1
    fi
    
    # Cleanup any existing containers
    cleanup
    
    # Test with default port
    if test_port $DEFAULT_PORT "default"; then
        cleanup
    else
        print_error "Test failed on default port"
        cleanup
        exit 1
    fi
    
    # Test with custom port
    if test_port $TEST_PORT "custom"; then
        cleanup
    else
        print_error "Test failed on custom port"
        cleanup
        exit 1
    fi
    
    # Final summary
    print_header "Test Summary"
    echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
    if [ $TESTS_FAILED -gt 0 ]; then
        echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
        exit 1
    else
        echo -e "${GREEN}All tests passed! 🎉${NC}"
    fi
}

# Trap to ensure cleanup on exit
trap cleanup EXIT

# Run main function
main

