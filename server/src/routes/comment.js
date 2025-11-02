import express from 'express'
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get all comments for a blog (protected)
router.get('/:blogId', protect, getComments)

// Create a new comment (protected)
router.post('/:blogId', protect, createComment)

// Update a comment (protected)
router.patch('/:commentId', protect, updateComment)

// Delete a comment (protected)
router.delete('/:commentId', protect, deleteComment)

export default router
