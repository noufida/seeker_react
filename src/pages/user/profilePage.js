import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import Profile from '../../components/user/Profile';

function profilePage() {
  return (
    <div> 
    <Row >
     <NavBar/>   
    </Row>

    <Row className='justify-content-center mt-5 pt-5' >
   <Col lg={6}>
    <Profile/>
   </Col>
    </Row>

    </div>
  )
}

export default profilePage