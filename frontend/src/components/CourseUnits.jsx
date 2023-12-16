import React, { useRef, useState, useEffect } from 'react';
import { Modal, Button, Container, Card } from 'react-bootstrap'; 
import studyImg from '../assets/img/study.jpg';
import Footer from "../components/Footer";
function CourseUnits() {


  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const unitTitle = useRef('');
  const unitPDF = useRef(null);

  function createUnit() {
    const pdfFile = unitPDF.current.files[0];
    const pdfUrl = pdfFile ? URL.createObjectURL(pdfFile) : null;

    setTasks([
      ...tasks,
      {
        title: unitTitle.current.value,
        pdf: pdfUrl,
      },
    ]);

    saveTasks([
      ...tasks,
      {
        title: unitTitle.current.value,
        pdf: pdfUrl,
      },
    ]);

    unitPDF.current.value = null;
  }

  function deleteUnit(index) {
    const clonedUnits = [...tasks];
    clonedUnits.splice(index, 1);
    setTasks(clonedUnits);
    saveTasks([...clonedUnits]);
  }

  function loadUnits() {
    let loadedUnits = localStorage.getItem('units');
    let units = JSON.parse(loadedUnits);

    if (units) {
      setTasks(units);
    }
  }

  function saveTasks(units) {
    localStorage.setItem('units', JSON.stringify(units));
  }

  useEffect(() => {
    loadUnits();
  }, []);

  return (
    <div>
  
  
      <div className="container py-5">
        <Modal show={opened} onHide={() => setOpened(false)}>
          <Modal.Header closeButton>
            <Modal.Title>New Unit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type='text'
              ref={unitTitle}
              placeholder='Unit Title'
              required
              className='form-control'
            />
            <input
              type='file'
              ref={unitPDF}
              accept='.pdf'
              className='form-control mt-2'
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                createUnit();
                setOpened(false);
              }}
            >
              Create Unit
            </Button>
          </Modal.Footer>
        </Modal>

        <Container>
          <div className='d-flex justify-content-between align-items-center'>
            <h1 style={{ fontFamily: 'Greycliff CF', fontWeight: 900 }}>Course Units</h1>
          </div>
          {tasks.length > 0 ? (
            tasks.map((unit, index) => (
              <Card key={index} className='mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <strong>{unit.title}</strong>
                  <div>
                    
                    <Button
                      variant='danger'
                      className='transparent'
                      onClick={() => deleteUnit(index)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant='primary'
                      className='ml-2'
                      onClick={() => window.open(unit.pdf, '_blank')}
                    >
                      Open PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <>
              <p className='d-flex text-lg mt-3 text-muted'>You have no units</p>
            </>
          )}
           {/* <Button onClick={() => setOpened(true)} variant='primary' className='mt-3'>
            New Unit
          </Button>  */}
        </Container>
      </div>


    </div>
  );
}

export default CourseUnits