import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from '../../components/user/Login'
import './loginpage.css'

function LoginPage() {
  return (
   <>
     
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={4}>
        
       <Login/>
       </Col>

      </Row>
 </>
  );
}

export default LoginPage;