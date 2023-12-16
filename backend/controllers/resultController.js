import Result from "../models/resultModel.js";

const createResult = async (req, res) => {
  const { exam, marks_obtained, nbCorrectAnswers } = req.body;
  console.log(req.user);
  const result = new Result({
    student: req.user._id,
    exam: exam,
    marks_obtained: marks_obtained,
    nbCorrectAnswers,
  });

  try {
    const createdResult = await result.save();
    res.status(201).json(createdResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getResultsByStudent = async (req, res) => {
  try {
    const results = await Result.find({}).populate("exam");
    student: req.user._id;
    const resultsData = results.filter((result) => {
      console.log(result.student);
      if (result.student.equals(req.user._id)) {
        return result;
      }
    });
    res.status(200).json(resultsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getResultsByExam = async (req, res) => {
  const { examId } = req.params;

  try {
    const results = await Result.find({ exam: examId }).populate("student");
    const resultsData = results.filter((result) => {
      if (result.exam.equals(examId)) {
        return result;
      }
    });
    res.status(200).json(resultsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createResult, getResultsByStudent, getResultsByExam };
