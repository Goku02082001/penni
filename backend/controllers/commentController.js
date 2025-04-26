import commentModel from "../models/commentModel.js";
export const addComment = async (req, res) => {
  try {
    const { postId, commentText } = req.body;
    const userId = req.userId;

    const comment = await Comment.create({ postId, userId, commentText });
    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate("userId", "userName");
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Error getting comments", error: error.message });
  }
};
