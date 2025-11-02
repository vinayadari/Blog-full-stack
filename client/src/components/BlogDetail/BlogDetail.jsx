import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { blogsAPI, likesAPI } from '../../utils/api'
import Comments from '../Comments/Comments'
import toast from 'react-hot-toast'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await blogsAPI.getById(id)

      if (response.data.success && response.data.blog) {
        const blogData = response.data.blog
        setBlog(blogData)
        setLiked(blogData.liked || false)
        setLikesCount(blogData.likesCount || 0)
      } else {
        toast.error('Blog not found')
        navigate('/feed')
      }
      setLoading(false)
    } catch (error) {
      toast.error('Failed to load blog')
      navigate('/feed')
      setLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      const response = await likesAPI.toggleLike(id)
      setLiked(response.data.liked)
      setLikesCount(response.data.likesCount)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          fontSize: '18px',
          color: '#00809D',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #00809D',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p>Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return null
  }

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/feed')}
        style={{
          padding: '10px 20px',
          backgroundColor: 'transparent',
          color: '#00809D',
          border: '1px solid #00809D',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '24px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#00809D'
          e.target.style.color = 'white'
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = 'transparent'
          e.target.style.color = '#00809D'
        }}
      >
        ← Back to Feed
      </button>

      {/* Blog Content */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          marginBottom: '32px',
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: '20px',
            fontSize: '36px',
            fontWeight: '800',
            color: '#1a1a1a',
            lineHeight: '1.3',
          }}
        >
          {blog.title}
        </h1>

        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#00809D',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '24px',
            marginBottom: '24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <small
            style={{
              color: '#999',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            📅{' '}
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </small>
          <button
            onClick={handleLike}
            style={{
              padding: '10px 20px',
              backgroundColor: liked ? '#dc3545' : '#00809D',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: liked
                ? '0 4px 12px rgba(220, 53, 69, 0.3)'
                : '0 4px 12px rgba(0, 128, 157, 0.3)',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = liked
                ? '0 6px 16px rgba(220, 53, 69, 0.4)'
                : '0 6px 16px rgba(0, 128, 157, 0.4)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = liked
                ? '0 4px 12px rgba(220, 53, 69, 0.3)'
                : '0 4px 12px rgba(0, 128, 157, 0.3)'
            }}
          >
            <span style={{ fontSize: '16px' }}>{liked ? '❤️' : '🤍'}</span>
            <span>{likesCount}</span>
          </button>
        </div>

        <div
          style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#333',
            whiteSpace: 'pre-wrap',
          }}
        >
          {blog.content}
        </div>
      </div>

      {/* Comments Section */}
      <Comments blogId={id} />
    </div>
  )
}

export default BlogDetail
