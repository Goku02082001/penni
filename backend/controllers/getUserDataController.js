import user from "../models/userAuthModel.js";

const getLoggedInUser = async (req, res) => {
  try {
    const userData = await user.findById(req.userId).select("userName email"); 
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User data fetched successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default getLoggedInUser;
