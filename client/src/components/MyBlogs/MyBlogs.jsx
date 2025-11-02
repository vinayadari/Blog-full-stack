import { useState, useEffect } from 'react'
import { blogsAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await blogsAPI.getAll()
      setBlogs(response.data.blogs || [])
      setLoading(false)
    } catch (error) {
      toast.error('Failed to load blogs')
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogsAPI.delete(id)
        toast.success('Blog deleted successfully')
        fetchBlogs()
      } catch (error) {
        toast.error('Failed to delete blog')
      }
    }
  }

  const handleEdit = id => {
    navigate(`/edit/${id}`)
  }

  const handleEnhance = async id => {
    try {
      toast.loading('Enhancing blog with AI...')
      await blogsAPI.enhance(id, {})
      toast.dismiss()
      toast.success('Blog enhanced successfully!')
      fetchBlogs()
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to enhance blog')
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
          <p>Loading your blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#00809D',
              marginBottom: '8px',
            }}
          >
            My Blogs
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>Manage and edit your published content</p>
        </div>
        <button
          onClick={() => navigate('/create')}
          style={{
            padding: '14px 28px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)'
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)'
          }}
        >
          <span style={{ fontSize: '20px' }}>✍️</span>
          New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '100px 20px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>📝</div>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#333',
              marginBottom: '12px',
            }}
          >
            No Blogs Yet
          </h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
            Start sharing your thoughts with the world!
          </p>
          <button
            onClick={() => navigate('/create')}
            style={{
              padding: '16px 32px',
              background: '#00809D',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 128, 157, 0.4)',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(0, 128, 157, 0.5)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(0, 128, 157, 0.4)'
            }}
          >
            ✨ Create Your First Blog
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {blogs.map(blog => (
            <div
              key={blog._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
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
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: '16px',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  lineHeight: '1.3',
                }}
              >
                {blog.title}
              </h2>
              <p
                style={{
                  color: '#555',
                  lineHeight: '1.7',
                  marginBottom: '20px',
                  fontSize: '15px',
                }}
              >
                {blog.content?.substring(0, 300)}
                {blog.content?.length > 300 ? '...' : ''}
              </p>

              {blog.tags && blog.tags.length > 0 && (
                <div
                  style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                >
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
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <small style={{ color: '#999', fontSize: '14px', fontWeight: '500' }}>
                  📅{' '}
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleEnhance(blog._id)}
                    style={{
                      padding: '10px 18px',
                      background: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)',
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 16px rgba(23, 162, 184, 0.4)'
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px rgba(23, 162, 184, 0.3)'
                    }}
                  >
                    ✨ AI Enhance
                  </button>
                  <button
                    onClick={() => handleEdit(blog._id)}
                    style={{
                      padding: '10px 18px',
                      background: '#ffc107',
                      color: '#333',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 16px rgba(255, 193, 7, 0.4)'
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.3)'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    style={{
                      padding: '10px 18px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 16px rgba(220, 53, 69, 0.4)'
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBlogs
