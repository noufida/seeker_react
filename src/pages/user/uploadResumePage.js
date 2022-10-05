import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import UploadResume from '../../components/user/UploadResume';

function uploadResumePage() {
  return (
    <div>
          <Row >
      <NavBar/>
     
      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
     <Col lg={3}>
        <UploadResume/>
     </Col>
      </Row>
    </div>
  )
}

export default uploadResumePage