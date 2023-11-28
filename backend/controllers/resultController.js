import Result from "../models/resultModel.js";

const createResult = async (req, res) => {
  const { student, exam, marks_obtained } = req.body;

  const result = new Result({
    student: student,
    exam: exam,
    marks_obtained: marks_obtained,
  });

  try {
    const createdResult = await result.save();
    res.status(201).json(createdResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createResult };
