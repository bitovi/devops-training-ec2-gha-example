# Essential Files Summary

## Kept Files (16 total)

### GitHub Actions Workflows
- `.github/workflows/ecr-handler.yaml` - ECR deployment workflow
- `.github/workflows/simple-d2ec2.yaml` - EC2 deployment workflow

### SigNoz Docker Deployment
- `signoz/deploy/docker/docker-compose.yaml` - Main deployment file
- `signoz/deploy/docker/otel-collector-config.yaml` - OpenTelemetry collector configuration
- `signoz/deploy/docker/.env` - Environment variables

### Configuration Files (now inside docker/common/)
- `signoz/deploy/docker/common/clickhouse/cluster.xml` - ClickHouse cluster config
- `signoz/deploy/docker/common/clickhouse/config.xml` - ClickHouse main config
- `signoz/deploy/docker/common/clickhouse/custom-function.xml` - Custom functions
- `signoz/deploy/docker/common/clickhouse/users.xml` - User configurations
- `signoz/deploy/docker/common/clickhouse/user_scripts/.gitkeep` - Placeholder for user scripts
- `signoz/deploy/docker/common/signoz/otel-collector-opamp-config.yaml` - OpAMP config
- `signoz/deploy/docker/common/signoz/prometheus.yml` - Prometheus configuration
- `signoz/deploy/docker/common/dashboards/.gitkeep` - Placeholder for dashboards

### Repository Files
- `.gitignore` - Git ignore rules
- `README.md` - Documentation
- `CLEANUP_SUMMARY.md` - This summary file

## Structure Improvements

✅ **Moved `common/` folder into `docker/` folder** for better organization
✅ **Updated all volume mount paths** from `../common/` to `./common/`
✅ **Self-contained Docker deployment** - everything needed is in one directory

## Removed Content

### Source Code & Development
- All Go source code (`cmd/`, `pkg/`, `ee/`)
- Frontend application (`frontend/`)
- Development tools (`.devenv/`, `.golangci.yml`, `Makefile`)
- Dependencies (`go.mod`, `go.sum`, `node_modules/`)

### Documentation & Metadata
- README files in multiple languages
- `CHANGELOG.md`, `LICENSE`, `SECURITY.md`
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`

### Build & CI/CD
- Original `.github/` workflows (18 files)
- Build scripts (`scripts/`)
- Test files (`tests/`)
- Grammar files (`grammar/`)

### Deployment Variants
- Docker Swarm deployment (`deploy/docker-swarm/`)
- HA configurations (`docker-compose.ha.yaml`)
- Generator scripts (`deploy/docker/generator/`)
- ClickHouse setup scripts (`deploy/docker/clickhouse-setup/`)
- Install scripts (`deploy/install.sh`)

### Other
- Templates (`templates/`)
- Documentation (`docs/`)
- Configuration files for development
- Root-level `docker-compose.yaml` (duplicate)

## Result
Reduced from **10,428+ files** to **16 essential files** with improved structure:
1. ✅ SigNoz Docker deployment (self-contained in `signoz/deploy/docker/`)
2. ✅ GitHub Actions workflows for AWS ECR/EC2
3. ✅ Clean repository structure with logical organization
