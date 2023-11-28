import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import About from "./screens/About";
import Courses from "./screens/Courses";
import Tests from "./screens/Tests";
import Contact from "./screens/Contact";
import Notices from "./screens/Notices";
import TeacherLogin from "./screens/TeacherLogin";
import TeacherRegister from "./screens/TeacherRegister";
import TeacherDash from "./screens/TeacherDash";
import TeacherCourses from "./screens/TeacherCourses";
import TeacherTests from "./screens/TeacherTests";
import AddQuestion from "./screens/AddQuestion";
import StudentLogin from "./screens/StudentLogin";
import StudentRegister from "./screens/StudentRegister";
import StudentDash from "./screens/StudentDash";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/teacher_login" element={<TeacherLogin />} />
          <Route path="/teacher_register" element={<TeacherRegister />} />
          <Route path="/teacher_dashboard" element={<TeacherDash />} />
          <Route path="/teacher_courses" element={<TeacherCourses />} />
          <Route path="/teacher_tests" element={<TeacherTests />} />
          <Route path="/add_question" element={<AddQuestion />} />
          <Route path="/student_login" element={<StudentLogin />} />
          <Route path="/student_register" element={<StudentRegister />} />
          <Route path="/student_dashboard" element={<StudentDash />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
