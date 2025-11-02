import { useState, useEffect, useRef, useCallback } from 'react'
import { feedAPI } from '../../utils/api'
import BlogCard from './BLogCard'
import toast from 'react-hot-toast'

const Feed = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const observer = useRef()

  const lastBlogElementRef = useCallback(
    node => {
      if (loadingMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage(prevPage => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loadingMore, hasNextPage]
  )

  const fetchFeed = async (pageNum, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      const response = await feedAPI.getFeed(pageNum)

      if (isLoadMore) {
        setBlogs(prevBlogs => [...prevBlogs, ...response.data.blogs])
      } else {
        setBlogs(response.data.blogs)
      }

      setHasNextPage(response.data.hasNextPage)
      setLoading(false)
      setLoadingMore(false)
    } catch (error) {
      toast.error('Failed to load feed')
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchFeed(1, false)
  }, [])

  useEffect(() => {
    if (page > 1) {
      fetchFeed(page, true)
    }
  }, [page])

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
          <p>Loading amazing content...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#00809D',
            marginBottom: '12px',
          }}
        >
          Discover Stories
        </h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Explore the latest blogs from our community
        </p>
      </div>

      {blogs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📭</div>
          <p style={{ fontSize: '20px', color: '#666', fontWeight: '500' }}>No blogs found</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '24px', marginBottom: '40px' }}>
            {blogs.map((blog, index) => {
              if (blogs.length === index + 1) {
                return (
                  <div key={blog._id} ref={lastBlogElementRef}>
                    <BlogCard blog={blog} />
                  </div>
                )
              } else {
                return <BlogCard key={blog._id} blog={blog} />
              }
            })}
          </div>

          {loadingMore && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #00809D',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 12px',
                  }}
                />
                <p style={{ color: '#00809D', fontSize: '14px', fontWeight: '500' }}>
                  Loading more blogs...
                </p>
              </div>
            </div>
          )}

          {!hasNextPage && blogs.length > 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎉</div>
              You've reached the end!
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Feed
