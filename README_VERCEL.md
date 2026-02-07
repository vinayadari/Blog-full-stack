# 🚀 Vercel Deployment Guide

Complete guide for deploying this blogging application to Vercel.

---

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- GitHub repository with your code
- [MongoDB Atlas](https://www.mongodb.com/atlas) database

---

## 🔧 Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## 🖥️ Step 2: Deploy Backend

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your repository
3. Configure:
   - **Root Directory:** `server`
   - **Framework Preset:** Other
4. Add **Environment Variables:**

   | Variable | Description | Required |
   |----------|-------------|----------|
   | `MONGODB_URI` | MongoDB connection string | ✅ |
   | `JWT_SECRET` | Secret key for JWT tokens | ✅ |
   | `FRONTEND_URL` | Frontend URL (add after Step 3) | ✅ |
   | `GEMINI_API_KEY` | Google AI API key | ❌ |

5. Click **Deploy**
6. 📋 **Copy your backend URL** (e.g., `https://your-app-server.vercel.app`)

---

## 💻 Step 3: Deploy Frontend

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same repository**
3. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
4. Add **Environment Variable:**

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://your-backend-url.vercel.app/api` |

5. Click **Deploy**
6. 📋 **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

---

## 🔗 Step 4: Connect Frontend & Backend

1. Go to your **backend project** in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/Update:

   | Variable | Value |
   |----------|-------|
   | `FRONTEND_URL` | `https://your-frontend-url.vercel.app` |

4. **Redeploy:** Deployments → ⋮ menu → Redeploy

---

## ✅ Verification

After deployment, verify everything works:

1. **Backend Health Check:**
   ```
   https://your-backend.vercel.app/api/health
   ```
   Should return: `{"status":"ok"}`

2. **Frontend:** Open your frontend URL and test login/signup

---

## 🛠️ Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly (no trailing slash)
- Redeploy backend after updating environment variables

### Database Connection Failed
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Verify connection string format

### Build Errors
- Check Vercel build logs for details
- Ensure all dependencies are in `dependencies` (not `devDependencies`)

---

## 📁 Project Structure

```
├── client/          # Frontend (Vite + React)
│   ├── vercel.json  # Frontend Vercel config
│   └── ...
├── server/          # Backend (Express + Node.js)
│   ├── vercel.json  # Backend Vercel config
│   └── ...
└── README_VERCEL.md # This file
```

---

## 🔄 Updating Deployments

Push to GitHub and Vercel auto-deploys:

```bash
git add .
git commit -m "Your changes"
git push
```

Both frontend and backend will automatically redeploy.

---

## 📚 Environment Variables Reference

### Backend (`server`)
| Variable | Example | Required |
|----------|---------|----------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/Blog` | ✅ |
| `JWT_SECRET` | `my-super-secret-key-123` | ✅ |
| `FRONTEND_URL` | `https://my-blog.vercel.app` | ✅ |
| `GEMINI_API_KEY` | `AIza...` | ❌ |

### Frontend (`client`)
| Variable | Example | Required |
|----------|---------|----------|
| `VITE_API_URL` | `https://my-blog-api.vercel.app/api` | ✅ |
