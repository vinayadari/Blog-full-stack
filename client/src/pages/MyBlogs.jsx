import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const result = await api.getMyBlogs();
      if (result.success) {
        setBlogs(result.blogs);
      }
    } catch (error) {
      toast.error('Failed to fetch your blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const result = await api.deleteBlog(id);
      if (result.success) {
        toast.success('Blog deleted successfully');
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        toast.error(result.message || 'Failed to delete blog');
      }
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const handleEnhance = async (id) => {
    try {
      toast.loading('Enhancing with AI...');
      const result = await api.enhanceBlog(id);
      toast.dismiss();
      if (result.success) {
        toast.success('Blog enhanced successfully!');
        fetchMyBlogs();
      } else {
        toast.error(result.message || 'Failed to enhance blog');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to enhance blog');
    }
  };

  if (loading) {
    return <div className="loading">Loading your blogs...</div>;
  }

  return (
    <div className="my-blogs-container">
      <div className="page-header">
        <h1>My Blogs</h1>
        <Link to="/create" className="btn-primary">
          + Create New
        </Link>
      </div>
      <div className="blogs-grid">
        {blogs.length === 0 ? (
          <p className="no-blogs">
            You haven't created any blogs yet. <Link to="/create">Create your first blog!</Link>
          </p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p className="blog-content">{blog.content}</p>
              <div className="blog-tags">
                {blog.tags?.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="blog-footer">
                <span className="blog-date">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <div className="blog-actions">
                  <button
                    onClick={() => handleEnhance(blog._id)}
                    className="btn-enhance"
                    title="Enhance with AI"
                  >
                    ✨ Enhance
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${blog._id}`)}
                    className="btn-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
