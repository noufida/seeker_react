import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import Dashboard from '../../components/employer/Dashboard';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom'
import EmpSideNav from '../../components/employer/EmpSideNav';
import Candidates from '../../components/employer/Candidates';

function candidatePage() {
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
          <Candidates/>
              </Col>
      </Row>
    </div>
  )
}

export default candidatePage