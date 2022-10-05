import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import SideNav from '../../components/admin/SideBar'
import { Row, Col} from 'react-bootstrap'
import Location from '../../components/admin/Location'

function locationPage() {
  return (
    <div>
         <Row>
    <AdminNav/>
    </Row>
    <Row>
        <Col lg={2} >
    <SideNav/>            
        </Col>
        <Col lg={9}>
            <Location/>
            </Col>
    </Row>
    </div>
  )
}

export default locationPage