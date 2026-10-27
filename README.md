# WinTech Digital Partner – Full Stack Application

A modern, high-performance landing page and web application for **WinTech Digital Partner**, unifying IT Training, Custom IT Services, and Distance Education.

---

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database**: [TiDB](https://en.pingcap.com/tidb/) (PingCAP Cloud / Serverless MySQL-compatible distributed SQL database) via `mysql2`

---

## 📁 Project Architecture

```
wintech-project/
├── client/                     # React.js Frontend (Vite)
│   ├── public/images/          # Student photos, device mockups, avatars
│   ├── src/
│   │   ├── components/         # Modular React Components
│   │   │   ├── Navbar.jsx      # Sticky navbar with search & enquiry triggers
│   │   │   ├── Hero.jsx        # Hero banner with value props & handwritten cursive note
│   │   │   ├── Brands.jsx      # WinTech, Gen Z Neural-X, GenSpark University
│   │   │   ├── Courses.jsx     # 3x3 tech course grid with dynamic backend fetch
│   │   │   ├── Services.jsx    # Dark high-tech section with 3D devices mockup
│   │   │   ├── DistanceEdu.jsx # Distance education programmes & UGC features
│   │   │   ├── WhyAndStories.jsx # Why choose us + Testimonial carousel
│   │   │   ├── Stats.jsx       # Animated counters on scroll
│   │   │   ├── CtaBanner.jsx   # Pre-footer CTA banner with WhatsApp
│   │   │   ├── Footer.jsx      # Comprehensive footer with contact details
│   │   │   ├── EnquiryModal.jsx# Stateful enquiry popup saving to TiDB
│   │   │   ├── SearchModal.jsx # Live instant course/service search
│   │   │   └── FloatingWhatsApp.jsx # Floating action with ripple animation
│   │   ├── App.jsx             # Main application orchestrator
│   │   ├── index.css           # Modern design system (Google Fonts, HSL colors, animations)
│   │   └── main.jsx
│   └── vite.config.js          # Port 3000 + Proxy to backend at http://localhost:5000
│
├── server/                     # Node.js + Express.js Backend
│   ├── config/
│   │   └── db.js               # TiDB connection pool (mysql2) + auto-table migration + fallback
│   ├── routes/
│   │   ├── enquiryRoutes.js    # POST /api/enquiries (stores directly in TiDB)
│   │   └── courseRoutes.js     # GET /api/courses (queries TiDB courses)
│   ├── server.js               # Express application on port 5000
│   ├── .env.example            # TiDB Cloud configuration template
│   └── .env                    # Active environment variables
│
└── package.json                # Root scripts to run both client and server concurrently
```

---

## ⚡ Quick Start

### 1. Install All Dependencies:
```bash
npm run install:all
```

### 2. Start Both Frontend and Backend Concurrently:
```bash
npm run dev
```

- **Frontend (React)**: [http://localhost:3000](http://localhost:3000)
- **Backend (Express)**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🗄️ Connecting to TiDB Cloud

1. Create a free cluster at [tidbcloud.com](https://tidbcloud.com/).
2. In `server/.env`, enter your TiDB Cloud credentials:
```env
PORT=5000
TIDB_HOST=gateway01.ap-southeast-1.prod.aws.tidbcloud.com
TIDB_PORT=4000
TIDB_USER=your_tidb_username.root
TIDB_PASSWORD=your_tidb_password
TIDB_DATABASE=wintech_db
TIDB_ENABLE_SSL=true
```
3. Restart the server. The backend will automatically create tables (`enquiries`, `courses`) and seed default data.
*(Note: If TiDB credentials are left empty, an in-memory fallback runs automatically so you can test everything immediately without setup).*

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status & TiDB connection check |
| `GET` | `/api/courses` | Fetch list of active courses |
| `POST` | `/api/enquiries` | Submit user enquiry to TiDB |
| `GET` | `/api/enquiries` | View submitted enquiries |
