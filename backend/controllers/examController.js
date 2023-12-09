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
