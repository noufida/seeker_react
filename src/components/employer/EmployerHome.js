import Button from 'react-bootstrap/Button';
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './emphome.css'
import { useNavigate} from 'react-router-dom'

function EmployerHome() {
  const navigate = useNavigate()
  return (
    <div>
      <Row>
        <Col className='m-5 p-5' align='center' lg={12} >
          <h1>Congrats, </h1>
          <h1>Your account registration was successfull !!</h1><br/><br/>
          <p style={{color:'green'}}>You will recieve an email in your registered email id once your account is verified.</p>
        <p>If you have already recieved the mail,try login again to enjoy your employer account.</p>
        </Col>
        
      </Row>
    </div>
  )
}

export default EmployerHome
