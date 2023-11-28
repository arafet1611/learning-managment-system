import Teacher from "../models/teacherModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const authTeacher = async (req, res) => {
  try {
    const { tchr_email, password } = req.body;
    const user = await Teacher.findOne({ tchr_email });

    if (user) {
      const { hashPassword } = user;
      const verified = bcrypt.compareSync(password, hashPassword);
      if (verified) {
        res.status(201).json({
          _id: user._id,
          tchr_name: user.tchr_name,
          tchr_email: user.tchr_email,
          user_type: user.user_type,
          tchr_mobile: user.tchr_mobile,
          tchr_address: user.tchr_address,
          tchr_pic: user.tchr_pic,
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

const registerTeacher = async (req, res) => {
  const {
    tchr_name,
    tchr_email,
    password,
    tchr_mobile,
    tchr_address,
    tchr_pic,
  } = req.body;

  const userExits = await Teacher.findOne({ tchr_email });

  if (userExits) {
    res.status(400);
    throw new Error("Teacher already exits");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user_type = "teacher";

  const user = await Teacher.create({
    tchr_name,
    tchr_email,
    hashPassword,
    user_type,
    tchr_mobile,
    tchr_address,
    tchr_pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      tchr_name: user.tchr_name,
      tchr_email: user.tchr_email,
      user_type: user.user_type,
      tchr_mobile: user.tchr_mobile,
      tchr_address: user.tchr_address,
      tchr_pic: user.tchr_pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export { authTeacher, registerTeacher };
