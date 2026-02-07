import Blog from "../models/Blog.js";
import { response as aiResponse } from "../config/ai.js";
export const enhanceBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    const prompt = `Improve and enhance this blog content. Keep it under 5000 characters and make it engaging: ${blog.content}`;
    const suggestion = await aiResponse("content writing", prompt);
    blog.content = suggestion || blog.content;
    await blog.save();
    res
      .status(200)
      .json({ success: true, message: "Blog enhanced successfully", blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
