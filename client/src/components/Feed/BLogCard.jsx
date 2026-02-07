import React, { useState } from "react";
import { toggleLike, getComments, addComment, deleteComment } from "../../utils/api.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

const BlogCard = ({ post }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.liked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [liking, setLiking] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount || 0);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const authorName = post.author?.name || "Unknown";
  const authorPic = post.author?.displayPicture;

  const handleLike = async () => {
    if (liking) return;
    if (!user) {
      toast.error("Please log in to like posts");
      return;
    }
    setLiking(true);
    try {
      const result = await toggleLike(post._id);
      setLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch (err) {
      toast.error(err.message || "Failed to like post");
    } finally {
      setLiking(false);
    }
  };

  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setLoadingComments(true);
      try {
        const fetchedComments = await getComments(post._id);
        setComments(fetchedComments);
      } catch {
        toast.error("Failed to load comments");
      } finally {
        setLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submittingComment) return;
    setSubmittingComment(true);
    try {
      const comment = await addComment(post._id, newComment.trim());
      setComments([comment, ...comments]);
      setCommentsCount(commentsCount + 1);
      setNewComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(post._id, commentId);
      setComments(comments.filter((c) => c._id !== commentId));
      setCommentsCount(commentsCount - 1);
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete comment");
    }
  };

  return (
    <article className="blog-card">
      {/* Header */}
      <header className="blog-card-header">
        <div className="blog-card-author">
          {authorPic && (
            <img src={authorPic} alt={authorName} className="author-avatar" />
          )}
          <div>
            <h3 className="blog-card-title">{authorName}</h3>
            <span className="blog-card-meta">{getTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="blog-card-content">
        <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
          {post.title}
        </strong>
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="tags-section">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="blog-card-actions">
        <button
          className={`btn btn-like ${liked ? "liked" : ""}`}
          onClick={handleLike}
          disabled={liking}
        >
          {liked ? "❤️" : "🤍"} {likesCount}
        </button>
        <button className="btn btn-comment" onClick={handleToggleComments}>
          💬 {commentsCount}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="comments-section">
          {loadingComments ? (
            <div className="comments-loading">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="no-comments">No comments yet. Be the first!</div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    {comment.user?.displayPicture && (
                      <img
                        src={comment.user.displayPicture}
                        alt={comment.user?.name}
                        className="comment-avatar"
                      />
                    )}
                    <div className="comment-info">
                      <span className="comment-author">{comment.user?.name}</span>
                      <span className="comment-content">{comment.content}</span>
                    </div>
                    {user && user._id === comment.user?._id && (
                      <button
                        className="btn-delete-comment"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Comment Form */}
      {user && (
        <form className="comment-form" onSubmit={handleAddComment}>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submittingComment}
          />
          <button
            type="submit"
            className="btn-sm"
            disabled={submittingComment || !newComment.trim()}
          >
            Post
          </button>
        </form>
      )}
    </article>
  );
};

export default BlogCard;
