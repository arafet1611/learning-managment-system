import React, { useEffect } from 'react';
import { Link  } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";



function TestForTeacher({testID, testName, questions, marks, time, courseName}) {
 
  const [examName, setExamName] = useState("");

  const [totalMarks, setTotalMarks] = useState("");
  const [totalTimes , setTotalTimes] = useState("");
  const [selectedCourse,setSelectedCourse] = useState("");
  
  const storedTeacherInfo = localStorage.getItem("teacherInfo")
  const teacherInfo = storedTeacherInfo ? JSON.parse(storedTeacherInfo ): null;
  const handleDelete = (testID)=>{
    const deleteUrl = `/api/exam/${testID}`;
  console.log("Deleting from URL:", deleteUrl);
    axios
    .delete(deleteUrl)
    .then((response) => {
      console.log("exam deleted successfully", response.data);
      console.log("Deleting test with ID:", testID);

    })
    .catch((error) => {
      console.error("Error deleting exam", error);
      console.log("Deleting test with ID:", testID);

    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .put(`/api/exam/update/${testID}`, {
        exam_name: examName,
        total_time: totalTimes,
        
      },{
        headers: {
          Authorization: teacherInfo.token,
        },
      })
      .then((response) => {
        console.log("exam updated successfully", response.data);
      })
      .finally(() => {
        setExamName('');
        setTotalTimes('');
      });

    };
   

  return (
    <div className="container py-5 text-center">

      <div className="row col-10 m-auto d-flex shadow rounded overflow-hidden bg-white">
        <div className="col-md-3 text-center bg-info text-light py-4">
          <i className="display-1 bi-pencil-square"></i>
          <h5 className="semi-bold-600 pb-4 light-300"></h5>
        </div>
        <div className="col-md-6 d-flex align-items-center pl-5 pt-lg-0 pt-4 text-start">
          <ul className="text-left px-4 list-unstyled mb-0 light-300">
            <li><i className="bi-circle-fill me-2"></i>{testName}</li>
            <li><i className="bi-circle-fill me-2"></i>Questions: {questions}</li>
            <li><i className="bi-circle-fill me-2"></i>Marks: {marks}, Time: {time}mins.</li>
            <li>  <Link to={`/add_question/${testID}`} className="btn rounded-pill px-4 mt-3 btn-success">
          Add Questions
        </Link></li>
          </ul>
        </div>
        <div className="col-md-3 text-end pt-3 d-flex align-items-center">
          <div className="w-100 light-300 d-flex d-md-block justify-content-between">
            <p><button type="button" className="btn rounded-pill px-4 btn-outline-primary mb-3"
             data-bs-toggle="modal"
            data-bs-target="#updateModal"
           onClick={()=>{
            setExamName(testName);
            setTotalMarks(marks);
            setTotalTimes(time);
           }} >Update</button></p>
            <p><button onClick={() => handleDelete(testID)} className="btn rounded-pill px-4 btn-outline-warning">Delete</button></p>
          </div>
        </div>
      </div>

      <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="row mx-auto w-100"  onSubmit={submitHandler}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Test - {testID}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="mb-4">
                  <div className="form-floating">
                    <input type="text" 
                    className="form-control form-control-lg light-300" 
                    id="testname" name="testname"
                     placeholder="Test name*"
                     value={examName}
                     onChange={(event)=>{
                      setExamName(event.target.value);
                     }} required/>
                    <label for="testname light-300">Test Name*</label>
                  </div>
                </div>

                  <div className="mb-4">
                    <div className="form-floating">
                      <input type="number"
                       className="form-control form-control-lg light-300"
                        id="marks" name="marks"
                         placeholder="Total Marks*"
                         value={totalMarks}
                         onChange={(event)=>{
                          setTotalMarks(event.target.value);
                         }} required/>
                      <label for="marks light-300">Total Marks*</label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="form-floating">
                      <input type="number"
                       className="form-control form-control-lg light-300"
                        id="time" name="time" 
                        placeholder="Time in mins*"
                        value={totalTimes}
                        onChange={(event)=>{
                          setTotalTimes(event.target.value);
                        }} required/>
                      <label for="time light-300">Time in Mins*</label>
                    </div>
                  </div>

              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default TestForTeacher