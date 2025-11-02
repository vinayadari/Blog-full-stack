import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogsAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchBlog()
    }
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await blogsAPI.getAll()
      const blog = response.data.blogs.find(b => b._id === id)
      if (blog) {
        setTitle(blog.title)
        setContent(blog.content)
        setTags(blog.tags ? blog.tags.join(', ') : '')
      }
    } catch (error) {
      toast.error('Failed to load blog')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required')
      return
    }

    const blogData = {
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== ''),
    }

    try {
      setLoading(true)
      if (id) {
        await blogsAPI.update(id, blogData)
        toast.success('Blog updated successfully!')
      } else {
        await blogsAPI.create(blogData)
        toast.success('Blog created successfully!')
      }
      navigate('/my-blogs')
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${id ? 'update' : 'create'} blog`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#00809D',
            marginBottom: '8px',
          }}
        >
          {id ? '✏️ Edit Blog' : '✨ Create New Blog'}
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          {id ? 'Update your blog content' : 'Share your thoughts with the world'}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <label
            htmlFor="title"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '700',
              fontSize: '15px',
              color: '#333',
            }}
          >
            📌 Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter an engaging title..."
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '10px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={e => (e.target.style.borderColor = '#00809D')}
            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            htmlFor="content"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '700',
              fontSize: '15px',
              color: '#333',
            }}
          >
            📝 Content *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your story, ideas, and insights..."
            required
            rows={14}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '15px',
              border: '2px solid #e0e0e0',
              borderRadius: '10px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical',
              lineHeight: '1.7',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={e => (e.target.style.borderColor = '#00809D')}
            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label
            htmlFor="tags"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '700',
              fontSize: '15px',
              color: '#333',
            }}
          >
            🏷️ Tags (optional)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="technology, programming, react, tutorial"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '15px',
              border: '2px solid #e0e0e0',
              borderRadius: '10px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={e => (e.target.style.borderColor = '#00809D')}
            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
          />
          <small style={{ color: '#999', fontSize: '13px', display: 'block', marginTop: '8px' }}>
            💡 Separate multiple tags with commas
          </small>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: '16px',
              background: loading ? '#ccc' : '#00809D',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(0, 128, 157, 0.4)',
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(0, 128, 157, 0.5)'
              }
            }}
            onMouseLeave={e => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(0, 128, 157, 0.4)'
              }
            }}
          >
            {loading ? '⏳ Saving...' : id ? '✅ Update Blog' : '🚀 Publish Blog'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/my-blogs')}
            style={{
              padding: '16px 32px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#5a6268'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#6c757d'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
