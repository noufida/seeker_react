import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <div>
         <Row className='mt-5' style={{backgroundColor:'black',color:'beige'}}>
        
         <Col align='center' style={{float:'left'}} className='my-5' lg={6} >
            <p style={{color:'grey',fontWeight:'bold'}}>CONTACT</p>
            <p style={{color:'white'}}>noufidap@gmail.com</p>
         </Col>

         <Col align='center' style={{float:'left'}} className='my-5' lg={6} >
            <p style={{color:'grey',fontWeight:'bold'}}>SOCIALIZE</p>
            <p style={{color:'white'}}>https://facebook.com/jobseeker</p>
            <p style={{color:'white'}}>https://linkedin.com/jobseeker</p>
         </Col>
      </Row>

      <Row  style={{backgroundColor:'black',color:'beige'}}>
        
         <Col align='center' style={{float:'left'}} className='my-5' lg={12} >
         <p style={{color:'grey',fontWeight:'bold'}}>Copyright © 2022 All rights reserved </p>
         </Col>
      </Row>
    </div>
  )
}

export default Footer