import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Feed = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const result = await api.getFeed(page);
        setBlogs(result.blogs || []);
        setHasMore(result.hasNextPage);
      } catch (error) {
        toast.error('Failed to fetch feed');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [page]);

  const handleLike = async (blogId) => {
    if (!isAuthenticated) {
      toast.error('Please login to like blogs');
      return;
    }
    try {
      const result = await api.toggleLike(blogId);
      setBlogs(
        blogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, liked: result.liked, likesCount: result.likesCount }
            : blog
        )
      );
    } catch (error) {
      toast.error('Failed to like blog');
    }
  };

  if (loading) {
    return <div className="loading">Loading feed...</div>;
  }

  return (
    <div className="feed-container">
      <h1>Blog Feed</h1>
      <div className="blogs-grid">
        {blogs.length === 0 ? (
          <p className="no-blogs">No blogs yet. Be the first to create one!</p>
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
                <button
                  onClick={() => handleLike(blog._id)}
                  className={`like-btn ${blog.liked ? 'liked' : ''}`}
                >
                  ❤️ {blog.likesCount || 0}
                </button>
                <span className="blog-date">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {hasMore && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Feed;
