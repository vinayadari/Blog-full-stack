import React, { useState, useEffect } from "react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../../utils/api.js";
import BlogCard from "../Feed/BLogCard.jsx";
import toast from "react-hot-toast";
const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", tags: "" });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch {
      toast.error("Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const tags = formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];

      if (editingPost) {
        await updateBlog(editingPost._id, {
          title: formData.title,
          content: formData.content,
          tags,
        });
        toast.success("Blog updated successfully");
      } else {
        await createBlog({
          title: formData.title,
          content: formData.content,
          tags,
        });
        toast.success("Blog created successfully");
      }
      setFormData({ title: "", content: "", tags: "" });
      setEditingPost(null);
      setShowForm(false);
      loadBlogs();
    } catch (error) {
      toast.error(error.message || "Failed to save blog");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      tags: post.tags ? post.tags.join(", ") : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      loadBlogs();
    } catch (error) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", content: "", tags: "" });
    setEditingPost(null);
    setShowForm(false);
  };

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div>
          <h2>My Blogs</h2>
          <p className="feed-subtitle">Manage your blog posts</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingPost(null);
            setFormData({ title: "", content: "", tags: "" });
          }}
        >
          + New Blog
        </button>
      </div>

      {showForm && (
        <form className="post-form" onSubmit={handleSubmit}>
          <h3>{editingPost ? "Edit Blog" : "Create New Blog"}</h3>
          <input
            type="text"
            placeholder="Blog Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="form-input"
            required
          />
          <textarea
            placeholder="Blog Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="form-textarea"
            rows="8"
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated, e.g., Tech, React, JavaScript)"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value })
            }
            className="form-input"
          />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingPost ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="loading">Loading your blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="empty-state">
          No blogs yet. Create your first blog post!
        </div>
      ) : (
        <div className="posts-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card-wrapper">
              <BlogCard post={blog} />
              <div className="blog-card-manage">
                <button
                  className="btn btn-ghost"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;

