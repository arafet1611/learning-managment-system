import React, { useState ,useEffect} from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  useEffect(() => {
    const storedTeacherInfo = localStorage.getItem("teacherInfo");
    const storedStudentInfo = localStorage.getItem("studentInfo");
  
    try {
      if (storedTeacherInfo) setTeacherInfo(JSON.parse(storedTeacherInfo));
      if (storedStudentInfo) setStudentInfo(JSON.parse(storedStudentInfo));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setTeacherInfo(null);
      setStudentInfo(null);
    }
  }, []);
  useEffect (()=> {

  })
  const logoutHandler = () => {
    if(teacherInfo){
    localStorage.removeItem("teacherInfo");
    setTeacherInfo(null);
    window.location.replace("/");

    }else if(studentInfo){
    localStorage.removeItem("studentInfo");
    setStudentInfo(null);
    window.location.replace("/");

    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <NavLink className="navbar-brand fs-3 fw-bold" to="/" exact={true}>
            <i className="bi-building text-success"></i>
            <span className="text-dark">3</span>
            <span className="text-primary">L</span>
            <span className="text-dark">A</span>
            <span className="text-primary">M</span>
            <span className="text-primary">N</span>
            <span className="text-dark">I</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/" exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" exact>
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/courses" exact>
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tests" exact>
                  Tests
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" exact>
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="navbar align-self-center d-flex">
              {teacherInfo ? (
                <>
                  <NavLink
                    className="nav-link text-success"
                    to="/teacher_dashboard"
                    exact
                    title="Dashboard"
                  >
                    Hi,Mr. <strong>{teacherInfo.tchr_name}</strong>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/notices"
                    exact
                    title="Notices"
                  >
                    <i
                      className="bi-bell text-primary fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    onClick={logoutHandler}
                    to=""
                    title="Logout"
                  >
                    <i
                      className="bi-box-arrow-right text-danger fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                </>
              ) : studentInfo ? (
                <>
                  <NavLink
                    className="nav-link text-success"
                    to="/student_dashboard"
                    exact
                    title="Dashboard"
                  >
                    Hi, <strong>{studentInfo.stud_name}</strong>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/notices"
                    exact
                    title="Notices"
                  >
                    <i
                      className="bi-bell text-primary fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    onClick={logoutHandler}
                    to=""
                    title="Logout"
                  >
                    <i
                      className="bi-box-arrow-right text-danger fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="nav-link"
                    to="/notices"
                    exact
                    title="Notices"
                  >
                    <i
                      className="bi-bell text-primary fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/student_login"
                    exact
                    title="Student"
                  >
                    <i
                      className="bi-person-badge text-primary fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                  <NavLink
                    className="nav-link "
                    to="/teacher_login"
                    exact
                    title="Teacher"
                  >
                    <i
                      className="bi-person-circle text-success fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
