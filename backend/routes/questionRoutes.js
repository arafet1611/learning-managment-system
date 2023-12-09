import express from "express";
import {
  createQuestion,
  getQuestionsByExam,
  getSpecificQuestions,
  updateQuestion,
  deleteQuestion,
  getCorrectAnswer,
} from "../controllers/questionController.js";
import {
  protectTeacher,
  protectStudent,
} from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").post(createQuestion);
router.route("/").get(getQuestionsByExam);
router.route("/:id").put(protectTeacher, updateQuestion);
router.route("/:id").delete(protectTeacher, deleteQuestion);
router.route("/getSpecificQu/:id").post(protectStudent, getSpecificQuestions);
router.route("/getCorrectAns/:id").get(protectStudent, getCorrectAnswer);
export default router;
