import Blog from "../models/Blog.js";
import mongoose from "mongoose";

const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const userId = req.user?._id ? mongoose.Types.ObjectId(req.user._id) : null;

    // pipeline
    const feed = await Blog.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      {
        $lookup: {
          from: "likes",
          let: { blogId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$blog", "$$blogId"] } } }],
          as: "likesData",
        },
      },

      {
        $addFields: {
          likesCount: { $size: "$likesData" },
          liked: userId ? { $in: [userId, "$likesData.user"] } : false,
        },
      },

      { $project: { likesData: 0 } },
    ]);

    //blog count
    const totalBlogs = await Blog.countDocuments();

    res.json({
      page,
      limit,
      totalBlogs,
      hasNextPage: skip + feed.length < totalBlogs,
      blogs: feed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getFeed;
