import React ,{useEffect, useState}from 'react';
import TeacherTabs from '../components/TeacherTabs';
import QsnForTeacher from '../components/QsnForTeacher';
import Footer from '../components/Footer';
import axios from "axios";
import { useParams } from 'react-router-dom';
function AddQuestion() {
  const [mark, setMark] = useState('');
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const[questions , setQuestions ] = useState([]);
  const [totalQuestion , setTotalQuestion] = useState(0);
  const {testId} = useParams() ;
  const storedTeacherInfo = localStorage.getItem("teacherInfo")
  const teacherInfo = storedTeacherInfo ? JSON.parse(storedTeacherInfo ): null;

 

  useEffect(()=>{
    fetchQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const fetchQuestions = async ()=>{
    try{
      const response = await axios.get(`/api/question/${testId}`,
      {
        headers: {
          Authorization: teacherInfo.token,
        },
      });
      setQuestions(response.data);
      setTotalQuestion(response.data.length);
      
      
    }catch(error){
      console.error("error getting  question by Exam:", error);
    }
  }


  useEffect(()=>{
    const updateTotalQuestion = async ()=>{
      try{
       
        const response = await axios.put(`/api/exam/increaseQuestion/${testId}`,{
          no_of_questions : totalQuestion,
        })
       
      console.log("update Total Question successfully",response.data.message);
      }catch (err){
        console.error("Error updating total question:", err.response?.data || err.message);
        
      }
    };
    updateTotalQuestion();
   },[testId, totalQuestion]);
   
 

  const createQuestion = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/question', {
        exam : testId ,
        question_text: questionText,
        mark : mark,
        option1,
        option2,
        option3,
        option4,
        answer,
      },{
        headers: {
          Authorization: teacherInfo.token,
        },
      });
      console.log('Question created:', response.data);      
      setMark("");
      setQuestionText("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setAnswer("");
    } catch (error) {
      console.error('Error creating question:', error);
     
    }
  };
  
  
  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <TeacherTabs/>
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">Add Question</h1>
              <div className="col-md-8 mx-auto my-5 text-center text-dark">
                <form className="contact_form row d-flex justify-content-center mx-0" method="post" action="#">

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <p  className="form-control form-control-lg light-300"  >{ testId.substring(0, 6)}</p>
                      <p></p>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="number" 
                      className="form-control form-control-lg light-300" 
                      id="mark" name="mark"
                       placeholder="Total Mark"
                       value={mark}
                       onChange={(event) => setMark(event.target.value)} required/>
                      <label for="mark light-300">Total Mark</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-12 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300" 
                      id="questionText" name="questionText"
                       placeholder="Question Text*"
                       value={questionText}
                       onChange={(event) => setQuestionText(event.target.value)}
                        required/>
                      <label for="questionText light-300">Question Text*</label>
                    </div>
                  </div>
                  
                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300"
                       id="option1" name="option1"
                        placeholder="Option 1*"
                        value={option1}
                        onChange={(event) => setOption1(event.target.value)}
                         required/>
                      <label for="option1 light-300">Option 1*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" className="form-control form-control-lg light-300"
                      id="option2" name="option2" placeholder="Option 2*"
                      value={option2}
                      onChange={(event) => setOption2(event.target.value)}
                       required/>
                      <label for="option2 light-300">Option 2*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text" 
                      className="form-control form-control-lg light-300"
                       id="option3" name="option3" placeholder="Option 3*"
                       value={option3}
                      onChange={(event) => setOption3(event.target.value)}
                      required/>
                      <label for="option3 light-300">Option 3*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input type="text"
                       className="form-control form-control-lg light-300"
                        id="option2" name="option4" placeholder="Option 4*"
                        value={option4}
                        onChange={(event) => setOption4(event.target.value)}
                        required/>
                      <label for="option4 light-300">Option 4*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-12 mb-4">
                    <div className="form-floating">
                      <select class="form-select form-control form-control-lg light-300" 
                      id="answer" name="answer" aria-label="Default select"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      >
                        <option selected>Select Answer*</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                      </select>
                      <label for="answer light-300">Select Answer*</label>
                    </div>
                  </div>
                  
                  <div className="col-md-12 col-10 mx-auto my-3">
                    <button type="submit" 
                    className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                    onClick={createQuestion}>Save Question</button>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light pt-sm-0 py-5">
        
        <QsnForTeacher spcfquestions ={questions} />     
      </section>
      <Footer/>
    </div>
  )
}

export default AddQuestion