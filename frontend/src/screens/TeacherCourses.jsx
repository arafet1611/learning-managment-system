import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import TeacherNavs from "../components/TeacherNavs";
import CourseForTeacher from "../components/CourseForTeacher";
import Footer from "../components/Footer";


function TeacherCourses() {
  const [coursename, setCourseName] = useState("");
  const [units, setUnits] = useState("");
  const [outline, setOutline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const storedTeacherInfo = localStorage.getItem("teacherInfo")
  const teacherInfo = storedTeacherInfo ? JSON.parse(storedTeacherInfo ): null;
  //console.log(teacherInfo)
 // console.log(teacherInfo.token)
  useEffect(() => {
    getSpecificCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSpecificCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/course/specific" ,{
        headers: {
          Authorization: teacherInfo.token,
        },
      });
      setCourses(response.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "An error occurred while fetching courses.");
    }
  };

  const createCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/course/create", {
        course_name: coursename,
        course_outline: outline,
        total_units: units,
      },{
        headers: {
          Authorization: teacherInfo.token,
        },
      });
      setCourses([...courses, response.data]);
      setLoading(false);
      setCourseName("");
      setUnits("");
      setOutline("");
    } catch (error) {
      setLoading(false);
      setError(error.message || "An error occurred while creating a course.");
    }
  };

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <TeacherNavs />
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              {error && <Alert type="danger">{error}</Alert>}
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                Manage Courses
              </h1>
              <div className="col-md-8 mx-auto my-5 text-center text-dark">
                <form
                  className="contact_form row d-flex justify-content-center mx-0"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="coursename"
                        name="coursename"
                        placeholder="Course name*"
                        value={coursename}
                        onChange={(event) => setCourseName(event.target.value)}
                        required
                      />
                      <label htmlFor="coursename light-300">Course Name*</label>
                    </div>
                  </div>
                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-control-lg light-300"
                        id="units"
                        name="units"
                        placeholder="No. of Units*"
                        value={units}
                        onChange={(event) => setUnits(event.target.value)}
                        required
                      />
                      <label htmlFor="units light-300">Units*</label>
                    </div>
                  </div>
                  <div className="col-10 col-lg-12 mb-4">
                    <div className="form-floating mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="outline"
                        name="outline"
                        placeholder="Course Outline*"
                        value={outline}
                        onChange={(event) => setOutline(event.target.value)}
                        required
                      />
                      <label htmlFor="outline light-300">Outline*</label>
                    </div>
                  </div>
                  <div className="col-md-12 col-10 mx-auto my-3">
                    <button
                      type="button"
                      className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                      onClick={createCourse}
                    >
                      Save Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : courses.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            You have not created any course!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <CourseForTeacher spcfcourses={courses} />
        </section>
      )}

      <Footer />
    </div>
  );
}

export default TeacherCourses;
