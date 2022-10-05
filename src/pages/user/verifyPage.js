import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import Verify from '../../components/user/Verify'
import './loginpage.css'

function VerifyPage() {
  return (
   <>
      <Row >
      <NavBar/>

      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={4}>
        
       <Verify/>
       </Col>

      </Row>
 </>
  );
}

export default VerifyPage;