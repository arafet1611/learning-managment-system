import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import Alert from "../components/Alert";
import Footer from "../components/Footer";

function TeacherLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/teacher/login", {
        tchr_email: email,
        password,
      });
      const { data } = response;
      if (data) {
        data.token = "Bearer " +data.token;
        localStorage.setItem("teacherInfo", JSON.stringify(data));
        console.log(data);
        window.location.replace("/teacher_dashboard");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              {error && <Alert type="danger">{error}</Alert>}
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                Teacher Login
              </h1>
              <div className="col-md-8 mx-auto my-5 text-dark">
                <form className="contact_form row" onSubmit={submitHandler}>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        value={email}
                        id="email"
                        name="email"
                        placeholder="Email*"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        required
                      />
                      <label htmlFor="email light-300">Email*</label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control form-control-lg light-300"
                        value={password}
                        id="password"
                        name="password"
                        placeholder="Password*"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        required
                      />
                      <label htmlFor="password light-300">Password*</label>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 mx-auto my-3">
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-10 col-md-8 mx-auto my-5 d-flex justify-content-around">
                <Link to="/student_login" exact>
                  <button
                    type="button"
                    className="btn rounded-pill btn-light px-4"
                  >
                    Student Login
                  </button>
                </Link>
                <Link to="/teacher_register" exact>
                  <button
                    type="button"
                    className="btn rounded-pill btn-outline-info px-4"
                  >
                    Register Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TeacherLogin;
