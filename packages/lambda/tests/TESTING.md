# Lambda Testing Guide

This document provides comprehensive **LOCAL-ONLY** testing strategies for the LEO Lambda function. All tests run locally with mocked dependencies to ensure fast, reliable testing without external dependencies.

## 🏗️ Setup

Navigate to the tests directory and install dependencies:

```bash
cd packages/lambda/tests
npm install
```

## 🧪 Testing Methods

### 1. Unit Tests (Primary Testing Method)

Run comprehensive unit tests with mocked services:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch
```

**Coverage includes:**
- Environment variable validation
- Event structure validation
- API call success/failure scenarios
- Retry logic
- Error handling
- Different file types and paths

### 2. Local Integration Tests

Test the Lambda function locally with completely mocked API calls:

```bash
npm run test:local
```

This script runs multiple test scenarios with mocked responses:
- Valid events with all required data
- Missing bucket/key scenarios
- Empty events
- Missing environment variables

**Note**: All API calls are mocked - no external network requests are made.

## 📁 Test Files Structure

```
├── index.test.js              # Unit tests with mocked dependencies
├── test-local.js              # Local testing script with mocked API calls
├── test-events/               # Sample Lambda events
│   ├── s3-event-valid.json
│   └── s3-event-missing-bucket.json
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Test environment setup
└── TESTING.md                 # This guide
```

## 🎯 Test Scenarios Covered

### Unit Tests
- ✅ Environment variable validation
- ✅ Event structure validation (missing bucket/key)
- ✅ API call success scenarios (mocked)
- ✅ API call failure and retry logic (mocked)
- ✅ Network error handling (mocked)
- ✅ Different file types and paths
- ✅ HTTP status code handling (mocked)

### Local Integration Tests
- ✅ Complete Lambda handler execution (mocked API)
- ✅ Event processing workflow
- ✅ Error scenarios with mocked failures
- ✅ End-to-end function logic verification

## 🔧 Test Configuration

### Environment Variables for Testing

```bash
export API_ENDPOINT="https://api.example.com/documents"  # Mocked endpoint
export AWS_REGION="us-east-1"
```

### Mocking Strategy

- **Unit tests**: Use Jest mocks for all external dependencies
- **Local tests**: Use custom fetch mock for API calls
- **No AWS calls**: All AWS services are mocked/simulated

## 📊 Coverage Report

After running `npm run test:coverage`, open `coverage/lcov-report/index.html` to see detailed coverage report.

Current coverage: **100%** of code paths tested.

## 🚨 Testing Benefits

### Local-Only Advantages
- **Fast**: Tests run in milliseconds without network delays
- **Reliable**: No dependency on external services or network conditions
- **Cost-free**: No AWS charges or API rate limiting
- **Offline**: Can run tests without internet connection
- **Consistent**: Same results every time, regardless of external factors

### Mock Quality
- **Comprehensive**: All external dependencies are mocked
- **Realistic**: Mocks simulate real API responses and errors
- **Configurable**: Easy to test different scenarios by changing mock responses

## 📈 Performance Testing

Monitor test execution performance:

```bash
# Run tests with timing information
npm test -- --verbose

# Check test coverage performance
npm run test:coverage -- --verbose
```

## 🎉 Quick Test Command Reference

```bash
# Fast unit tests (primary method)
npm test

# Development with auto-rerun
npm run test:watch

# Full test coverage
npm run test:coverage

# Local simulation with mocked APIs
npm run test:local
```

## 🔒 Security Benefits

Since all tests are local:
- No AWS credentials needed for testing
- No risk of accidentally hitting production services
- No exposure of sensitive data during testing
- Safe to run in any environment

## 🚀 CI/CD Integration

These tests are perfect for CI/CD pipelines:
- **Fast execution**: Complete test suite runs in seconds
- **No external dependencies**: No AWS setup required
- **Consistent**: Same results in any environment
- **Secure**: No credentials or external access needed
