import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import Alert from "../components/Alert";

import Footer from "../components/Footer";
import axios from "axios";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log(error);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/student/login", {
        stud_email: email,
        password,
      });
      const { data } = response;

      if (data) {
        data.token = "Bearer " +data.token;

        localStorage.setItem("studentInfo", JSON.stringify(data));
        window.location.replace("/student_dashboard");
        console.log("Login successful:", data);
      } else {
        throw new Error("Invalid credentials ");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      setError("Invalid credentials");
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
                Student Login
              </h1>
              <div className="col-md-8 mx-auto my-5 text-dark">
                <form className="contact_form row" onSubmit={submitHandler}>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="email"
                        name="email"
                        placeholder="Email*"
                        required
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                      <label htmlFor="email" className="light-300">
                        Email*
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control form-control-lg light-300"
                        id="password"
                        name="password"
                        placeholder="Password*"
                        required
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <label htmlFor="password" className="light-300">
                        Password*
                      </label>
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
                  {error && (
                    <div className="col-md-12 col-12 mx-auto my-3 text-danger">
                      {error}
                    </div>
                  )}
                </form>
              </div>
              <div className="col-10 col-md-8 mx-auto my-5 d-flex justify-content-around">
                <NavLink to="/teacher_login" exact>
                  <button
                    type="button"
                    className="btn rounded-pill btn-light px-4"
                  >
                    Teacher Login
                  </button>
                </NavLink>
                <NavLink to="/student_register" exact>
                  <button
                    type="button"
                    className="btn rounded-pill btn-outline-info px-4"
                  >
                    Register Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default StudentLogin;
