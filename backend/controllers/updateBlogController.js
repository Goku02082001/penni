import createBlog from "../models/blogModel.js";

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const update = await createBlog.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true, runValidators: true }
    );
    res.status(200).send({message:"succeesfully update",update})
  } catch (error) {
    res.status(404).json({message:"Something went wrong",error:error.message})
  }
};

export default updateBlog