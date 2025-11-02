# ✨ Star_Dust - Full-Stack Blogging Application

A modern, full-featured blogging platform built with React and Node.js, featuring infinite scroll, AI-powered content enhancement, and real-time interactions.

## 🚀 Features

- **User Authentication** - Secure registration and login with JWT
- **Blog Management** - Create, read, update, and delete blog posts
- **Infinite Scroll Feed** - Seamless content loading as you scroll
- **AI Enhancement** - Improve your blog content with Gemini AI
- **Comments System** - Engage with posts through comments and @mentions
- **Like/Unlike** - Show appreciation for great content
- **Responsive Design** - Beautiful UI that works on all devices
- **Protected Routes** - Secure access to user-specific features

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Google Gemini AI** - Content enhancement
- **Nodemailer** - Email service

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Clone Repository

```bash
git clone <your-repo-url>
cd COMPLETE-BLOGGING-APPLICATION
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/src/`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAIL_TRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAIL_TRAP_SMTP_PORT=2525
MAIL_TRAP_SMTP_USER=your_mailtrap_user
MAIL_TRAP_SMTP_PASS=your_mailtrap_pass
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5500/api
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd server
npm run server
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
COMPLETE-BLOGGING-APPLICATION/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth/      # Login/Register
│   │   │   ├── Feed/      # Blog feed and cards
│   │   │   ├── MyBlogs/   # User's blog management
│   │   │   ├── CreateBlog/# Blog editor
│   │   │   ├── BlogDetail/# Single blog view
│   │   │   ├── Comments/  # Comments component
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/         # API utilities
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   │   ├── authController.js
    │   │   ├── crudController.js
    │   │   ├── feedController.js
    │   │   ├── likeController.js
    │   │   ├── commentController.js
    │   │   └── aiUpdateContent.js
    │   ├── models/        # MongoDB models
    │   │   ├── User.js
    │   │   ├── Blog.js
    │   │   ├── Like.js
    │   │   └── Comment.js
    │   ├── routes/        # API routes
    │   │   ├── auth.js
    │   │   ├── crud.js
    │   │   ├── feed.js
    │   │   ├── likeRoute.js
    │   │   ├── comment.js
    │   │   └── aiupdate.js
    │   ├── middleware/    # Custom middleware
    │   │   └── authMiddleware.js
    │   ├── config/        # Configuration
    │   │   ├── ai.js
    │   │   └── nodemailer.js
    │   ├── database/      # Database config
    │   │   └── config.js
    │   └── index.js       # Entry point
    └── package.json
```

## 🎨 Features in Detail

### Authentication

- Secure user registration with email validation
- JWT-based authentication
- Protected routes for authenticated users

### Blog Posts

- Rich text blog creation
- Tag support for categorization
- Edit and delete your own posts
- AI-powered content enhancement using Gemini AI

### Social Features

- Like/unlike blog posts
- Comment on posts with @mentions
- Reply to other users via tagging
- View full blog posts with comments

### UI/UX

- Modern gradient color scheme (#00809D and #FCF8DD)
- Smooth animations and transitions
- Infinite scroll pagination
- Responsive design for mobile and desktop
- Toast notifications for user feedback

## 🌐 Deployment

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory to `server`
4. Configure environment variables
5. Deploy

### Frontend (Vercel)

1. Connect GitHub repository
2. Set root directory to `client`
3. Add `VITE_API_URL` environment variable
4. Deploy

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Blogs

- `GET /api/blogs` - Get user's blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog
- `PATCH /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/enhance/:id` - Enhance blog with AI

### Feed

- `GET /api/feed?page=1` - Get paginated blog feed

### Likes

- `POST /api/blogs/likes/:id/like` - Toggle like on blog

### Comments

- `GET /api/comments/:blogId` - Get blog comments
- `POST /api/comments/:blogId` - Create comment
- `PATCH /api/comments/:commentId` - Update comment
- `DELETE /api/comments/:commentId` - Delete comment

## 🔐 Environment Variables

### Backend

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `GEMINI_API_KEY` - Google Gemini AI API key
- `CLIENT_URL` - Frontend URL for CORS
- `MAIL_TRAP_*` - Email service credentials

### Frontend

- `VITE_API_URL` - Backend API base URL

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Vinay

## 🙏 Acknowledgments

- Google Gemini AI for content enhancement
- MongoDB Atlas for database hosting
- Vercel and Render for deployment platforms

---

**Total Lines of Code:** 3,178 lines (excluding dependencies)
