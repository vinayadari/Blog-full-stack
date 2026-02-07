import Like from "../models/Like.js";
import Blog from "../models/Blog.js";

export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const existingLike = await Like.findOne({ blog: blogId, user: userId });

    if (existingLike) {
      // Unlike the blog
      await Like.deleteOne({ _id: existingLike._id });
      const likesCount = await Like.countDocuments({ blog: blogId });
      return res.json({ liked: false, likesCount });
    } else {
      // Like the blog
      await Like.create({ blog: blogId, user: userId });
      const likesCount = await Like.countDocuments({ blog: blogId });
      return res.json({ liked: true, likesCount });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
