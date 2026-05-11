# ePortfolio: Full-Stack Project Management System

My production-ready ePortfolio application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a clean, responsive "Glassmorphism" frontend, a secure administrative dashboard for project management, and a robust backend with automated email handling and image persistence via Cloudflare R2.

## 📺 Project Walkthrough
[![Project Walkthrough](https://img.youtube.com/vi/e8pVFnvV9yk/0.jpg)](https://youtu.be/e8pVFnvV9yk)  
*Click the image above to watch the demo video.*

## 🚀 Live Demo
- **Live Site**: [https://eportfolio.franklyn.dev/](https://eportfolio.franklyn.dev)
- **Github Repository**: [https://github.com/dainjaruss/eportfolio](https://github.com/dainjaruss/eportfolio)
- **Demo Video**: [https://youtu.be/e8pVFnvV9yk](https://youtu.be/e8pVFnvV9yk)

## ✨ Features

- **Dynamic Project Gallery**: Projects are fetched from MongoDB and displayed in a responsive, accessible grid.
- **Admin Dashboard**: A secure (basic auth) area to Create, Read, Update, and Delete (CRUD) projects.
- **Secure Authentication**: Protected routes using Basic Auth and Axios interceptors for a seamless admin experience.
- **Contact System**: A validated contact form that sends real-time email notifications via Nodemailer and SMTP.
- **Persistent Storage**: Integrated with Cloudflare R2 (Object Storage) to handle images in a serverless environment.
- **Modern UI/UX**: Built with React and Vite, featuring glassmorphism aesthetics, micro-animations, and Google Fonts (Outfit & Inter).

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Vanilla CSS.
- **Backend**: Node.js, Express, Mongoose (deployed via Vercel Serverless).
- **Database**: MongoDB Atlas.
- **Storage**: Cloudflare R2 (Object Storage).
- **Testing**: Jest, Supertest (Backend), Vitest (Frontend).
- **Deployment**: Vercel.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dainjaruss/eportfolio.git
   cd eportfolio
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env` in the root directory.
   - Copy `client/.env.example` to `client/.env`.
   - **Required Variables**:
     - `MONGO_URI`: Your MongoDB Atlas connection string.
     - `VITE_IPINFO_TOKEN`: Your token from [ipinfo.io](https://ipinfo.io).
     - `VITE_CONTACT_EMAIL`: The email displayed on the contact page.
     - `SMTP_*`: Credentials for your email provider.
     - `R2_*`: Cloudflare R2 credentials for image hosting.

3. **Install Dependencies:**
   Run the following from the root directory:
   ```bash
   npm run install-all
   ```

## 🎮 Usage

### Local Development
To run both the backend and frontend concurrently:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### Seeding the Database
To populate MongoDB with initial project data:
```bash
cd server
npm run seed
```

### Admin Access
To manage projects, navigate to `/admin`. Use the `ADMIN_USER` and `ADMIN_PASS` from your `.env`.

## 🔌 API Endpoints

| Method | Route | Auth Required | Description |
|--------|-------|---------------|-------------|
| GET | `/api/projects` | No | Returns all projects |
| POST | `/api/projects` | **Yes** | Create a new project |
| PUT | `/api/projects/:id` | **Yes** | Update a project |
| DELETE | `/api/projects/:id` | **Yes** | Delete a project |
| POST | `/api/contact` | No | Processes contact form |
| POST | `/api/upload` | **Yes** | Image upload to R2 |

## 🚢 Deployment (Vercel)

This project is optimized for deployment on Vercel:

1. **Environment Variables**: Add all keys from your `.env` to Vercel Project Settings.
2. **Build Settings**: 
   - **Framework Preset**: `Other`
   - **Build Command**: `npm install && cd client && npm run build`
   - **Output Directory**: `client/dist`

## 🧪 Testing

- **Backend**: Run `npm test` inside the `server` directory.
- **Frontend**: Run `npm test` inside the `client` directory.

## 📝 Technical Implementation

### Infrastructure & Security
- **Cloudflare R2**: Used for persistent image storage in serverless environments.
- **Basic Auth Interceptor**: Custom Axios interceptor to handle `401` errors for a seamless SPA login experience.
- **SMTP Integration**: Used Port **465** with `nodemailer` for reliable email delivery.

---
**Author**: Dain Franklyn  
**Course**: CIS 5740 - Web Application Development