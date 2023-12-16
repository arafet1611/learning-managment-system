import Exam from "../models/examModel.js";

const createExam = async (req, res) => {
  const { exam_name, total_marks, total_time, course } = req.body;
  const created_by = req.user_id;
  const exam = new Exam({
    exam_name,
    total_marks,
    total_time,
    created_by,
    course,
  });
  try {
    const createdExam = await exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    console.error("Error creating exam:", error);
    res
      .status(400)
      .json({ error: "Unable to create exam", details: error.message });
  }
};
const getSpecificExam = async (req, res) => {
  const exams = await Exam.find({});
  const examData = exams.filter((exam) => {
    if (exam.course.equals(req.params.id)) {
      return exam;
    }
  });

  res.status(200).send(examData);
};
const updateExam = async (req, res) => {
  const { exam_name, total_marks } = req.body;

  const exam = await Exam.findById(req.params.id);

  if (exam) {
    exam.exam_name = exam_name;
    exam.total_marks = total_marks;

    const updatedExam = await Exam.save();
    res.json(updatedExam);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
};
const deleteExam = async (req, res) => {
  try {
    const deletedExam = await Exam.deleteOne({ _id: req.params.id });

    if (!deletedExam) {
      res.status(404).json({ message: "Exam not found" });
      return;
    }

    res.json({ message: "The exam has been deleted" });
  } catch (error) {
    console.error("Error deleting exam", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const IncreaseNumberOfQuestions = async (req, res) => {
  const { no_of_questions } = req.body;
  const exam = await Exam.findById(req.params.id);
  if (exam) {
    exam.no_of_questions = no_of_questions;
    const updatedExam = await exam.save();
    res.json(updatedExam);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
};
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.status(201).json(exams);
  } catch (err) {
    console.error("error to get all exams", err);
  }
};
const changeResultStatue = async (req, res) => {
  const { resultStatue } = req.body;
  const exam = await Exam.findById(req.params.id);
  if (exam) {
    exam.result_statue = resultStatue;
    const updatedExam = await exam.save();
    res.json(updatedExam);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
};
const getExamsByCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const exams = await Exam.find().exec();
    const courseExams = exams.filter((exam) => exam.course.equals(id));

    if (courseExams.length > 0) {
      res.status(200).json(courseExams);
    } else {
      res.status(404).json({ error: "No exams found for the given course." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  createExam,
  getSpecificExam,
  updateExam,
  deleteExam,
  IncreaseNumberOfQuestions,
  getExams,
  getExamsByCourse,
  changeResultStatue,
};
