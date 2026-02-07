import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
      trim: true,
    },
    password: { type: String, required: true },
    displayPicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    fullname: { type: String },
    bio: { type: String, maxlength: 200 },
    website: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
