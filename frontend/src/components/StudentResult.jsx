import React, { useState, useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function StudentResult() {
  const [results, setResults] = useState([]);
  const [passed, setPassed] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentToken, setStudentToken] = useState("");

  useEffect(() => {
    const storedStudentInfo = localStorage.getItem("studentInfo");

    try {
      if (storedStudentInfo) {
        const parsedStudentInfo = JSON.parse(storedStudentInfo);
        setStudentInfo(parsedStudentInfo);
        setStudentToken(parsedStudentInfo.token);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setStudentInfo(null);
    }
  }, []);
  useEffect(() => {
    if (studentToken) {
      axios.get('/api/result', {
        headers: {
          Authorization: studentToken,
        },
      })
        .then((response) => setResults(response.data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [studentToken]);
  const filteredresults = results.filter((result) => (result.marks_obtained >= 15 && passed) || (result.marks_obtained < 15 && !passed));

  const determineStatus = (marksObtained) => {
    return marksObtained >= 15;
  };

  const handleTogglePassed = () => {
    setPassed((prevPassed) => !prevPassed);
  };
  return (
    <div className="container mt-4">
    <center>  <h3 className="mb-3">My Results</h3>
      <Button variant="info" onClick={handleTogglePassed}>
        {!passed ? 'Show Failed Exams' : 'Show Passed Exams'}
      </Button>
      </center>
      <ListGroup className="mt-3">
        {filteredresults.map((result) => (
          
          <ListGroup.Item key={result._id}>
      <h5>{result.exam ? result.exam.exam_name : "Exam Name Not Available"}</h5>
            <p>
              Correct Answers: {result.nbCorrectAnswers} / {result.exam.no_of_questions}
            </p>
            <p>Marks Obtained: {result.marks_obtained}</p>
            <p>Status: {determineStatus(result.marks_obtained) ? 'Passed' : 'Failed'}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default StudentResult;
