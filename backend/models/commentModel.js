import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "createBlog",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
