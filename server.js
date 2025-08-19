const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const ENVIRONMENT = process.env.ENVIRONMENT || 'development'

// Security middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: ENVIRONMENT,
    uptime: process.uptime()
  })
})

// Main route
app.get('/', (req, res) => {
  const envInfo = {
    environment: ENVIRONMENT,
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname(),
    // Add more environment info as needed
    customVars: {
      awsRegion: process.env.AWS_REGION,
      serviceName: process.env.SERVICE_NAME,
      version: process.env.APP_VERSION || '1.0.0'
    }
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World - ${ENVIRONMENT}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: ${ENVIRONMENT === 'production' ? '#e8f5e8' : '#f0f0f0'};
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .environment {
                background: ${ENVIRONMENT === 'production' ? '#4CAF50' : '#2196F3'};
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                font-weight: bold;
                text-transform: uppercase;
            }
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            .info-card {
                background: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid ${ENVIRONMENT === 'production' ? '#4CAF50' : '#2196F3'};
            }
            .info-card h3 {
                margin: 0 0 10px 0;
                color: #333;
            }
            .info-card p {
                margin: 5px 0;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌍 Hello World!</h1>
            <div class="environment">${ENVIRONMENT}</div>
            
            <div class="info-grid">
                <div class="info-card">
                    <h3>Environment Info</h3>
                    <p><strong>Environment:</strong> ${envInfo.environment}</p>
                    <p><strong>Timestamp:</strong> ${envInfo.timestamp}</p>
                    <p><strong>Hostname:</strong> ${envInfo.hostname}</p>
                </div>
                
                <div class="info-card">
                    <h3>Runtime Info</h3>
                    <p><strong>Node Version:</strong> ${envInfo.nodeVersion}</p>
                    <p><strong>Platform:</strong> ${envInfo.platform}</p>
                    <p><strong>App Version:</strong> ${envInfo.customVars.version}</p>
                </div>
                
                <div class="info-card">
                    <h3>AWS Info</h3>
                    <p><strong>Region:</strong> ${envInfo.customVars.awsRegion || 'Not set'}</p>
                    <p><strong>Service:</strong> ${envInfo.customVars.serviceName || 'Not set'}</p>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 5px;">
                <h3>🚀 Application Status</h3>
                <p>This application is running in <strong>${ENVIRONMENT}</strong> environment.</p>
                <p>All environment variables are loaded from the .env file and container environment.</p>
            </div>
        </div>
    </body>
    </html>
  `)
})

// API endpoint for environment info
app.get('/api/env', (req, res) => {
  res.json({
    environment: ENVIRONMENT,
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname(),
    customVars: {
      awsRegion: process.env.AWS_REGION,
      serviceName: process.env.SERVICE_NAME,
      version: process.env.APP_VERSION || '1.0.0'
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    environment: ENVIRONMENT
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    environment: ENVIRONMENT
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📦 Environment: ${ENVIRONMENT}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/health`)
})

module.exports = app
