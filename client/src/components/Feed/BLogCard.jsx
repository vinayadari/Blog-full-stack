import { useState } from 'react'
import { likesAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog, onLikeToggle }) => {
  const [liked, setLiked] = useState(blog.liked || false)
  const [likesCount, setLikesCount] = useState(blog.likesCount || 0)
  const navigate = useNavigate()

  const handleLike = async () => {
    try {
      const response = await likesAPI.toggleLike(blog._id)
      setLiked(response.data.liked)
      setLikesCount(response.data.likesCount)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: '16px',
          fontSize: '26px',
          fontWeight: '700',
          color: '#1a1a1a',
          lineHeight: '1.3',
        }}
      >
        {blog.title}
      </h3>
      <p
        style={{
          color: '#555',
          marginBottom: '20px',
          lineHeight: '1.7',
          fontSize: '15px',
        }}
      >
        {blog.content?.substring(0, 250)}
        {blog.content?.length > 250 ? '...' : ''}
      </p>
      {blog.tags && blog.tags.length > 0 && (
        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                background: '#00809D',
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
          paddingTop: '20px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
            onClick={() => navigate(`/blog/${blog._id}`)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#00809D',
              border: '1px solid #00809D',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
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
            💬 View Comments
          </button>
        </div>
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
              : '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}
        >
          <span style={{ fontSize: '16px' }}>{liked ? '❤️' : '🤍'}</span>
          <span>{likesCount}</span>
        </button>
      </div>
    </div>
  )
}

export default BlogCard
