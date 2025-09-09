# LEO Lambda Repository

This repository contains the infrastructure and code for the LEO document processing Lambda function.

## 📁 Repository Structure

```
lambda/
├── code/           # Lambda function source code
│   └── index.js    # Main Lambda handler
├── terraform/      # Infrastructure as Code
│   └── main.tf     # Terraform configuration
├── scripts/        # Deployment and utility scripts
└── tests/          # All testing code and configuration
    ├── index.test.js         # Unit tests
    ├── test-local.js         # Local testing script
    ├── integration-test.sh   # Integration tests
    ├── test-events/          # Sample Lambda events
    ├── package.json          # Test dependencies
    ├── jest.config.js        # Jest configuration
    ├── jest.setup.js         # Test environment setup
    └── TESTING.md            # Testing documentation
```

## 🚀 Quick Start

### Deploy Infrastructure
```bash
cd packages/lambda/terraform
terraform init
terraform plan
terraform apply
```

### Run Tests
```bash
cd packages/lambda/tests
npm install
npm test
```

### Local Development
```bash
cd packages/lambda/tests
npm run test:local
```

## 📋 Components

### Lambda Function (`packages/lambda/code/`)
- **Purpose**: Processes S3 document upload events
- **Runtime**: Node.js 20.x
- **Handler**: `index.handler`
- **Triggers**: S3 EventBridge notifications

### Infrastructure (`packages/lambda/terraform/`)
- **Provider**: AWS
- **Resources**: S3 bucket, Lambda function, EventBridge rules, IAM roles
- **State**: Stored in S3 backend

### Testing Suite (`packages/lambda/tests/`)
- **Unit Tests**: Comprehensive test coverage with mocks
- **Local Tests**: Real API endpoint testing
- **Integration Tests**: End-to-end AWS testing
- **Test Events**: Sample Lambda events for testing

## 🔧 Development Workflow

1. **Make changes** to Lambda code in `packages/lambda/code/`
2. **Run tests** in `packages/lambda/tests/`
3. **Update infrastructure** in `packages/lambda/terraform/` if needed
4. **Deploy** using Terraform
5. **Verify** with integration tests

## 📖 Documentation

- [Testing Guide](packages/lambda/tests/TESTING.md) - Comprehensive testing documentation
- [Lambda Code](packages/lambda/code/index.js) - Well-documented Lambda function
- [Infrastructure](packages/lambda/terraform/main.tf) - Terraform configuration with variables and outputs
