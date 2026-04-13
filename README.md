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
<img width="1347" height="872" alt="Screenshot 2026-04-13 223644" src="https://github.com/user-attachments/assets/7239d2bd-4d2a-44b7-a4d8-dfa522d454c8" />
<img width="1341" height="931" alt="Screenshot 2026-04-13 223704" src="https://github.com/user-attachments/assets/cd4da2a1-6595-4f69-b123-4c3566c1b5b9" />
- Frontend-Backend Integration
<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/922a3d3c-f678-49e3-b9ad-f1ee8b1ea9f6" />
<img width="1919" height="878" alt="image" src="https://github.com/user-attachments/assets/73ad58da-adef-4d6e-a1aa-ab39853e5d9d" />
<img width="1919" height="871" alt="Screenshot 2026-04-12 233914" src="https://github.com/user-attachments/assets/37b4d328-9d8b-4df9-9250-1fecbaf3069d" />

---

### 🚧 Upcoming Development Plan

#### ✅ Phase 2 (Completed)
- Task Entity
<img width="1857" height="947" alt="image" src="https://github.com/user-attachments/assets/9c1a0660-22f4-408f-8a57-7f15b815c25c" />
- CRUD APIs
<img width="1271" height="838" alt="Screenshot 2026-04-13 223424" src="https://github.com/user-attachments/assets/22f940f6-a3b9-4a51-a93c-2aaceef74551" />
<img width="1344" height="926" alt="Screenshot 2026-04-13 223439" src="https://github.com/user-attachments/assets/ba2bdd93-78f0-4b8b-b27d-eda4579fdaed" />
- Multi-tenant filtering
- UI Update
<img width="1919" height="882" alt="Screenshot 2026-04-13 144532" src="https://github.com/user-attachments/assets/8b6220b3-0f7f-4658-a4c5-28c6a25620e6" />
<img width="1919" height="870" alt="Screenshot 2026-04-13 144608" src="https://github.com/user-attachments/assets/eeb7d472-d5a9-46d3-af85-46dbda1c1297" />
<img width="1919" height="863" alt="Screenshot 2026-04-13 144700" src="https://github.com/user-attachments/assets/0cef237d-bc6b-4be4-8110-8e83bce897ec" />

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
