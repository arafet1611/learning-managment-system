import Question from "../models/questionModel.js";
import mongoose, { isValidObjectId } from "mongoose";

const createQuestion = async (req, res) => {
  const { question_text, option1, option2, option3, option4, answer } =
    req.body;
  const { exam } = req.params;
  const question = new Question({
    exam: exam,
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
    const ObjectId = mongoose.Types.ObjectId;

    const examidobj = new ObjectId(examId);
    const questions = await Question.find().exec();
    console.log("questions", questions);
    const examQuestions = questions.filter((question) =>
      question.exam.equals(examidobj)
    );

    if (examQuestions.length > 0) {
      res.status(200).json(examQuestions);
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
    if (question.exam.equals(req.params.id)) {
      return question;
    }
  });

  res.status(200).send(questionData);
};

const updateQuestion = async (req, res) => {
  const { question_text, option1, option2, option3, option4, answer } =
    req.body;

  const question = await Question.findById(req.params.id);

  if (question) {
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
  try {
    const deleteQuestion = await Question.deleteOne({ _id: req.params.id });

    if (!deleteQuestion) {
      res.status(404).json({ message: "question not found" });
      return;
    }

    res.json({ message: "The question has been deleted" });
  } catch (error) {
    console.error("Error deleting question", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
