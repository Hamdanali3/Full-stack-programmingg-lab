# Customer Relationship Management System

Final Term Project for Full Stack Programming Lab.

## Student Information

- Student Name: HAMDAN ALI
- University: Air University
- Department/Area: Creative Technology
- Class: BSSE VI-B
- Semester: Spring 2026
- Subject: Full Stack Programming Lab

## Project Overview

This project is a professional CRM system built with the MERN + Next.js stack. It supports secure JWT authentication, protected dashboard access, customer CRUD, search and filtering, invoice generation with PDF download, toast notifications, and a simple rule-based chatbot without any external AI API.

## Features

- User registration and login with JWT
- Password hashing using bcryptjs
- Protected dashboard and protected backend APIs
- Customer create, read, update, and delete
- Customer status tracking: Lead, Active, Inactive
- Search customers by name
- Filter customers by status
- Seed script with 15 customer records
- Invoice generation and PDF download
- Toast notifications for success and error states
- Rule-based chatbot with predefined CRM commands
- Responsive Next.js dashboard UI

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Axios, React Hot Toast, jsPDF
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv, cors, helmet, express-rate-limit, express-validator
- Database: MongoDB Atlas or local MongoDB

## Folder Structure

```text
Final_Term_Project_CRM/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      utils/
      validators/
      server.js
    .env.example
    package.json
  frontend/
    app/
    components/
    contexts/
    lib/
    services/
    types/
    public/
    .env.local.example
    package.json
  README.md
  PROJECT_REPORT_GUIDE.md
```

## Environment Variables

Create `backend/.env` from `backend/.env.example`. For local MongoDB, this value works if MongoDB is installed and running:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/final_term_crm
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

Create `frontend/.env.local` from `frontend/.env.local.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend Setup

Start MongoDB before running the backend.

Option A: local MongoDB installed on Windows:

```text
mongodb://127.0.0.1:27017/final_term_crm
```

Option B: Docker, from the `Final_Term_Project_CRM` folder:

```bash
docker compose up -d
```

Option C: MongoDB Atlas:

Paste your Atlas connection string into `backend/.env`.

## Windows Quick Start

If PowerShell says `npm` is not recognized, use the helper scripts from the project root:

```powershell
cd C:\Fullstack_Final_Term_Project\Final_Term_Project_CRM
.\setup-and-run.ps1
```

After setup completes, open two PowerShell terminals:

```powershell
cd C:\Fullstack_Final_Term_Project\Final_Term_Project_CRM
.\run-backend.ps1
```

```powershell
cd C:\Fullstack_Final_Term_Project\Final_Term_Project_CRM
.\run-frontend.ps1
```

To seed only:

```powershell
cd C:\Fullstack_Final_Term_Project\Final_Term_Project_CRM
.\seed-database.ps1
```

If script execution is blocked, run this once in the same PowerShell window:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

```bash
cd Final_Term_Project_CRM/backend
npm install
npm run seed
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

If login shows a network error, the backend is not running or MongoDB is not connected. Start MongoDB first, confirm port `27017` is open for local MongoDB, then run `npm run seed` and `npm run dev` again.

Seeded demo login:

```text
Email: hamdan.crm@example.com
Password: Password123
```

## Frontend Setup

Open a second terminal:

```bash
cd Final_Term_Project_CRM/frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

If port 3000 is already used, run the frontend on another port:

```bash
npm run dev -- -p 3012
```

## API Endpoints

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Customers:

- `GET /api/customers`
- `GET /api/customers?search=ali&status=Active`
- `GET /api/customers/:id`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

Invoices:

- `GET /api/invoices`
- `POST /api/invoices`

## Chatbot Commands

- `help`
- `show customers`
- `add customer`
- `open invoice`
- `customer status`
- `logout`

Unknown commands return:

```text
Sorry, I can only respond to predefined CRM commands. Type help to see available commands.
```

## Screenshots Placeholder

Add these screenshots to the final Word/PDF report:

- GitHub repository page
- Project folder structure
- Login page
- Registration page
- Dashboard page
- Customer list with 15 records
- Add customer form
- Edit customer form
- Search/filter results
- Invoice generation page
- Downloaded invoice PDF
- Toast notifications
- Chatbot command responses
- MongoDB customer collection
- Backend terminal running
- Frontend terminal running

## GitHub Submission Note

Repository name required by the instructor:

```text
Full-Stack-Programming-Lab
```

Project folder inside the repository:

```text
Final_Term_Project_CRM
```

Add the instructor as collaborator:

```text
sharifali.aulecturer@gmail.com
```

Then push the completed work:

```bash
git add .
git commit -m "Complete Final Term CRM Project"
git push origin main
```
