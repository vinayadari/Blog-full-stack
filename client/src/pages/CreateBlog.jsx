import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blogData = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      const result = await api.createBlog(blogData);
      if (result.success) {
        toast.success('Blog created successfully!');
        navigate('/my-blogs');
      } else {
        toast.error(result.message || 'Failed to create blog');
      }
    } catch (error) {
      toast.error('Failed to create blog');
    }
  };

  return (
    <div className="blog-form-container">
      <h1>Create New Blog</h1>
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
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
