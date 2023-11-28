import express from "express";
import {
  authStudent,
  registerStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/login", authStudent);
router.post("/register", registerStudent);

export default router;
