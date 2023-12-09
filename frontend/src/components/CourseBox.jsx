import React from "react";
import { NavLink } from "react-router-dom";
import bck from "../assets/img/workspace.jpg";
import axios from "axios";

function CourseBox({ courseId,courseName, courseOutline }) {
  const storedStudentInfo = localStorage.getItem("studentInfo")

  const studentInfo = storedStudentInfo ? JSON.parse(storedStudentInfo ): null;
  const handleEnrollClick = async () => {
    try {
      if (studentInfo && studentInfo.token) {

      const response = await axios.post(
        "/api/course/subscribe",
        { course_id: courseId },
        {
          headers: {
            Authorization: studentInfo.token,
          },
        }
      );
      console.log("Enrollment successful", response.data);
    } else {
      console.error("Invalid student information for enrollment");
    }
    } catch (error) {
      console.error("Enrollment failed", error.message);
    }
  };
  return (
    <div className="col-xl-3 col-md-4 col-sm-6 filter frontend">
      <NavLink
        to={`/course/${courseId}`}
        exact
        className="course card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
      >
        <img className="course card-img" src={bck} alt="courseImage" />
        <div className="course-vertical card-img-overlay d-flex align-items-end">
          <div className="course-content text-left text-light">
            <p className="card-text">
              <strong>{courseName}</strong>
            </p>
            <p className="card-text">{courseOutline}</p>
            <span
              className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300"
              onClick={handleEnrollClick}
            >
              Enroll Now
            </span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default CourseBox;
