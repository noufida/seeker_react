import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom'
import ImageWelcome from '../../img/welcome.jpg'
import './split.css'

function Split() {
    const navigate = useNavigate()
  return (
    <div>
        <Row>
      <Col className='col1'>
      <Card className='cardz'>

      <div className='img-div'>
      <img className='welcome-img' src={ImageWelcome}/><br/>
      
      </div>
      <div className='text'>
      <h4>Let's go!!</h4>
      <p>Create an account for tools to help you</p>
      <br/>
      <div className='buttonz'>
      <Button onClick={()=>navigate('/candidate/profile')}  className='btnz'>Job Seeker</Button><br/>
      <Button onClick={()=>navigate('/employer/dashboard')}  className='btnz'>Employer</Button><br/>
      </div>
      
      </div>
      
      </Card>
      
      </Col>

      </Row>

    </div>
  )
}

export default Split