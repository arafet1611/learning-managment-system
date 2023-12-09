import express from "express";
import {
  createCourse,
  getCourses,
  getSpecificCourses,
  updateCourse,
  deleteCourse,
  subcribeToCourse,
  getCoursebyid,
} from "../controllers/courseController.js";
import {
  protectTeacher,
  protectStudent,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/create").post(protectTeacher, createCourse);
router.route("/specific").get(protectTeacher, getSpecificCourses);
router.route("/update/:id").put(protectTeacher, updateCourse);
router.route("/delete/:id").delete(protectTeacher, deleteCourse);
router.get("/all", getCourses);
router.get("/:id", getCoursebyid);
router.route("/subscribe").post(protectStudent, subcribeToCourse);

export default router;
