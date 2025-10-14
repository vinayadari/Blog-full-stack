import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const blog = await Blog.create({
      title,
      content,
      tags,
      author: req.user.id,
    });
    res
      .status(201)
      .json({ success: true, message: "Blog created sucessfully", blog });
  } catch (err) {
    res.status(401).json({ success: false, message: "Blog not created" });
  }
};

export const getBlogs = async (req, res) => {
  const id = req.user?.id;
  if (!id) {
    return res
      .status(401)
      .json({ success: false, message: "User isn't logged in" });
  }

  try {
    const blogs = await Blog.find({ author: id })
      .sort({ createdAt: -1 })
      .populate("author", "name displayPicture")
      .populate("likes", "name");

    res.status(200).json({ success: true, blogs });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all blogs" });
  }
};

export const updateBlog = async (req, res) => {
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
    if (req.body.title !== undefined) blog.title = req.body.title;
    if (req.body.content !== undefined) blog.content = req.body.content;
    if (req.body.tags !== undefined) blog.tags = req.body.tags;

    await blog.save();
    res.status(200).json({ success: true, message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
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

    await blog.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
