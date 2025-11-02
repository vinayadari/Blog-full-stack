import Comment from '../models/Comment.js'
import Blog from '../models/Blog.js'

// Get all comments for a specific blog
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params

    // Check if blog exists
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    // Get all comments for the blog, populated with user details
    const comments = await Comment.find({ blog: blogId })
      .populate('user', 'name email')
      .populate('taggedUser', 'name email')
      .sort({ createdAt: -1 })

    res.json({ comments })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { blogId } = req.params
    const { content, taggedUserId } = req.body
    const userId = req.user._id

    // Validate content
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment content is required' })
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    // Create the comment
    const comment = await Comment.create({
      blog: blogId,
      user: userId,
      content: content.trim(),
      taggedUser: taggedUserId || null,
    })

    // Populate user details before sending response
    await comment.populate('user', 'name email')
    if (comment.taggedUser) {
      await comment.populate('taggedUser', 'name email')
    }

    res.status(201).json({ comment, message: 'Comment created successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const { content } = req.body
    const userId = req.user._id

    // Validate content
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment content is required' })
    }

    // Find the comment
    const comment = await Comment.findById(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    // Check if user owns the comment
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' })
    }

    // Update the comment
    comment.content = content.trim()
    await comment.save()

    await comment.populate('user', 'name email')
    if (comment.taggedUser) {
      await comment.populate('taggedUser', 'name email')
    }

    res.json({ comment, message: 'Comment updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const userId = req.user._id

    // Find the comment
    const comment = await Comment.findById(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    // Check if user owns the comment
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' })
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId })

    res.json({ message: 'Comment deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
