# Multi-Tenant Task Management System

## Project Overview
This is a full-stack web application where multiple organizations can manage their tasks securely.

Each user belongs to an organization, and data is isolated between organizations.

## Features
- User Authentication (JWT)
- Role-Based Access Control (Admin / Member)
- Multi-Tenant Architecture
- Task Management (Create, Update, Delete)
- Secure API Integration

##  Tech Stack
- Frontend: React
- Backend: Spring Boot
- Database: MYSQL
- Authentication: JWT

## 📈 Current Progress

### ✅ Phase 1 (Completed)
- User Entity
- Organization Entity
- JWT Authentication (Login/Register)
- Frontend-Backend Integration

---

### 🚧 Upcoming Development Plan

#### 🟡 Phase 2 (Day 2)
- Task Entity
- CRUD APIs
- Multi-tenant filtering

#### 🟡 Phase 3 (Day 3)
- Role-Based Access Control (Admin vs Member)

#### 🟡 Phase 4 (Day 4)
- React UI for Task Management

#### 🟡 Phase 5 (Day 5)
- Docker Setup (Containerization)

## How to Run

### Backend
```bash
cd springapp
mvn spring-boot:run

### Frontend
cd reactapp
npm install
npm start


---

## ✅ Step 3: Commit & Push

```bash
git add README.md
git commit -m "Added README with project overview"
git push
