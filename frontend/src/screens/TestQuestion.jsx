import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import "../styles/TestQuestion.css";
function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
function TestQuestion() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionChoices, setQuestionChoices] = useState([]);
  const [choices, setChoices] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(questionChoices.length);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [testId, setTestId] = useState("656c847dce178c17cfe1cbd0");

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [timer, setTimer] = useState(600);
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  useEffect(() => {
    const storedStudentInfo = localStorage.getItem("studentInfo");

    try {
      if (storedStudentInfo) setStudentInfo(JSON.parse(storedStudentInfo));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setStudentInfo(null);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (studentInfo && studentInfo.token) {
          const response = await axios.get(`/api/question/`, {
            headers: {
              Authorization: studentInfo.token,
            },
            params: {
              examId: testId, 
            },
          });
          if (response.data) {
            console.log(response);
            const fetchedQuestions = response.data;
            setQuestionChoices(fetchedQuestions);
          }
        } else {
          console.error("Student info or token is missing.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };
  
    fetchQuestions();
  }, [studentInfo, testId]);
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
    showQuestion(0);
  };

  const showQuestion = (index) => {
    resetState();
    console.log(questionChoices);
    let currentQuestion = questionChoices[index];
    if (currentQuestion) {
      console.log(currentQuestion);
      let questionNumber = index + 1;
      setQuestionText(`${questionNumber}. ${currentQuestion.question_text}`);
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

  const showScore = () => {
    resetState();
    setQuestionText(`You scored ${score} out of ${questionChoices.length}!`);
  };

  useEffect(() => {
    startQuiz();
  }, []);
  return (
    <div>
      <section>
        <div id="page_banner1" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                Courses
              </h1>
              <h3 className="pb-2 regular-400">
                We are offering a wide range of courses
              </h3>
              <p className="banner-body pb-2 light-300">
                We are glad to help you achieve your goal.
              </p>
            </div>
          </div>
        </div>
      </section>
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
      <section className="bg-info">
        <div className="container py-5">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-2 col-12 text-light align-items-center">
              <i className="display-1 bi-stars bi-lg"></i>
            </div>
            <div className="col-lg-8 col-12 text-light pt-2">
              <p className="light-300">Don't just study for certification</p>
              <h3 className="light-300">Get ready to become a professional</h3>
            </div>
            <div className="col-lg-2 col-12 text-light align-items-center">
              <i className="display-1 bi-currency-exchange bi-lg"></i>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TestQuestion;
