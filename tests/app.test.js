const request = require('supertest')
const app = require('../server')

describe('Hello World Application', () => {
  let server

  beforeAll(() => {
    // Set test environment
    process.env.ENVIRONMENT = 'test'
    process.env.PORT = '0' // Use random available port for testing
  })

  afterAll((done) => {
    if (server) {
      server.close(done)
    } else {
      done()
    }
  })

  describe('Health Check', () => {
    test('GET /health should return 200 and health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toMatchObject({
        status: 'healthy',
        environment: 'test'
      })
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
    })
  })

  describe('Main Route', () => {
    test('GET / should return 200 and HTML content', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)

      expect(response.text).toContain('Hello World!')
      expect(response.text).toContain('test') // environment
      expect(response.headers['content-type']).toMatch(/html/)
    })
  })

  describe('API Endpoint', () => {
    test('GET /api/env should return environment information', async () => {
      const response = await request(app)
        .get('/api/env')
        .expect(200)

      expect(response.body).toMatchObject({
        environment: 'test'
      })
      expect(response.body).toHaveProperty('nodeVersion')
      expect(response.body).toHaveProperty('platform')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('hostname')
      expect(response.body).toHaveProperty('customVars')
    })
  })

  describe('Error Handling', () => {
    test('GET /nonexistent should return 404', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404)

      expect(response.body).toMatchObject({
        error: 'Not found',
        environment: 'test'
      })
    })
  })

  describe('Security Headers', () => {
    test('Should include security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      // Check for helmet security headers
      expect(response.headers).toHaveProperty('x-content-type-options')
      expect(response.headers).toHaveProperty('x-frame-options')
    })
  })
})
