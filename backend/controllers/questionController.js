import Question from "../models/questionModel.js";
import mongoose from "mongoose";

const createQuestion = async (req, res) => {
  const { question_text, option1, option2, option3, option4, answer } =
    req.body;

  const question = new Question({
    question_text: question_text,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
    answer: answer,
  });

  try {
    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(400);
    throw new Error("Unable to create question");
  }
};

const getQuestionsByExam = async (req, res) => {
  try {
    const { examId } = req.query;
    console.log("exam id", examId);
    const objectIdExamId = new mongoose.Types.ObjectId(examId);

    const questions = await Question.find({ exam: objectIdExamId }).exec();

    if (questions && questions.length > 0) {
      res.status(200).json(questions);
    } else {
      res.status(404).json({ error: "No questions found for the given exam." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificQuestions = async (req, res) => {
  const questions = await Question.find({});

  const questionData = questions.filter((question) => {
    if (question.exam.equals(req.user._id)) {
      return question;
    }
  });

  res.status(200).send(questionData);
};

const updateQuestion = async (req, res) => {
  const { exam, question_text, option1, option2, option3, option4, answer } =
    req.body;

  const question = await Question.findById(req.params.id);

  if (question) {
    question.exam = exam;
    question.question_text = question_text;
    question.option1 = option1;
    question.option2 = option2;
    question.option3 = option3;
    question.option4 = option4;
    question.answer = answer;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params.id;

  Question.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      res.status(404);
      throw new Error("Question not found");
    } else {
      res.json({ message: "The question has been deleted" });
    }
  });
};
const getCorrectAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question) {
      res.status(200).json({ correctAnswer: question.answer });
    } else {
      res.status(404);
      throw new Error("Question not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  createQuestion,
  getQuestionsByExam,
  getSpecificQuestions,
  updateQuestion,
  deleteQuestion,
  getCorrectAnswer,
};
