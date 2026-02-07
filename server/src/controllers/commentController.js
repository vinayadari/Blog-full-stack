import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

export const addComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: "Comment content is required" });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const comment = await Comment.create({
            blog: blogId,
            user: userId,
            content: content.trim(),
        });

        const populatedComment = await Comment.findById(comment._id).populate(
            "user",
            "name displayPicture"
        );

        res.status(201).json({ comment: populatedComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blog: blogId })
            .populate("user", "name displayPicture")
            .sort({ createdAt: -1 });

        res.json({ comments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.blog.toString() !== blogId) {
            return res.status(400).json({ message: "Comment does not belong to this blog" });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        await Comment.deleteOne({ _id: commentId });

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
