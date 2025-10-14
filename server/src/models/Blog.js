import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, maxlength: 5000 },
    tags: { type: [String], default: ["Normal"] },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
