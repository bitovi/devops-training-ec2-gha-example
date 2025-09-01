# DevOps Training - Grafana Observability Stack

Complete **Grafana observability stack** with Prometheus, Loki, Tempo, and Grafana.

## 🏗️ Stack Components

- **📊 Grafana** (11.1.4) - Visualization and dashboards
- **📈 Prometheus** (2.53.1) - Metrics collection and storage  
- **📝 Loki** (3.1.1) - Log aggregation and storage
- **🔍 Tempo** (2.5.0) - Distributed tracing storage

## 🚀 Quick Start

```bash
# Start the stack
docker-compose up -d

# Check status
docker-compose ps
```

## 🌐 Access Services

- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Loki**: http://localhost:3100
- **Tempo**: http://localhost:3200

## 📡 OTLP Endpoints

- **gRPC**: localhost:4317
- **HTTP**: localhost:4318

## ✨ Key Features

✅ Latest stable versions
✅ Persistent volumes
✅ Custom network isolation
✅ OTLP receivers configured
✅ AWS EC2 deployment ready

## 🌩️ AWS Deployment

Deploys automatically to EC2 when pushed to `simple-grafana-stack` branch.

**Ports**: 3000, 9090, 3100, 3200, 4317, 4318
**Instance**: t3.medium (2 vCPU, 4GB RAM)
