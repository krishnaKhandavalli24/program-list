import React, { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
const data = require('./sample.json');

const ProgramContainer = (props) => {
  const seriesPrograms = data.entries.filter(function(item) {
    return item.programType === props.type;
  });
  const [programList, setProgramList] = useState(seriesPrograms);
  const [show, setShow] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [yearFacts, setYearFacts] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [progType, setProgType] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onPageSearch = (event) => {
      let filtered = seriesPrograms.filter(function(item) {
        return (item.title).toLowerCase().indexOf((event.target.value).toLowerCase()) > -1;
      });
      setProgramList(filtered);
  };

  const onProgramTileClick = useCallback((selectedMovie) => {    
    setModalHeader(selectedMovie.title);
    setModalDesc(selectedMovie.description);
    setProgType(selectedMovie.programType);
    setReleaseYear(selectedMovie.releaseYear);
    callFunFacts(selectedMovie.releaseYear);
    handleShow();
  }, []);

  const callFunFacts = (movieYear) => {
    let baseURL = 'http://numbersapi.com/'+movieYear+'/year'
    axios.get(baseURL).then((response) => {
      setYearFacts(response.data);
    });
  }

  return (
      <div>
        <div className="body-container">
            <div className="search-box">
                <i className="fa fa-search"/>
                <input type="text" onChange={onPageSearch.bind(this)}/>
            </div>
            <div>
              <div className="programs-list-container">
                {programList.map(function(item) {
                  return (
                    <div>
                      <div className="program-tiles" onClick={() => onProgramTileClick(item)}>
                        <img src={item.images.PosterArt.url} alt="image-not-found" height="150" width="100"/>
                      </div>
                      <div className="program-title">{item.title}</div>
                    </div>  
                  )
                })}
              </div>
            </div>
          </div>

         <Modal show={show} 
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="modal-title-name">
                {modalHeader}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{modalDesc}</p>
              <div>Program Type: {progType}</div>
              <div>Release Year: {releaseYear}</div>
            </Modal.Body>
            <Modal.Footer className="modal-footer-block">
              <div> 
                <span className="fun-facts">
                  Fun Facts
                </span>: {yearFacts}
              </div>
            </Modal.Footer>
          </Modal>
      </div>
  );
};


export default ProgramContainer;
