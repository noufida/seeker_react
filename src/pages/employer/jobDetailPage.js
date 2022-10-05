import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import JobDetail from '../../components/employer/JobDetail';
import JobDetail2 from '../../components/employer/JobDetail2';
import JobDetailJd from '../../components/employer/JobDetailJd';

function jobDetailPage() {
  return (
    <div>
        <EmployerNav/>
      <Row className='mt-5 pt-5 mx-2' >
       <Col className='m-2' lg={12}> 
       <JobDetail />
      
       </Col>

       <Col className='m-2' lg={12}> 
       <JobDetail2 />
        
       </Col>
       <Col className='m-2' lg={12}> 
       <JobDetailJd />
        
       </Col>
      
      </Row>
    </div>
  )
}

export default jobDetailPage