import React, { useState } from 'react';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';

function StudentProfile() {
  const storedStudentInfo = localStorage.getItem("studentInfo");
  const initialStudentInfo = storedStudentInfo ? JSON.parse(storedStudentInfo) : null;

  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdate = () => {
    
    setStudentInfo({ ...studentInfo }); 
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo)); 
    setShowUpdateForm(false); 
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const courses = [
    {
      course_name: 'Mathematics',
      course_outline: 'Advanced math concepts',
      total_units: 4,
    },
    {
      course_name: 'History',
      course_outline: 'World history overview',
      total_units: 3,
    },
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-3">My Profile</h3>
      <Card>
        <Card.Body>
          <Card.Title>{studentInfo.stud_name}</Card.Title>
          <Card.Text>
            <strong>Address:</strong> {studentInfo.stud_address}<br />
            <strong>Email:</strong> {studentInfo.stud_email}<br />
            <strong>Mobile:</strong> {studentInfo.stud_mobile}
          </Card.Text>
        </Card.Body>
      </Card>

      <Button variant="primary" className="mt-3" onClick={() => setShowUpdateForm(true)}>
        Update Info
      </Button>

      <h3 className="mt-4 mb-3">Subscribed Courses</h3>
      <ListGroup>
        {courses.map((course, index) => (
          <ListGroup.Item key={index}>
            <h5>{course.course_name}</h5>
            <p>
              <strong>Outline:</strong> {course.course_outline}<br />
              <strong>Total Units:</strong> {course.total_units}
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showUpdateForm} onHide={() => setShowUpdateForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStudName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="stud_name"
                value={studentInfo.stud_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStudAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="stud_address"
                value={studentInfo.stud_address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStudEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="stud_email"
                value={studentInfo.stud_email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStudMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your mobile number"
                name="stud_mobile"
                value={studentInfo.stud_mobile}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateForm(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentProfile;
