import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom'
import EmpSideNav from '../../components/employer/EmpSideNav';
import Myjobs from '../../components/employer/Myjobs';

function MyJob() {
  const navigate = useNavigate()
  return (
    <div>
      
      <Row>
      <EmployerNav/>
      </Row>
      <Row>
          <Col lg={2} >
      <EmpSideNav/>          
          </Col>
          <Col lg={9}>
          <Myjobs/>
              </Col>
      </Row>

 </div>
  )
}

export default MyJob