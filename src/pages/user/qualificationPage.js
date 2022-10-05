import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import Qualification from '../../components/user/Qualification';
import './loginpage.css'

function qualificationPage() {
  return (
    <div>
        <Row >
     <NavBar/>   
    </Row>

   
    <Qualification/>
  
    </div>
  )
}

export default qualificationPage