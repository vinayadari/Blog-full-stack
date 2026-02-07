# Vercel Deployment Guide

This project consists of two parts that need to be deployed separately:
1. **Frontend (client)** - React/Vite app
2. **Backend (server)** - Node.js/Express API

## Prerequisites

- [Vercel account](https://vercel.com)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for CLI deployment)
- MongoDB Atlas database (or similar)

---

## Step 1: Deploy the Backend

### Option A: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Select the `server` folder as the root directory
4. Set the following environment variables in Vercel:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure secret key for JWT tokens
   - `FRONTEND_URL` - Your frontend URL (add after deploying frontend)
   - `GEMINI_API_KEY` - (optional) For AI features
5. Click Deploy

### Option B: Using Vercel CLI

```bash
cd server
vercel
# Follow the prompts
# Add environment variables in Vercel dashboard
```

### After Backend Deployment

Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

---

## Step 2: Deploy the Frontend

### Option A: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Select the `client` folder as the root directory
4. Set the following environment variable:
   - `VITE_API_URL` - Your backend URL + `/api` (e.g., `https://your-backend.vercel.app/api`)
5. Click Deploy

### Option B: Using Vercel CLI

```bash
cd client
vercel
# Follow the prompts
```

---

## Step 3: Update CORS Settings

After both are deployed, update the backend's environment variable:
- `FRONTEND_URL` = Your frontend deployment URL

This ensures proper CORS configuration.

---

## Environment Variables Summary

### Backend (server)
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret for JWT tokens | ✅ |
| `FRONTEND_URL` | Frontend URL for CORS | ✅ |
| `GEMINI_API_KEY` | Google AI API key | ❌ |
| `MAIL_TRAP_*` | Email config | ❌ |

### Frontend (client)
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | ✅ |

---

## Local Development

### Backend
```bash
cd server
npm install
# Copy .env.example to .env and fill in values
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` is set correctly in backend
- Ensure the URL doesn't have a trailing slash

### Database Connection Issues
- Verify your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow all) for Vercel
- Check connection string format

### Build Errors
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Check Vercel build logs for details
