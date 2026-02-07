import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true, maxlength: 1000 },
    },
    { timestamps: true }
);

commentSchema.index({ blog: 1, createdAt: -1 });

const Comment = model("Comment", commentSchema);

export default Comment;
