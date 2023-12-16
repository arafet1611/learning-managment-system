import express from "express";
import {
  createExam,
  getSpecificExam,
  updateExam,
  deleteExam,
  IncreaseNumberOfQuestions,
  getExams,
  getExamsByCourse,
  changeResultStatue,
} from "../controllers/examController.js";
import { protectTeacher } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/createExam").post(protectTeacher, createExam);
router.route("/:id").get(getSpecificExam);
router.route("/update/:id").put(updateExam);
router.route("/:id").delete(deleteExam);
router.route("/increaseQuestion/:id").put(IncreaseNumberOfQuestions);
router.route("/").get(getExams);
router.route("/course/:id").get(getExamsByCourse);
router.route("/status/:id").put(changeResultStatue);
export default router;
