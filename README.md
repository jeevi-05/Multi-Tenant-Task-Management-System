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
- <img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/922a3d3c-f678-49e3-b9ad-f1ee8b1ea9f6" />
<img width="1919" height="878" alt="image" src="https://github.com/user-attachments/assets/73ad58da-adef-4d6e-a1aa-ab39853e5d9d" />
<img width="1919" height="871" alt="Screenshot 2026-04-12 233914" src="https://github.com/user-attachments/assets/37b4d328-9d8b-4df9-9250-1fecbaf3069d" />

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
