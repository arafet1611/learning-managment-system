import express from "express";
import {
  authTeacher,
  registerTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/login", authTeacher);
router.post("/register", registerTeacher);

export default router;
