const { handler } = require('../code/index');
const nock = require('nock');

// Mock fetch globally
global.fetch = jest.fn();

describe('Lambda Handler Tests', () => {
  beforeEach(() => {
    // Reset fetch mock
    fetch.mockReset();
    
    // Set required environment variables
    process.env.API_ENDPOINT = 'https://api.example.com/documents';
    process.env.AWS_REGION = 'us-east-1';
    
    // Clear console methods to reduce test noise
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    console.log.mockRestore();
    console.error.mockRestore();
    
    // Clean up nock
    nock.cleanAll();
  });

  describe('Environment Variable Validation', () => {
    test('should throw error when API_ENDPOINT is missing', async () => {
      delete process.env.API_ENDPOINT;
      
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'test-file.pdf' }
        }
      };

      await expect(handler(event)).rejects.toThrow('API_ENDPOINT environment variable is required');
    });
  });

  describe('Event Validation', () => {
    test('should return skipped status when bucket is missing', async () => {
      const event = {
        detail: {
          object: { key: 'test-file.pdf' }
        }
      };

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'skipped',
        reason: 'Bucket or key missing from event',
        details: { bucket: false, key: true }
      });
    });

    test('should return skipped status when key is missing', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' }
        }
      };

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'skipped',
        reason: 'Bucket or key missing from event',
        details: { bucket: true, key: false }
      });
    });

    test('should handle empty event detail', async () => {
      const event = {};

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'skipped',
        reason: 'Bucket or key missing from event',
        details: { bucket: false, key: false }
      });
    });
  });

  describe('S3 Event Processing', () => {
    test('should successfully process valid S3 event', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'documents/test-file.pdf' }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve('{"success": true}')
      });

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'success',
        documentReference: 'documents/test-file.pdf',
        message: 'Document processing completed successfully'
      });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/documents',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentStorageType: 's3',
            documentReference: 'documents/test-file.pdf'
          })
        }
      );
    });

    test('should process file in root directory', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'document.pdf' }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve('{"success": true}')
      });

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'success',
        documentReference: 'document.pdf',
        message: 'Document processing completed successfully'
      });
    });
  });

  describe('API Call Success Cases', () => {
    test('should successfully process document and call API', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'documents/test-file.pdf' }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve('{"success": true}')
      });

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'success',
        documentReference: 'documents/test-file.pdf',
        message: 'Document processing completed successfully'
      });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/documents',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentStorageType: 's3',
            documentReference: 'documents/test-file.pdf'
          })
        }
      );
    });

    test('should handle different file types', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'uploads/invoice.xlsx' }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve('{"processed": true}')
      });

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'success',
        documentReference: 'uploads/invoice.xlsx',
        message: 'Document processing completed successfully'
      });
    });
  });

  describe('API Call Failure Cases', () => {
    test('should throw error when API call fails after retries', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'test-file.pdf' }
        }
      };

      // Mock fetch to fail all attempts
      fetch.mockRejectedValue(new Error('Network error'));

      await expect(handler(event)).rejects.toThrow('API call failed after retries');
    });

    test('should throw error when API returns 500 status', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'test-file.pdf' }
        }
      };

      fetch.mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error')
      });

      await expect(handler(event)).rejects.toThrow('API call failed after retries');
    });

    test('should throw error when API returns 404 status', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'test-file.pdf' }
        }
      };

      fetch.mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not Found')
      });

      await expect(handler(event)).rejects.toThrow('API call failed after retries');
    });
  });

  describe('Retry Logic', () => {
    test('should succeed after initial failure', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'test-file.pdf' }
        }
      };

      // First call fails, second succeeds
      fetch
        .mockRejectedValueOnce(new Error('Network timeout'))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          text: () => Promise.resolve('{"success": true}')
        });

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'success',
        documentReference: 'test-file.pdf',
        message: 'Document processing completed successfully'
      });

      expect(fetch).toHaveBeenCalledTimes(2);
    });

    test('should retry on HTTP 500 errors', async () => {
      const event = {
        detail: {
          bucket: { name: 'test-bucket' },
          object: { key: 'test-file.pdf' }
        }
      };

      // First call returns 500, second succeeds
      fetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          text: () => Promise.resolve('Internal Server Error')
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          text: () => Promise.resolve('{"success": true}')
        });

      const result = await handler(event);
      
      expect(result).toEqual({
        status: 'success',
        documentReference: 'test-file.pdf',
        message: 'Document processing completed successfully'
      });

      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
