/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate , useParams } from "react-router-dom";
import "../styles/TestQuestion.css";
function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
function TestQuestion(courseId) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionChoices, setQuestionChoices] = useState([]);
  const [choices, setChoices] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0); // Initialize with 0
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [testId, setTestId] = useState("");
  const [studentToken, setStudentToken] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [timer, setTimer] = useState(600);
  const [QuestionsTotalmarks, setQuestionsTotalmarks] = useState(0); //
  const navigate = useNavigate();
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const storedStudentInfo = localStorage.getItem("studentInfo");

    try {
      if (storedStudentInfo) {
        const parsedStudentInfo = JSON.parse(storedStudentInfo);
        setStudentInfo(parsedStudentInfo);
        setStudentToken(parsedStudentInfo.token)
        setTestId(useParams.testID);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setStudentInfo(null);
    }
  }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (studentToken) {
          const response = await axios.get(`/api/question/`, {
            headers: {
              Authorization: studentToken,
            },
            params: {
              examId: testId,
            },
          });
          if (response.data) {
            const fetchedQuestions = response.data;
            setQuestionChoices(fetchedQuestions);
            setTotalQuestions(fetchedQuestions.length);
            setCurrentQuestionIndex(0);
            showQuestion(0);
          }
        }
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, [studentToken, testId]);

  useEffect(() => {
    if (timer === 0) {
      showScore();
    }
  }, [timer]);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowNextButton(false);
  };

  const showQuestion = (index) => {
    resetState();
    let currentQuestion = questionChoices[index];
    if (currentQuestion) {
      let questionNumber = index + 1;
      setQuestionText(`${questionNumber}. ${currentQuestion.question_text}`);
      setQuestionsTotalmarks((prevTotalMarks) => {
        const marksToAdd = isNaN(currentQuestion.mark)
          ? 0
          : currentQuestion.marks;
        return prevTotalMarks + marksToAdd;
      });
      const shuffledChoices = shuffle([
        {
          text: currentQuestion.option1,
          answer: currentQuestion.answer === currentQuestion.option1,
        },
        {
          text: currentQuestion.option2,
          answer: currentQuestion.answer === currentQuestion.option2,
        },
        {
          text: currentQuestion.option3,
          answer: currentQuestion.answer === currentQuestion.option3,
        },
        {
          text: currentQuestion.option4,
          answer: currentQuestion.answer === currentQuestion.option4,
        },
      ]);
      setChoices(shuffledChoices);
      setCorrectAnswer(
        shuffledChoices.findIndex((choice) => choice.answer === true)
      );
    }
  };

  const resetState = () => {
    setChoices([]);
    setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (currentQuestionIndex < questionChoices.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showScore();
    }
  }, [currentQuestionIndex, questionChoices]);

  const selectChoice = (isCorrect, index) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnsweredQuestions(answeredQuestions + 1);

    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    setShowNextButton(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex < questionChoices.length - 1) {
      showQuestion(currentQuestionIndex + 1);
    } else {
      showScore();
    }
  };

  const showScore = async () => {
    try {
      if (studentToken) {
        console.log(testId, QuestionsTotalmarks, score);
        await axios.post(
          "/api/result",
          {
            exam: testId,
            marks_obtained: QuestionsTotalmarks,
            nbCorrectAnswers: score,
          },
          {
            headers: {
              Authorization: studentToken,
              "Content-Type": "application/json",
            },
          }
        );
        navigate(`/course/${courseId}/${testId}/results`);
      }
    } catch (error) {
      console.error("Error saving result:", error.message);
    }
  };

  useEffect(() => {
    startQuiz();
  }, [studentToken]);

  return (
    <div>
      <div className="app-container">
        <h1>Simple Quiz</h1>
        <div className="counter">
          Questions Answered: {answeredQuestions} of {totalQuestions}
        </div>

        <div className="timer">
          Time Remaining: {Math.floor(timer / 60)}:{timer % 60}
        </div>

        <div className="quiz">
          <h2 id="question">{questionText}</h2>
          <div id="answer-buttons">
            {choices.map((choice, index) => (
              <button
                key={index}
                className={`button ${
                  selectedAnswer === index
                    ? choice.answer
                      ? "correctanswer"
                      : "incorrectanswer"
                    : ""
                }`}
                onClick={() => selectChoice(choice.answer, index)}
                aria-label={choice.text}
                disabled={selectedAnswer !== null}
              >
                {choice.text}
              </button>
            ))}
          </div>
          {showNextButton && (
            <button id="next-button" onClick={handleNextButton}>
              Next
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default TestQuestion;
