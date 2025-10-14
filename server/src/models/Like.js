import { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

likeSchema.index({ blog: 1, user: 1 }, { unique: true });

const Like = model("Like", likeSchema);

export default Like;
