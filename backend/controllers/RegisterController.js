import user from "../models/userAuthModel.js";
import bcrypt from 'bcrypt';

const AuthRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(req.body)
    const userData = await user.find({ email });
    if (userData.length > 0) {
      return res.status(400).json({ message: "User already exists", userData });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = new user({ userName, email, password: hashPassword });
    await data.save();

    return res.status(200).json({ message: "Registered Successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export default AuthRegister;
