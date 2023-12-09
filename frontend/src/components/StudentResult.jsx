import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

function StudentResult() {
  const [showPassed, setShowPassed] = useState(true);

  const exams = [
    { name: 'Math Exam', nbCorrectAnswers: 15, totalQuestions: 20, marksObtained: 80, passed: true },
    { name: 'History Exam', nbCorrectAnswers: 18, totalQuestions: 20, marksObtained: 60, passed: false },
  ];

  const filteredExams = exams.filter((exam) => exam.passed === showPassed);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Student Results</h3>
      <Button variant="info" onClick={() => setShowPassed(!showPassed)}>
        {showPassed ? 'Show Failed Exams' : 'Show Passed Exams'}
      </Button>
      <ListGroup className="mt-3">
        {filteredExams.map((exam, index) => (
          <ListGroup.Item key={index}>
            <h5>{exam.name}</h5>
            <p>
              Correct Answers: {exam.nbCorrectAnswers} / {exam.totalQuestions}
            </p>
            <p>Marks Obtained: {exam.marksObtained}</p>
            <p>Status: {exam.passed ? 'Passed' : 'Failed'}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default StudentResult;
