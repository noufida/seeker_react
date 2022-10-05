import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Warn from '../../src/img/warn.png'


function Unauthorized() {
  return (
    <div>
        <Row>
            <Col className='m-5 p-5' align='center' lg={12}>

            <img src={Warn} />
            <h5>You Don't have permission to this page.</h5>
            </Col>
        </Row>
        
    </div>
  )
}

export default Unauthorized