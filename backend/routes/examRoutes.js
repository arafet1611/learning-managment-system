import express from "express";
import {
  createExam,
  getSpecificExam,
  updateExam,
  deleteExam,
  IncreaseNumberOfQuestions,
} from "../controllers/examController.js";
import { protectTeacher } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/createExam").post(protectTeacher, createExam);
router.route("/:id").get(getSpecificExam);
router.route("/update/:id").put(updateExam);
router.route("/:id").delete(deleteExam);
router.route("/increaseQuestion").put(IncreaseNumberOfQuestions);

export default router;
