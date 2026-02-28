# TradeLive — MERN Trading Blog Platform

A production-ready MERN stack website inspired by BBC Live pages, designed for trading blogs, market analysis, crypto updates, forex signals, and stock insights.

## Project Structure

```
curly-adventure/
├── backend/
│   ├── src/
│   │   ├── config/          # DB configuration
│   │   ├── controllers/     # API business logic
│   │   ├── middleware/      # auth, upload, error handlers
│   │   ├── models/          # User, Post, Category, Comment schemas
│   │   ├── routes/          # REST API route definitions
│   │   ├── utils/           # token, slug and seed helpers
│   │   └── server.js        # Express server bootstrap
│   ├── uploads/             # Uploaded images
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios client
│   │   ├── components/      # reusable UI components
│   │   ├── context/         # auth context
│   │   ├── layouts/         # top-level app layout
│   │   ├── pages/           # Home, Post, Admin, 404
│   │   └── styles/          # Tailwind styles
│   └── package.json
└── .env.example
```

## Core Features

### Backend (Express + MongoDB)
- JWT authentication and role-based authorization (admin/user)
- CRUD APIs for posts and categories
- Comment posting and admin approval workflow
- Image upload with Multer
- Pagination and full-text search on posts
- Trending posts (sorted by views)

### Frontend (React + Tailwind)
- BBC-inspired white layout with black/red accents
- Sticky top nav, left category sidebar, right trending sidebar
- Hero headline and live updates feed
- Blog detail page with metadata, related posts, comments
- Dark mode toggle
- Loading skeletons + 404 page
- Admin login page and dashboard shell
- Breaking banner + ticker strip and Framer Motion animation

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/posts` (supports `page`, `limit`, `search`, `category`, `live`)
- `GET /api/posts/trending`
- `GET /api/posts/:slug`
- `POST /api/posts` (admin, multipart upload)
- `PUT /api/posts/:id` (admin)
- `DELETE /api/posts/:id` (admin)
- `POST /api/posts/:id/like`
- `GET /api/categories`
- `POST /api/categories` (admin)
- `PUT /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)
- `POST /api/comments/post/:postId`
- `GET /api/comments/pending` (admin)
- `PATCH /api/comments/:id/approve` (admin)

## Local Development

### 1) Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure env
Copy `.env.example` to `.env` and fill in values.

### 3) Start servers
```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```

### 4) Seed admin user
```bash
cd backend && npm run seed-admin
```

## Deployment Guide

### Backend on Render / Railway
1. Create a new Web Service.
2. Set root directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars from `.env.example` backend section.
6. Provision MongoDB Atlas and set `MONGO_URI`.

### Frontend on Vercel
1. Import repo to Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set `VITE_API_URL` and `VITE_UPLOADS_URL` to deployed backend URLs.

## Premium Add-ons Implemented
- Ticker strip at the top (Bloomberg style)
- Breaking banner with animation
- Responsive modern card/list layout
- Micro-interactions with hover and animated transitions


## Upload to GitHub

If you want to publish this project to GitHub:

```bash
git init
git add .
git commit -m "Initial TradeLive MERN platform"
```

Create a new empty repository on GitHub, then run:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

If your repo already exists locally (as in this project), just set the remote and push:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin HEAD
```
