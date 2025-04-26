import likeModel from "../models/likeModel.js";
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.userId;

    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ message: "Like removed" });
    }

    const newLike = await Like.create({ postId, userId });
    res.status(201).json({ message: "Post liked", like: newLike });

  } catch (error) {
    res.status(500).json({ message: "Error in toggling like", error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ postId });
    res.status(200).json({ totalLikes: likes.length, likes });
  } catch (error) {
    res.status(500).json({ message: "Error getting likes", error: error.message });
  }
};
