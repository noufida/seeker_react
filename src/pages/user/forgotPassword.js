import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForgotPassword  from '../../components/user/ForgotPassword'
import './loginpage.css'

function forgotPassword() {
  return (
   <>
      
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={4}>
        
       <ForgotPassword/>
       </Col>

      </Row>
 </>
  );
}

export default forgotPassword;