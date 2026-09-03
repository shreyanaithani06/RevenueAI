# RevenueAI 🚀

A full-stack intelligent revenue recovery and payment management system designed to optimize unpaid invoice prioritization, track payment failures, and automate customer collection workflows.

---

## 🌟 Features

* **Priority Queue Algorithm:** Automatically ranks high-value overdue accounts based on payment risk, transaction history, and total amount owed.
* **Failed Payments Tracker:** Real-time log displaying payment failures with status sorting to highlight recovered revenue first.
* **Customer Portal Integration:** End-to-end interface allowing clients to execute payments or update recovery statuses seamlessly.
* **Full-Stack Cloud Sync:** Real-time data pipeline connecting React components to Express REST endpoints and remote MySQL persistence.

---

## 🏗️ System Architecture

```text
┌────────────────┐     HTTP / REST     ┌────────────────┐     MySQL Protocol     ┌────────────────┐
│ React Frontend │ ──────────────────> │ Express Server │ ─────────────────────> │ MySQL Database │
│   (Vite App)   │ <────────────────── │  (Node.js API) │ <───────────────────── │  (Railway DB)  │
└────────────────┘     JSON Data       └────────────────┘       SQL Queries      └────────────────┘

```
---
## 📂 Project Structure

```text
revenueai/
├── frontend/             # React application (UI, Priority Queue, Customer Portal)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/              # Express API server & Database connections
│   ├── config/           # Database configurations
│   ├── routes/           # REST endpoints
│   ├── server.js         # Main Express entry point
│   └── package.json
├── database.sql          # Database initialization & table schemas
└── .gitignore            # Excludes node_modules & environmental secrets
```
---
## ⚡ Getting Started Locally

### 1. Clone the Repository
```text
git clone [https://github.com/shreyanaithani06/RevenueAI.git](https://github.com/shreyanaithani06/RevenueAI.git)
cd revenueai
```
### 2. Database Setup
```text
   i)Open your local MySQL database or workbench tool.
   ii)Execute the setup script provided in database.sql to instantiate the schema and sample data.
```
### 3. Backend Setup
```text
   cd backend
   npm install

Create a .env file in the backend/ root directory:Code snippetPORT=5000

   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=revenueai
   DB_PORT=3306

Start the backend server:Bashnode server.js
```
## 4. Frontend Setup
```text
In a new terminal window, navigate to the frontend directory:
   cd frontend
   npm install
   npm run dev
```
---
## 🔐 Environment Variables
```text
Ensure your production environment variables are configured in your hosting providers:
Key                Description                  Service
DB_HOST          MySQL Hostname             Render / Railway
DB_USER         Database Username           Render / Railway
DB_PASSWORD     Database Password           Render / Railway
DB_NAME          Database Name              Render / Railway
DB_PORT         Connection Port             Render / Railway
```

---
## 📜 License
```text
This project is open-source and available under the MIT License.
```
