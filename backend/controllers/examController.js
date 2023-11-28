import Exam from "../models/examModel.js";

const createExam = async (req, res) => {
  const { exam_name, total_marks, created_by, course } = req.body;

  const exam = new Exam({ exam_name, total_marks, created_by, course });
  try {
    const createdExam = await Exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    res.status(400);
    throw new Error("Unable to create exam");
  }
};
const getSpecificExam = async (req, res) => {
  const courses = await Exam.find({});
  const courseData = courses.filter((course) => {
    if (course.created_by.equals(req.params.id)) {
      return course;
    }
  });

  res.status(200).send(courseData);
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
  const id = req.params.id;

  Exam.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      res.status(404);
      throw new Error("Exam not found");
    } else {
      res.json({ message: "The exam has been deleted" });
    }
  });
};
const IncreaseNumberOfQuestions = async (req, res) => {
  const { no_of_questions } = req.body;
  const exam = await Exam.findById(req.params.id);
  if (exam) {
    exam.no_of_questions = no_of_questions;
    const updatedExam = await Exam.save();
    res.json(updatedExam);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
};
export {
  createExam,
  getSpecificExam,
  updateExam,
  deleteExam,
  IncreaseNumberOfQuestions,
};
