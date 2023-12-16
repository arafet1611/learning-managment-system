import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import TestBox from '../components/TestBox';
import CourseUnits from '../components/CourseUnits';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";

function CourseInfo() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);
  const [studentToken, setStudentToken] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [userResult, setUserResult] = useState(null);

  useEffect(() => {
    const fetchUserResult = async () => {
      try {
        if (tests.length > 0) {
          const response = await axios.get(`/api/result/${tests[0]._id}`);
          setUserResult(response.data[0]);  // Access the first element of the array
        }
      } catch (error) {
        console.error('Error fetching user result:', error);
      }
    };
  
    fetchUserResult();
  }, [id, studentToken , tests]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`/api/exam/course/${id}`);
        setTests(response.data);
      } catch (err) {
        console.error("An error occurred while fetching tests", err);
      }
    };
    fetchTests();
  }, [id , userResult]);

  useEffect(() => {
    const storedStudentInfo = localStorage.getItem("studentInfo");

    try {
      if (storedStudentInfo) {
        const parsedStudentInfo = JSON.parse(storedStudentInfo);
        setStudentToken(parsedStudentInfo.token);
        setStudentInfo(parsedStudentInfo)
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setStudentToken("");
    }
  }, []);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const response = await axios.get(`/api/course/${id}`, {
          headers: {
            Authorization: studentToken,
          },
        });
        const data = response.data;
        setCourse(data[0]);
      } catch (error) {
        console.error('Error fetching course info:', error);
      }
    };

    fetchCourseInfo();
  }, [id, studentToken]);

  return (
    <div className="container mt-4">
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
      {course ? (
        <Container className="mt-5">
          <Row>
            <Col md={8}>
              <h2>{course.course_name}</h2>
              <p>{course.course_outline}</p>
              <p>Rating: 4.6 out of 5 (8,230 ratings)</p>
              <p>{course.total_students} participants</p>
              <p>Created by: {course.created_by}</p>
              <p>Created Date: {course.created_at}</p>
              <p>Language: English, French</p>
              <p>Available for 30 days</p>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>About the Course:</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Takes 64.5 hours to complete</ListGroup.Item>
                    <ListGroup.Item>34 Exercises</ListGroup.Item>
                    <ListGroup.Item>163 Articles</ListGroup.Item>
                    <ListGroup.Item>19 Downloadable Resources</ListGroup.Item>
                    <ListGroup.Item>Accessible on Computer and Mobile</ListGroup.Item>
                    <ListGroup.Item>Unlimited Access Throughout the Available Period</ListGroup.Item>
                    <ListGroup.Item>Certification Upon Course Completion</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={8}>
              <h3>What You Will Learn:</h3>
              <ul>
                <li>Topic 1: A brief description of the first topic</li>
                <li>Topic 2: An overview of the second topic</li>
                <li>Topic 3: In-depth exploration of the third topic</li>
              </ul>
            </Col>
          </Row>
          <section className="container overflow-hidden py-5">
            <div className="row gx-5 gx-sm-3 gx-lg-5 gy-lg-5 gy-3 pb-3 courses">
              {tests.length === 0 ? (
                <p>This course has no exams.</p>
              ) : (
                userResult && userResult.student && studentInfo && (
                  userResult.student.stud_email === studentInfo.stud_email ? (
                    userResult.marks_obtained > 15 ? (
                      <CourseUnits />
                    ) : (
                      <p>You failed the exam. Try another one.</p>
                    )
                  ) : (
                    tests.map((test) => (
                      <TestBox
                        key={test._id}
                        testName={test.exam_name}
                        questions={test.no_of_question}
                        marks={test.total_marks}
                        time={test.total_time}
                      />
                    ))
                  )
                )
              )}
            </div>
          </section>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
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

export default CourseInfo;
