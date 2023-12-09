import React, { useState, useEffect } from 'react';
import TeacherTabs from '../components/TeacherTabs';
import TestForTeacher from '../components/TestForTeacher';
import Footer from '../components/Footer';
import axios from 'axios';
import { set } from 'mongoose';

function TeacherTests() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // New state for selected course
 
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingExams, setLoadingExams] = useState(true);
  const [examName, setExamName] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [tests, setTests] = useState([]);
  
  const storedTeacherInfo = localStorage.getItem('teacherInfo');
  const teacherInfo = storedTeacherInfo ? JSON.parse(storedTeacherInfo) : null;
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/course/all');
        setCourses(response.data);
        setLoadingCourses(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`/api/exam/${selectedCourse}`, {
          headers: {
            Authorization: teacherInfo.token,
          },
        });
        setTests(response.data);
        setLoadingExams(false);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setLoadingExams(false);
      }
    };
    fetchExams();
  }, [selectedCourse]);

  const createTest = async () => {
    try {
      const response = await axios.post(
        '/api/exam/createExam',
        {
          exam_name: examName,
          total_marks: totalMarks,
          total_time: totalTime,
          course: selectedCourse, 
        },
        {
          headers: {
            Authorization: teacherInfo.token,
          },
        }
      );
      setTests([...tests, response.data]);
      setExamName('');
      setTotalMarks('');
      setTotalTime('');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <div>

      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <TeacherTabs />
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Manage Tests</h1>
              <div className="col-md-8 mx-auto my-5 text-center text-dark">
                <form className="contact_form row d-flex justify-content-center mx-0" method="post" action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className="col-10 col-lg-12 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="testname"
                        name="testname"
                        placeholder="Test name"
                        value={examName}
                        onChange={(event) => setExamName(event.target.value)}
                        required
                      />
                      <label for="testname light-300">Test Name</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <select
                        className="form-select form-control form-control-lg light-300"
                        id="coursename"
                        name="coursename"
                        aria-label="Default select"
                        value={selectedCourse}
                        onChange={(event) => setSelectedCourse(event.target.value)}
                      >
                        <option selected>Select Course</option>
                        {loadingCourses ? (
                          <option disabled>Loading...</option>
                        ) : (
                          courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.course_name}
                        
                            </option>
                          ))
                        )}
                      </select>
                      <label for="coursename light-300">Select Course</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-control-lg light-300"
                        id="marks"
                        name="marks"
                        placeholder="Total Marks"
                        value={totalMarks}
                        onChange={(event) => setTotalMarks(event.target.value)}
                        required
                      />
                      <label for="marks light-300">Total Marks</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-control-lg light-300"
                        id="time"
                        name="time"
                        placeholder="Time in mins"
                        value={totalTime}
                        onChange={(event) => setTotalTime(event.target.value)}
                        required
                      />
                      <label for="time light-300">Time in Mins</label>
                    </div>
                  </div>

                  <div className="col-md-12 col-10 mx-auto my-3">
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                      onClick={createTest}
                    >
                      Save Test
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light pt-sm-0 py-5">
        {tests.map((test) => (
          <TestForTeacher
            key={test._id}
            testID={test._id}
            testName={test.exam_name}
            questions={test.no_of_questions}
            marks={test.total_marks}
            time={test.total_time}
            courseName={selectedCourse} 
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default TeacherTests;