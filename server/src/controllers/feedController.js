import Blog from "../models/Blog.js";
import mongoose from "mongoose";

const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const userId = req.user?._id || null;

    // pipeline
    const feed = await Blog.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorData",
        },
      },
      {
        $unwind: {
          path: "$authorData",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "likes",
          let: { blogId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$blog", "$$blogId"] } } }],
          as: "likesData",
        },
      },

      {
        $lookup: {
          from: "comments",
          let: { blogId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$blog", "$$blogId"] } } }],
          as: "commentsData",
        },
      },

      {
        $addFields: {
          author: {
            _id: "$authorData._id",
            name: "$authorData.name",
            displayPicture: "$authorData.displayPicture",
          },
          likesCount: { $size: "$likesData" },
          commentsCount: { $size: "$commentsData" },
          liked: userId ? { $in: [userId, "$likesData.user"] } : false,
        },
      },

      { $project: { likesData: 0, authorData: 0, commentsData: 0 } },
    ]);


    const totalBlogs = await Blog.countDocuments();

    res.json({
      page,
      limit,
      totalBlogs,
      hasNextPage: skip + feed.length < totalBlogs,
      blogs: feed,
    });
  } catch (err) {
    console.error("Feed error:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getFeed;
