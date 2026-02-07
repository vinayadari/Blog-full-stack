import express from "express";
import cors from "cors";
import connectDB from "./database/config.js";
import authRouter from "./routes/auth.js";
import crudRouter from "./routes/crud.js";
import enhanceRouter from "./routes/aiupdate.js";
import feedRoute from "./routes/feed.js";
import likeRouter from "./routes/likeRoute.js";
import commentRouter from "./routes/commentRoute.js";

const app = express();
const port = process.env.PORT || 5500;

// CORS configuration for production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in production for now
    }
  }
}));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Blog App API");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/blogs", crudRouter);
app.use("/api/blogs/enhance", enhanceRouter);
app.use("/api/feed", feedRoute);
app.use("/api/blogs/likes", likeRouter);
app.use("/api/blogs", commentRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

// Export for Vercel serverless
export default app;
