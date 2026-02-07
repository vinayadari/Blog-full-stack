import React, { useState, useEffect } from "react";
import { getFeed } from "../../utils/api.js";
import BlogCard from "./BLogCard.jsx";
import toast from "react-hot-toast";

const Feed = () => {
  const [feedData, setFeedData] = useState({ blogs: [], page: 1, hasNextPage: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getFeed(page);
      if (page === 1) {
        setFeedData(data);
      } else {
        setFeedData((prev) => ({
          ...data,
          blogs: [...prev.blogs, ...data.blogs],
        }));
      }
    } catch {
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (feedData.hasNextPage) {
      loadFeed(feedData.page + 1);
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h2>Blog Feed</h2>
        <p className="feed-subtitle">Discover posts from the community</p>
      </div>

      {loading && feedData.blogs.length === 0 ? (
        <div className="loading">Loading posts...</div>
      ) : feedData.blogs.length === 0 ? (
        <div className="empty-state">No posts yet. Be the first to post!</div>
      ) : (
        <>
          <div className="posts-grid">
            {feedData.blogs.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          {feedData.hasNextPage && (
            <div className="load-more-container">
              <button
                className="btn btn-secondary"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
