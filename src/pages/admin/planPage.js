import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import SideNav from '../../components/admin/SideBar'
import { Row, Col} from 'react-bootstrap'
import Plan from '../../components/admin/Plan'
function planPage() {
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
            <Plan/>
            </Col>
    </Row>
    </div>
  )
}

export default planPage