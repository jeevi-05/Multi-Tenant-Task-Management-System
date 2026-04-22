# WorkOrbit — Docker Setup
WorkOrbit is a multi-tenant task management system with role-based access control, activity tracking, and JWT authentication, fully containerized using Docker.

## Prerequisites
- Docker Desktop installed
- Docker Compose v2+



## Tech Stack

- Frontend: React + Tailwind CSS
- Backend: Spring Boot
- Database: MySQL
- Auth: JWT
- Containerization: Docker + Docker Compose


## Quick Start

```bash
# 1. Build and start all services
docker-compose up --build

# 2. Access the app
Frontend: http://localhost:3000
Backend:  http://localhost:8080
MySQL:    localhost:3306
```

## Services

| Service  | Port | Description |
|----------|------|-------------|
| frontend | 3000 | React app served by Nginx |
| backend  | 8080 | Spring Boot REST API |
| mysql    | 3306 | MySQL 8.0 database |

## Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ http://localhost:3000
       ▼
┌─────────────────────────────┐
│  Nginx (frontend container) │
│  - Serves React build       │
│  - Proxies /auth, /tasks,   │
│    /activity → backend      │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Spring Boot (backend)      │
│  - REST APIs                │
│  - JWT auth                 │
│  - Multi-tenant logic       │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  MySQL (mysql container)    │
│  - taskmanagement DB        │
│  - Persistent volume        │
└─────────────────────────────┘
```

## Environment Variables

Edit `.env` file:

```env
MYSQL_DATABASE=taskmanagement
MYSQL_ROOT_PASSWORD=root
DB_URL=jdbc:mysql://mysql:3306/taskmanagement?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=root
JWT_SECRET=<your-secret>
JWT_EXPIRATION=86400000
```

## Commands

```bash
# Build images
docker-compose build

# Start services (detached)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (deletes DB data)
docker-compose down -v

# Rebuild specific service
docker-compose build backend
docker-compose up -d backend
```

## Development vs Production

**Local dev (without Docker):**
- Backend: `mvn spring-boot:run` (uses localhost MySQL)
- Frontend: `npm start` (uses proxy to localhost:8080)
- `.env.development` sets `REACT_APP_API_URL=http://localhost:8080`

**Docker (production-like):**
- All services in containers
- Frontend calls backend via Nginx proxy
- `.env.production` sets `REACT_APP_API_URL=` (empty = same origin)
- Backend connects to `mysql:3306` (Docker service name)

## Data Persistence

MySQL data is stored in a Docker volume:
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect multi-tenant-task-management-system_mysql-data

# Backup database
docker exec workorbit-mysql mysqldump -u root -proot taskmanagement > backup.sql

# Restore database
docker exec -i workorbit-mysql mysql -u root -proot taskmanagement < backup.sql
```

## Troubleshooting

**Backend can't connect to MySQL:**
- Wait 30s for MySQL healthcheck to pass
- Check logs: `docker-compose logs mysql`
- Verify `DB_URL` uses `mysql:3306` not `localhost:3306`

**Frontend shows 404 on API calls:**
- Check Nginx config proxies `/auth`, `/tasks`, `/activity`
- Verify backend is running: `docker-compose ps`
- Check logs: `docker-compose logs backend`

**Port already in use:**
```bash
# Change ports in docker-compose.yml
ports:
  - "3001:80"   # frontend
  - "8081:8080" # backend
```

## Health Checks

Backend health endpoint (if Spring Actuator is enabled):
```
http://localhost:8080/actuator/health
```

MySQL health:
```bash
docker exec workorbit-mysql mysqladmin ping -h localhost -u root -proot
```

## Clean Restart

```bash
# Stop everything, remove containers and volumes
docker-compose down -v

# Remove images
docker rmi workorbit-backend workorbit-frontend

# Fresh start
docker-compose up --build
```

## Production Deployment

For production:
1. Change `.env` passwords
2. Use secrets management (Docker Swarm secrets or Kubernetes)
3. Add SSL/TLS termination (Nginx or reverse proxy)
4. Use managed MySQL (AWS RDS, Azure Database)
5. Set `spring.jpa.show-sql=false`
6. Add monitoring (Prometheus, Grafana)
