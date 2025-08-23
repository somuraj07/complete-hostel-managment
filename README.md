# 🏨 HostelGuard – Complete Hostel Management System (Outpass Automation)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-Authentication-000000?logo=auth0&logoColor=white)](https://authjs.dev/)

**HostelGuard** is a modern full-stack web application built with **Next.js, Tailwind CSS, PostgreSQL, and Prisma** to automate hostel outpass management.  
It provides a **secure, transparent, and efficient approval system** for students, wardens, and security staff — reducing manual paperwork and improving security.

---

## ✨ Overview

- **Multi-role system**: Students, Wardens, and Gatekeepers
- **Automated time stamping** for in/out tracking
- **Integrated facial recognition** for gate validation
- **Downloadable reports** and **live student movement logs**
- **80% less manual workload** for approvals
- Responsive UI with **role-based routing** and SSR/CSR

---

## 🛠️ Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | Next.js (App Router), React.js, Tailwind CSS |
| **Backend**  | Node.js, Next.js API Routes |
| **Database** | PostgreSQL |
| **ORM**      | Prisma |
| **Auth**     | Auth.js (NextAuth) |
| **Deployment** | Vercel |
| **Other**    | Client-side & Server-side Rendering, Role-based Access |

---

## 🔍 Features

### 🧑‍🎓 Student Panel
- Submit leave requests with trip details
- Track approval status
- View leave history

### 🧑‍🏫 Warden Dashboard
- Review and approve leave requests (`submit = true`)
- Monitor student leave records

### 🛡️ Watchman Interface
- **Come Out** → Records `comeoutTime`
- **Come In** → Records `comeinTime`
- Facial recognition verification for entry/exit

### 📊 Reports & Logs
- Downloadable leave reports
- Live dashboard of student movements

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/somuraj07/complete-hostel-managment.git
cd complete-hostel-managment

# Install dependencies
npm install

# Set up environment variables in .env
DATABASE_URL="postgresql://user:password@host:port/dbname"
NEXTAUTH_SECRET="your_secret_key"

# Apply Prisma migrations
npx prisma migrate dev

# Start development server
npm run dev
