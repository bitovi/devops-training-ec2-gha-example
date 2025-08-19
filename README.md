# SWP Hello World Application

A simple Node.js application that displays environment information, containerized with Docker and deployed to AWS ECS using GitHub Actions.

## Features

- 🌍 Hello World web application with environment display
- 🐳 Docker containerization
- 🚀 AWS ECS deployment with Fargate
- 🧪 Comprehensive testing suite
- 🔍 Code linting and security checks
- 📊 Health checks and monitoring
- 🔔 Slack notifications

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub        │───▶│   GitHub        │───▶│   AWS ECS       │
│   Repository    │    │   Actions       │    │   Fargate       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Amazon ECR    │
                       │   Registry      │
                       └─────────────────┘
```

## Quick Start

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd swp-iac
   npm install
   ```

2. **Run locally:**
   ```bash
   npm start
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

### Docker Development

1. **Build the image:**
   ```bash
   docker build -t swp-hello-world .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 -e ENVIRONMENT=development swp-hello-world
   ```

3. **Access the application:**
   - Main page: http://localhost:3000
   - Health check: http://localhost:3000/health
   - API endpoint: http://localhost:3000/api/env

## Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Application environment (development/staging/production) | `development` |
| `PORT` | Port number for the application | `3000` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `SERVICE_NAME` | Service name | `swp-hello-world` |
| `APP_VERSION` | Application version | `1.0.0` |

## GitHub Actions Setup

### Repository Variables Required

Configure these variables in your GitHub repository settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_REGION` | AWS region | `us-east-1` |
| `ECR_REPOSITORY` | ECR repository name | `swp-hello-world` |
| `ECS_SERVICE` | ECS service name | `swp-hello-world-service` |
| `ECS_CLUSTER` | ECS cluster name | `swp-cluster` |
| `TASK_DEFINITION_FAMILY` | Task definition family | `swp-hello-world-task` |
| `TASK_CPU` | Task CPU units | `256` |
| `TASK_MEMORY` | Task memory (MB) | `512` |
| `EXECUTION_ROLE_ARN` | ECS execution role ARN | `arn:aws:iam::123456789012:role/ecsTaskExecutionRole` |
| `TASK_ROLE_ARN` | ECS task role ARN | `arn:aws:iam::123456789012:role/ecsTaskRole` |
| `CONTAINER_NAME` | Container name | `swp-hello-world` |
| `CLOUDWATCH_LOG_GROUP` | CloudWatch log group | `/ecs/swp-hello-world` |
| `CLOUDWATCH_LOG_STREAM_PREFIX` | Log stream prefix | `ecs` |

### Repository Secrets Required

Configure these secrets in your GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key ID |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key |
| `SLACK_WEBHOOK_URL` | Slack webhook URL for notifications |

### Workflow Triggers

The deployment workflow can be triggered:

1. **Manual dispatch:** From GitHub Actions UI
2. **Workflow call:** From other workflows

## Deployment Process

1. **Testing Phase:**
   - Install Node.js dependencies
   - Run ESLint for code quality
   - Run security audit
   - Execute test suite
   - Generate coverage reports

2. **Build Phase:**
   - Build Docker image
   - Push to Amazon ECR

3. **Deploy Phase:**
   - Use `envsub` to substitute environment variables in task definition
   - Deploy to Amazon ECS
   - Wait for service stability

4. **Notification Phase:**
   - Send Slack notifications for success/failure

## File Structure

```
├── .github/
│   └── workflows/
│       └── build_and_deploy.yaml     # Main deployment workflow
├── tests/
│   ├── app.test.js                   # Application tests
│   └── docker.test.js               # Docker configuration tests
├── .dockerignore                     # Docker ignore file
├── .env                             # Environment variables template
├── .eslintrc.js                     # ESLint configuration
├── Dockerfile                       # Docker configuration
├── jest.config.js                   # Jest test configuration
├── package.json                     # Node.js dependencies and scripts
├── server.js                        # Main application file
├── task-definition.template.json    # ECS task definition template
└── README.md                        # This file
```

## API Endpoints

- `GET /` - Main application page with environment display
- `GET /health` - Health check endpoint
- `GET /api/env` - JSON API for environment information

## Security Features

- Helmet.js for security headers
- Non-root user in Docker container
- Read-only root filesystem option
- Security auditing in CI/CD
- CORS protection

## Monitoring and Logging

- AWS CloudWatch integration
- Application health checks
- ECS service health monitoring
- Structured logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Submit a pull request

## License

MIT License - see LICENSE file for details
