import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseInfo() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const response = await axios.get(`/api/course/${id}`);
        const data = response.data;
        setCourse(data[0]);
      } catch (error) {
        console.error('Error fetching course info:', error);
      }
    };

    fetchCourseInfo();
  }, [id]);

  return (
    <div className="container mt-4">
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
        </Container>
      ) : (
        <p>Loading...</p>
      )}

      <Button variant="primary" className="mt-3" onClick={() => window.history.back()}>
        Back
      </Button>
    </div>
  );
}

export default CourseInfo;
