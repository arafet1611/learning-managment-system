import jwt from "jsonwebtoken";
import Teacher from "../models/teacherModel.js";

const protectTeacher = async (req, res, next) => {
  //console.log(req.headers.authorization)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("token found");
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "abc123");
      //console.log(decoded)
      req.user = await Teacher.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default protectTeacher;
