# DevOps Training - EC2 & GitHub Actions Example

This repository contains a cleaned-up SigNoz deployment setup and GitHub Actions workflows for DevOps training purposes.

## Structure

- `.github/workflows/` - GitHub Actions workflows
  - `ecr-handler.yaml` - ECR registry deployment workflow
  - `simple-d2ec2.yaml` - EC2 deployment workflow
- `signoz/deploy/docker/` - SigNoz observability platform deployment
  - `docker-compose.yaml` - Main Docker Compose deployment file
  - `otel-collector-config.yaml` - OpenTelemetry collector configuration
  - `common/` - Shared configuration files
    - `clickhouse/` - ClickHouse database configurations
    - `signoz/` - SigNoz application configurations
    - `dashboards/` - Dashboard configurations

## Usage

### Running SigNoz Locally

```bash
cd signoz/deploy/docker
docker-compose up -d
```

SigNoz will be available at http://localhost:8080

### GitHub Actions

The workflows can be triggered manually or via push to specific branches:
- `ecr-handler.yaml` - Triggers on push to `simple-ecr` branch
- `simple-d2ec2.yaml` - Triggers on push to `simple-d2ec2` branch

## What was cleaned up

This repository was cleaned from the original SigNoz repository to include only the essential files needed for:
1. Docker Compose deployment
2. GitHub Actions workflows for AWS ECR and EC2 deployment
3. Essential configuration files

Removed:
- Source code (Go, frontend, etc.)
- Development tools and configs
- Documentation files
- Test files
- Docker Swarm configurations
- Generator scripts
- Build scripts and CI/CD configs from the original project

The `common` configuration folder was moved inside the `docker` folder for a cleaner, self-contained deployment structure.
