# Star_Dust Blog App - Frontend

## 🚀 Features Built

### Authentication
- ✅ User Registration with validation
- ✅ User Login
- ✅ JWT Token management
- ✅ Protected Routes

### Blog Management
- ✅ Create new blogs
- ✅ Edit your blogs
- ✅ Delete blogs
- ✅ AI-powered blog enhancement (using Gemini API)
- ✅ View all your blogs

### Feed
- ✅ Public blog feed
- ✅ Pagination (10 blogs per page)
- ✅ Like/Unlike blogs
- ✅ View like counts
- ✅ Tags display

### UI/UX
- ✅ Modern gradient background
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Toast notifications
- ✅ Clean card-based layout
- ✅ Mobile-friendly

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── ProtectedRoute.jsx  # Route protection
│   │   └── index.js
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Feed.jsx            # Public feed
│   │   ├── MyBlogs.jsx         # User's blogs
│   │   ├── CreateBlog.jsx      # Create new blog
│   │   └── EditBlog.jsx        # Edit existing blog
│   ├── utils/
│   │   └── api.js              # API calls
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # Main styles
│   ├── index.css               # Base styles
│   └── main.jsx                # Entry point
├── .env                        # Environment variables
└── package.json
```

## 🎨 Pages

### Public Pages
- **Feed (/)** - View all blogs, like posts (requires login)
- **Login (/login)** - User login
- **Register (/register)** - New user registration

### Protected Pages
- **My Blogs (/my-blogs)** - View and manage your blogs
- **Create Blog (/create)** - Create a new blog post
- **Edit Blog (/edit/:id)** - Edit an existing blog

## 🛠️ Tech Stack

- **React 19** - UI library
- **React Router DOM** - Routing
- **React Hot Toast** - Notifications
- **Vite** - Build tool
- **Fetch API** - HTTP requests

## 🚀 Running the App

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔑 Environment Variables

Create a `.env` file in the client directory:

```
VITE_BACKEND_URL=http://localhost:5500
```

## 📝 API Integration

The frontend connects to the backend API at `http://localhost:5500` with the following endpoints:

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/blogs` - Get user's blogs
- `POST /api/blogs` - Create blog
- `PATCH /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `PUT /api/blogs/enhance/:id` - AI enhance blog
- `GET /api/feed` - Get public feed
- `POST /api/blogs/likes/:id/like` - Toggle like

## 🎨 Design Features

- **Gradient Background** - Purple to violet gradient
- **Glass Morphism** - Transparent navbar with backdrop blur
- **Card Design** - Clean white cards with shadows
- **Smooth Animations** - Hover effects and transitions
- **Responsive** - Works on mobile, tablet, and desktop
- **Toast Notifications** - User-friendly feedback

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token is stored in localStorage
3. Token is sent with protected API requests
4. Protected routes check for valid token
5. Logout clears token and redirects

## ✨ Special Features

### AI Enhancement
Click the "✨ Enhance" button on your blogs to improve content using Google's Gemini AI.

### Like System
- Like/unlike any blog in the feed
- See real-time like counts
- Your likes are tracked

### Character Counter
Blog content limited to 5000 characters with live counter.

## 🎯 Usage Tips

1. **Create Account** - Register with name, email, password
2. **Write Blogs** - Go to Create page, add title, content, tags
3. **Enhance Content** - Use AI to improve your blog writing
4. **Share & Like** - View feed and interact with other blogs
5. **Manage** - Edit or delete your blogs from "My Blogs"

Enjoy your blogging experience! ✨
