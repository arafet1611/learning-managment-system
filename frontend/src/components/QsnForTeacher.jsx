import React , {useState} from 'react';
import axios from 'axios';



function QsnForTeacher({spcfquestions}) {

  const [questionText , setQuestionText]= useState('');
  const [option1,setOption1] = useState('');
  const [option2,setOption2] = useState('');
  const [option3,setOption3] = useState('');
  const [option4,setOption4] = useState('');
  const [answer , setAnswer] = useState('');
  const [questionId,setQuestionId] = useState('');
  const [questions , setQuestions] = useState([]);

  const storedTeacherInfo = localStorage.getItem("teacherInfo")
  const teacherInfo = storedTeacherInfo ? JSON.parse(storedTeacherInfo ): null;


  let i = 1 ;
  const handleDelete = (id)=>{
    axios
    .delete(`/api/question/${id}`,{
      headers:{
        Authorization: teacherInfo.token,
      },
    })
    .then((response) => {
      console.log("question deleted successfully", response.data);
    })
    .catch((error) => {
      console.error("Error deleting question", error);
    });
  };
  
  const submitHandler = (event)=>{
    event.preventDefault();
    axios 
    .put(`/api/question/${questionId}`,{
      question_text : questionText,
      option1 : option1,
      option2 : option2,
      option3 : option3,
      option4 : option4,
      answer : answer
    },{
      headers: {
        Authorization: teacherInfo.token,
      },
    })
    .then((response) => {
      console.log("question updated successfully", response.data);
     
    })
    .catch((error) => {
      console.error("Error deleting question", error);
    })
    .finally(() =>{
      setQuestionText("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setAnswer("");
      setQuestionId("");
    });
  }
   
  return (
    <div className="container py-5 text-center">
        {spcfquestions.map((spcfquestion)=>(
             <div className="row col-10 m-auto d-flex shadow rounded overflow-hidden bg-white"
              key={spcfquestion._id}>
             <div className="col-md-2 text-center bg-info text-light py-4">
               <h3 className="semi-bold-600 pb-4 light-300">#{i++} </h3>
               <h5 className="semi-bold-600 pb-4 light-300">Mark: {spcfquestion.mark}</h5>
             </div>
             <div className="col-md-7 d-flex align-items-center pl-5 pt-lg-0 pt-4 text-start">
               <ul className="text-left px-4 list-unstyled mb-0 light-300">
                 <li><i className="bi-circle-fill me-2">{spcfquestion.question_text}</i></li>
                 <li>A) {spcfquestion.option1} </li>
                 <li>B) {spcfquestion.option2}</li>
                 <li>C) {spcfquestion.option3}</li>
                 <li>D) {spcfquestion.option4} </li>
                 <li className="text-success">Answer:{spcfquestion.answer} </li>
               </ul>
             </div>
             <div className="col-md-3 text-end pt-3 d-flex align-items-center">
               <div className="w-100 light-300 d-flex d-md-block justify-content-between">
                 <p><button type="button" className="btn rounded-pill px-4 btn-outline-primary mb-3"
                  data-bs-toggle="modal" 
                 data-bs-target="#updateModal"
                 onClick={()=>{
                  setQuestionText(spcfquestion.question_text);
                  setOption1(spcfquestion.option1);
                  setOption2(spcfquestion.option2);
                  setOption3(spcfquestion.option3);
                  setOption4(spcfquestion.option4);
                  setAnswer(spcfquestion.answer);
                  setQuestionId(spcfquestion._id);
                 }}>Update</button></p>
                 <p><button 
                 onClick={()=>{
                  handleDelete(spcfquestion._id);
                 }}
                 exact className="btn rounded-pill px-4 btn-outline-warning">Delete</button></p>
               </div>
             </div>
           </div>
        ))}
   
        
      <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="row mx-auto w-100" onSubmit={submitHandler}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Question - </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="mb-4">
                  <div className="form-floating">
                    <input type="text" className="form-control form-control-lg light-300"
                     id="questionText" name="questionText" placeholder="Question Text*"
                     value={questionText}
                     onChange={(event)=>{
                      setQuestionText(event.target.value);
                     }} required/>
                    <label for="questionText light-300">Question Text*</label>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input type="text"
                     className="form-control form-control-lg light-300" 
                     id="option1" name="option1" 
                     placeholder="Option 1*" 
                     value={option1} 
                     onChange={(event)=>{
                      setOption1(event.target.value);
                     }}required/>
                    <label for="option1 light-300">Option 1*</label>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input type="text" 
                    className="form-control form-control-lg light-300"
                     id="option2" name="option2" placeholder="Option 2*"
                     value={option2} 
                     onChange={(event)=>{
                      setOption2(event.target.value);
                     }} required/>
                    <label for="option2 light-300">Option 2*</label>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input type="text"
                     className="form-control form-control-lg light-300"
                      id="option3" name="option3" placeholder="Option 3*"
                      value={option3} 
                      onChange={(event)=>{
                       setOption3(event.target.value);
                      }} required/>
                    <label for="option3 light-300">Option 3*</label>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input type="text"
                     className="form-control form-control-lg light-300"
                      id="option2" name="option4" placeholder="Option 4*"
                      value={option4} 
                      onChange={(event)=>{
                       setOption4(event.target.value);
                      }} required/>
                    <label for="option4 light-300">Option 4*</label>
                  </div>
                </div>

                <div className="cmb-4">
                  <div className="form-floating">
                    <select 
                    className="form-select form-control form-control-lg light-300"
                     id="answer" name="answer" aria-label="Default select"
                     value={answer}
                     onChange={(event)=>{
                      setAnswer(event.target.value);
                     }}>
                      <option selected>Select Answer*</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                      <option value="4">Option 4</option>
                    </select>
                    <label for="answer light-300">Select Answer*</label>
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

export default QsnForTeacher