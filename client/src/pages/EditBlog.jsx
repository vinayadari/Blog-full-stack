import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const result = await api.getMyBlogs();
      if (result.success) {
        const blog = result.blogs.find((b) => b._id === id);
        if (blog) {
          setFormData({
            title: blog.title,
            content: blog.content,
            tags: blog.tags?.join(', ') || '',
          });
        } else {
          toast.error('Blog not found');
          navigate('/my-blogs');
        }
      }
    } catch (error) {
      toast.error('Failed to fetch blog');
      navigate('/my-blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blogData = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      const result = await api.updateBlog(id, blogData);
      if (result.success) {
        toast.success('Blog updated successfully!');
        navigate('/my-blogs');
      } else {
        toast.error(result.message || 'Failed to update blog');
      }
    } catch (error) {
      toast.error('Failed to update blog');
    }
  };

  if (loading) {
    return <div className="loading">Loading blog...</div>;
  }

  return (
    <div className="blog-form-container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            placeholder="Write your blog content..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            maxLength={5000}
            required
          />
          <small>{formData.content.length}/5000 characters</small>
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. Technology, AI, Programming"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/my-blogs')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
