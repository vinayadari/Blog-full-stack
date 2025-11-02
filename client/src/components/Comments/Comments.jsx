import { useState, useEffect } from 'react'
import { commentsAPI } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const { user, token } = useAuth()

  // Get current user ID from token
  const getCurrentUserId = () => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload._id || payload.id
    } catch {
      return null
    }
  }

  const currentUserId = getCurrentUserId()

  useEffect(() => {
    fetchComments()
  }, [blogId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await commentsAPI.getComments(blogId)
      setComments(response.data.comments)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching comments:', error)
      setLoading(false)
    }
  }

  const handleSubmitComment = async e => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      setSubmitting(true)
      const data = {
        content: newComment,
        taggedUserId: replyingTo ? replyingTo._id : null,
      }
      await commentsAPI.createComment(blogId, data)
      setNewComment('')
      setReplyingTo(null)
      toast.success('Comment posted!')
      fetchComments()
    } catch (error) {
      toast.error('Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = comment => {
    setEditingId(comment._id)
    setEditContent(comment.content)
  }

  const handleUpdate = async commentId => {
    if (!editContent.trim()) return

    try {
      await commentsAPI.updateComment(commentId, { content: editContent })
      setEditingId(null)
      setEditContent('')
      toast.success('Comment updated!')
      fetchComments()
    } catch (error) {
      toast.error('Failed to update comment')
    }
  }

  const handleDelete = async commentId => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return

    try {
      await commentsAPI.deleteComment(commentId)
      toast.success('Comment deleted!')
      fetchComments()
    } catch (error) {
      toast.error('Failed to delete comment')
    }
  }

  const handleReply = comment => {
    setReplyingTo(comment.user)
    setNewComment(`@${comment.user.name} `)
    document.getElementById('comment-input')?.focus()
  }

  const cancelReply = () => {
    setReplyingTo(null)
    setNewComment('')
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading comments...</div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '22px', fontWeight: '700' }}>
        💬 Comments ({comments.length})
      </h3>

      {/* Comment Input Form */}
      <form onSubmit={handleSubmitComment} style={{ marginBottom: '32px' }}>
        {replyingTo && (
          <div
            style={{
              marginBottom: '12px',
              padding: '8px 12px',
              backgroundColor: '#f0f8ff',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '14px', color: '#00809D' }}>
              Replying to <strong>@{replyingTo.name}</strong>
            </span>
            <button
              type="button"
              onClick={cancelReply}
              style={{
                background: 'none',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            >
              ✕
            </button>
          </div>
        )}
        <textarea
          id="comment-input"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '15px',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            marginBottom: '12px',
          }}
          onFocus={e => (e.target.style.borderColor = '#00809D')}
          onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
        />
        <button
          type="submit"
          disabled={submitting || !newComment.trim()}
          style={{
            padding: '10px 24px',
            backgroundColor: submitting || !newComment.trim() ? '#ccc' : '#00809D',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: submitting || !newComment.trim() ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map(comment => (
            <div
              key={comment._id}
              style={{
                padding: '16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
              }}
            >
              {editingId === comment._id ? (
                // Edit Mode
                <div>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      border: '2px solid #00809D',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      marginBottom: '12px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleUpdate(comment._id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setEditContent('')
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ fontSize: '15px', color: '#333' }}>{comment.user.name}</strong>
                    <span style={{ color: '#999', fontSize: '13px', marginLeft: '8px' }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {comment.taggedUser && (
                    <div style={{ marginBottom: '8px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          backgroundColor: '#e3f2fd',
                          color: '#00809D',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: '500',
                        }}
                      >
                        @{comment.taggedUser.name}
                      </span>
                    </div>
                  )}
                  <p
                    style={{ margin: '8px 0', fontSize: '15px', lineHeight: '1.6', color: '#555' }}
                  >
                    {comment.content}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button
                      onClick={() => handleReply(comment)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'transparent',
                        color: '#00809D',
                        border: '1px solid #00809D',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                      }}
                    >
                      Reply
                    </button>
                    {currentUserId === comment.user._id && (
                      <>
                        <button
                          onClick={() => handleEdit(comment)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'transparent',
                            color: '#ffc107',
                            border: '1px solid #ffc107',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'transparent',
                            color: '#dc3545',
                            border: '1px solid #dc3545',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500',
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Comments
