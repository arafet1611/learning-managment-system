import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
const authStudent = async (req, res) => {
  try {
    const { stud_email, password } = req.body;
    const user = await Student.findOne({ stud_email });

    if (user) {
      const { hashPassword } = user;
      const verified = bcrypt.compareSync(password, hashPassword);
      if (verified) {
        res.status(201).json({
          _id: user._id,
          stud_name: user.stud_name,
          stud_email: user.stud_email,
          stud_mobile: user.stud_mobile,
          stud_address: user.stud_address,
          stud_pic: user.stud_pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const registerStudent = async (req, res) => {
  const {
    stud_name,
    stud_email,
    password,
    stud_mobile,
    stud_address,
    stud_pic,
  } = req.body;

  const userExits = await Student.findOne({ stud_email });

  if (userExits) {
    res.status(400);
    throw new Error("Student already exits");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = await Student.create({
    stud_name,
    stud_email,
    hashPassword,
    stud_mobile,
    stud_address,
  });

  if (user) {
    console.log("teacher account created successfully");
    res.status(201).json({
      _id: user._id,
      stud_name: user.stud_name,
      stud_email: user.stud_email,
      user_type: user.user_type,
      stud_mobile: user.stud_mobile,
      stud_address: user.stud_address,
      stud_pic: user.stud_pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export { authStudent, registerStudent };
