// Jest setup file
// Set default environment variables for tests
process.env.AWS_REGION = 'us-east-1';
process.env.API_ENDPOINT = 'https://api.example.com/documents';

// Increase timeout for integration tests
jest.setTimeout(30000);
