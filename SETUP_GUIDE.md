# 🚀 test Hello World - Setup Guide

This guide will help you set up and deploy the test Hello World application.

## 📋 Prerequisites

- Docker installed and running
- Node.js 18+ installed
- AWS CLI configured (for deployment)
- GitHub repository with appropriate permissions

## 🔧 Repository Configuration

### 1. GitHub Repository Variables

Configure these variables in your GitHub repository settings (`Settings > Secrets and variables > Actions > Variables`):

```bash
AWS_REGION=us-east-1
ECR_REPOSITORY=test-world
ECS_SERVICE=test-world-service
ECS_CLUSTER=test-cluster
TASK_DEFINITION_FAMILY=test-world-task
TASK_CPU=256
TASK_MEMORY=512

CONTAINER_NAME=test-world
CLOUDWATCH_LOG_GROUP=/ecs/test-world
CLOUDWATCH_LOG_STREAM_PREFIX=ecs
```

### 2. GitHub Repository Secrets

Configure these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions > Secrets`):

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## 🏗️ AWS Infrastructure Setup

### 1. Create ECR Repository

```bash
aws ecr create-repository \
    --repository-name test-world \
    --region us-east-1
```

### 2. Create ECS Cluster

```bash
aws ecs create-cluster \
    --cluster-name test-cluster \
    --capacity-providers FARGATE \
    --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1
```

### 3. Create CloudWatch Log Group

```bash
aws logs create-log-group \
    --log-group-name /ecs/test-world \
    --region us-east-1
```

### 4. Create IAM Roles

#### ECS Task Execution Role

```bash
aws iam create-role \
    --role-name ecsTaskExecutionRole \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ecs-tasks.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'

aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

#### ECS Task Role (optional, for application-specific permissions)

```bash
aws iam create-role \
    --role-name ecsTaskRole \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ecs-tasks.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'
```

### 5. Create ECS Service

After the first successful deployment, create the ECS service:

```bash
aws ecs create-service \
    --cluster test-cluster \
    --service-name test-world-service \
    --task-definition test-world-task:1 \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-12345678],securityGroups=[sg-12345678],assignPublicIp=ENABLED}"
```

## 🏃‍♂️ Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm start
```

### 3. Run Tests

```bash
npm test
```

### 4. Run Linting

```bash
npm run lint
```

### 5. Local Docker Deployment

Use the provided script for easy local testing:

```bash
./deploy-local.sh
```

Options:
- `./deploy-local.sh --skip-tests` - Skip running tests
- `./deploy-local.sh --logs` - Show container logs after deployment

## 🚀 Deployment Process

### Manual Deployment

1. Go to GitHub Actions in your repository
2. Select "Deploy to Amazon ECS" workflow
3. Click "Run workflow"
4. Choose environment (staging/production)
5. Enter image tag (e.g., v1.0.0, latest, commit SHA)
6. Click "Run workflow"

### Automatic Deployment

The workflow can be called from other workflows using:

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/build_and_deploy.yaml
    with:
      image_tag: ${{ github.sha }}
      environment: staging
    secrets: inherit
```

## 🔍 Monitoring and Troubleshooting

### Check Application Health

```bash
curl http://your-load-balancer/health
```

### View ECS Service Status

```bash
aws ecs describe-services \
    --cluster test-cluster \
    --services test-world-service
```

### View CloudWatch Logs

```bash
aws logs tail /ecs/test-world --follow
```

### Common Issues

1. **ECR Permission Denied**
   - Ensure AWS credentials are correctly configured
   - Check ECR repository exists and permissions are set

2. **ECS Task Not Starting**
   - Check task definition CPU/memory limits
   - Verify VPC and security group configuration
   - Check CloudWatch logs for container errors

3. **Health Check Failing**
   - Ensure port 3000 is exposed and accessible
   - Check security group allows inbound traffic on port 3000
   - Verify container is actually starting (check logs)

## 📊 Workflow Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Code Push     │───▶│   Test & Lint   │───▶│   Build Image   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Slack Notify    │◀───│   Deploy ECS    │◀───│   Push to ECR   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Security Considerations

- Application runs as non-root user (UID 1001)
- Security headers enabled via Helmet.js
- Regular dependency security audits
- Container image vulnerability scanning
- Minimal container image (Alpine-based)

## 📈 Performance Optimization

- Multi-stage Docker builds (can be added)
- Health checks for zero-downtime deployments
- CloudWatch monitoring integration
- Container resource limits configured

## 🎯 Next Steps

1. Set up Application Load Balancer for production traffic
2. Configure auto-scaling based on CPU/memory metrics
3. Add SSL/TLS termination at the load balancer
4. Set up CloudWatch alarms for monitoring
5. Implement blue-green deployment strategy
6. Add integration tests for the full deployment pipeline

## 📞 Support

For issues or questions:
1. Check CloudWatch logs first
2. Review GitHub Actions workflow logs
3. Verify AWS resource configuration
4. Check this documentation for common solutions

Happy deploying! 🎉
