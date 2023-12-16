import express from "express";

import {
  createResult,
  getResultsByStudent,
  getResultsByExam,
} from "../controllers/resultController.js";
import {
  protectStudent,
  protectTeacher,
} from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", protectStudent, createResult);
router.get("/", protectStudent, getResultsByStudent);
router.get("/:examId", getResultsByExam);
export default router;
