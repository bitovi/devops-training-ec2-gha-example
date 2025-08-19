const fs = require('fs')
const path = require('path')

describe('Docker Configuration', () => {
  test('Dockerfile should exist', () => {
    const dockerfilePath = path.join(__dirname, '..', 'Dockerfile')
    expect(fs.existsSync(dockerfilePath)).toBe(true)
  })

  test('Dockerfile should contain required instructions', () => {
    const dockerfilePath = path.join(__dirname, '..', 'Dockerfile')
    const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8')

    expect(dockerfileContent).toContain('FROM node:')
    expect(dockerfileContent).toContain('WORKDIR')
    expect(dockerfileContent).toContain('COPY package')
    expect(dockerfileContent).toContain('RUN npm ci')
    expect(dockerfileContent).toContain('EXPOSE 3000')
    expect(dockerfileContent).toContain('HEALTHCHECK')
    expect(dockerfileContent).toContain('CMD')
  })

  test('package.json should exist and have required scripts', () => {
    const packagePath = path.join(__dirname, '..', 'package.json')
    expect(fs.existsSync(packagePath)).toBe(true)

    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    expect(packageContent.scripts).toHaveProperty('start')
    expect(packageContent.scripts).toHaveProperty('test')
    expect(packageContent.scripts).toHaveProperty('lint')
  })
})

describe('ECS Task Definition', () => {
  test('Task definition template should exist', () => {
    const taskDefPath = path.join(__dirname, '..', 'task-definition.template.json')
    expect(fs.existsSync(taskDefPath)).toBe(true)
  })

  test('Task definition template should have required fields', () => {
    const taskDefPath = path.join(__dirname, '..', 'task-definition.template.json')
    const taskDefContent = JSON.parse(fs.readFileSync(taskDefPath, 'utf8'))

    expect(taskDefContent).toHaveProperty('family')
    expect(taskDefContent).toHaveProperty('networkMode', 'awsvpc')
    expect(taskDefContent).toHaveProperty('requiresCompatibilities')
    expect(taskDefContent.requiresCompatibilities).toContain('FARGATE')
    expect(taskDefContent).toHaveProperty('containerDefinitions')
    expect(Array.isArray(taskDefContent.containerDefinitions)).toBe(true)
    expect(taskDefContent.containerDefinitions.length).toBeGreaterThan(0)

    const container = taskDefContent.containerDefinitions[0]
    expect(container).toHaveProperty('name')
    expect(container).toHaveProperty('image')
    expect(container).toHaveProperty('portMappings')
    expect(container).toHaveProperty('healthCheck')
    expect(container).toHaveProperty('logConfiguration')
  })
})
