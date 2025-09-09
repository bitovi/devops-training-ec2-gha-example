const { handler } = require('../code/index');

// For local testing, we mock fetch to avoid external calls
// This works without jest by creating a simple mock
global.fetch = function mockFetch(url, options) {
  return Promise.resolve({
    ok: true,
    status: 200,
    text: () => Promise.resolve('{"success": true, "message": "Local mock response"}')
  });
};

// Add reset function for compatibility
global.fetch.mockReset = () => {
  // No-op for this simple mock
};

global.fetch.mockResolvedValueOnce = (value) => {
  global.fetch = () => Promise.resolve(value);
};

// Set up environment variables for local testing
process.env.API_ENDPOINT = 'https://api.example.com/documents'; // Mock endpoint
process.env.AWS_REGION = 'us-east-1';

// Test cases
const testCases = [
  {
    name: 'Valid Event with Bucket and Key',
    event: {
      detail: {
        bucket: { name: 'my-test-bucket' },
        object: { key: 'documents/sample-document.pdf' }
      }
    },
    description: 'Tests successful processing with valid S3 event'
  },
  {
    name: 'Valid Event with Different File Type',
    event: {
      detail: {
        bucket: { name: 'my-test-bucket' },
        object: { key: 'uploads/spreadsheet.xlsx' }
      }
    },
    description: 'Tests processing of different file types'
  },
  {
    name: 'Valid Event with File in Root',
    event: {
      detail: {
        bucket: { name: 'my-test-bucket' },
        object: { key: 'document.pdf' }
      }
    },
    description: 'Tests processing of file in bucket root directory'
  },
  {
    name: 'Missing Bucket',
    event: {
      detail: {
        object: { key: 'documents/sample-document.pdf' }
      }
    },
    description: 'Tests handling of missing bucket in event'
  },
  {
    name: 'Missing Key',
    event: {
      detail: {
        bucket: { name: 'my-test-bucket' }
      }
    },
    description: 'Tests handling of missing object key in event'
  },
  {
    name: 'Empty Event',
    event: {},
    description: 'Tests handling of completely empty event'
  },
  {
    name: 'Missing API_ENDPOINT',
    event: {
      detail: {
        bucket: { name: 'my-test-bucket' },
        object: { key: 'documents/sample-document.pdf' }
      }
    },
    description: 'Tests handling of missing environment variable',
    beforeTest: () => {
      delete process.env.API_ENDPOINT;
    },
    afterTest: () => {
      process.env.API_ENDPOINT = 'https://api.example.com/documents';
    }
  }
];

async function runTests() {
  console.log('🚀 Starting Local Lambda Tests (No External Calls)\n');
  
  for (const testCase of testCases) {
    console.log(`📋 Test: ${testCase.name}`);
    console.log(`📝 Description: ${testCase.description}`);
    
    try {
      // Reset and setup fetch mock for each test
      if (global.fetch && global.fetch.mockReset) {
        global.fetch.mockReset();
        
        // Mock successful API response for valid events
        if (testCase.event.detail && testCase.event.detail.bucket && testCase.event.detail.object) {
          global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            text: () => Promise.resolve('{"success": true, "message": "Mocked API response"}')
          });
        }
      }
      
      // Run any setup
      if (testCase.beforeTest) {
        testCase.beforeTest();
      }
      
      console.log('📥 Input Event:', JSON.stringify(testCase.event, null, 2));
      
      const startTime = Date.now();
      const result = await handler(testCase.event);
      const endTime = Date.now();
      
      console.log('✅ Success!');
      console.log('📤 Result:', JSON.stringify(result, null, 2));
      console.log(`⏱️  Execution Time: ${endTime - startTime}ms`);
      
    } catch (error) {
      console.log('❌ Error Thrown:');
      console.log('📤 Error:', error.message);
    } finally {
      // Run any cleanup
      if (testCase.afterTest) {
        testCase.afterTest();
      }
    }
    
    console.log('─'.repeat(80));
    console.log();
  }
  
  console.log('🏁 All tests completed! (All API calls were mocked)');
}

// Run the tests
runTests().catch(console.error);
