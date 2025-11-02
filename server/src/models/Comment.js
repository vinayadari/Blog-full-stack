import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    // Reference to the blog post
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    // User who created the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Comment text content
    content: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional: User being tagged/replied to (for flat structure)
    taggedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient querying
commentSchema.index({ blog: 1, createdAt: -1 })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
