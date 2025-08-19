#!/bin/bash

# Local deployment script for test Hello World Application
# This script helps with local development and testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT=${ENVIRONMENT:-development}
IMAGE_NAME=${IMAGE_NAME:-test-world}
IMAGE_TAG=${IMAGE_TAG:-latest}
PORT=${PORT:-3000}

echo -e "${GREEN}🚀 test Hello World Deployment Script${NC}"
echo -e "${YELLOW}Environment: $ENVIRONMENT${NC}"
echo -e "${YELLOW}Image: $IMAGE_NAME:$IMAGE_TAG${NC}"

# Function to print status
print_status() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running"

# Install dependencies
if [ -f "package.json" ]; then
    print_info "Installing Node.js dependencies..."
    npm ci
    print_status "Dependencies installed"
fi

# Run tests
if [ "$1" != "--skip-tests" ]; then
    print_info "Running tests..."
    npm test
    print_status "Tests completed"
    
    print_info "Running linting..."
    npm run lint
    print_status "Linting completed"
fi

# Build Docker image
print_info "Building Docker image..."
docker build -t $IMAGE_NAME:$IMAGE_TAG .
print_status "Docker image built: $IMAGE_NAME:$IMAGE_TAG"

# Stop existing container if running
if docker ps -q -f name=test-world-local > /dev/null; then
    print_info "Stopping existing container..."
    docker stop test-world-local
    docker rm test-world-local
fi

# Run the container
print_info "Starting container..."
docker run -d \
    --name test-world-local \
    -p $PORT:3000 \
    -e ENVIRONMENT=$ENVIRONMENT \
    -e SERVICE_NAME=test-world \
    -e AWS_REGION=us-east-1 \
    $IMAGE_NAME:$IMAGE_TAG

print_status "Container started successfully"

# Wait for the application to start
print_info "Waiting for application to start..."
sleep 5

# Test the application
if curl -f http://localhost:$PORT/health > /dev/null 2>&1; then
    print_status "Application is healthy"
    echo -e "${GREEN}🌍 Application is running at: http://localhost:$PORT${NC}"
    echo -e "${GREEN}📊 Health check: http://localhost:$PORT/health${NC}"
    echo -e "${GREEN}🔧 API endpoint: http://localhost:$PORT/api/env${NC}"
else
    print_error "Application health check failed"
    print_info "Container logs:"
    docker logs test-world-local
    exit 1
fi

# Show container logs
if [ "$1" = "--logs" ]; then
    print_info "Container logs:"
    docker logs test-world-local
fi

echo -e "${GREEN}✨ Deployment completed successfully!${NC}"
echo -e "${YELLOW}To stop the container: docker stop test-world-local${NC}"
echo -e "${YELLOW}To view logs: docker logs test-world-local${NC}"
