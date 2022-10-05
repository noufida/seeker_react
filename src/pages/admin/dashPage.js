import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import Dash from '../../components/admin/Dash'
import SideNav from '../../components/admin/SideBar'
import { Row, Col} from 'react-bootstrap'

function dashPage() {
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
            <Dash/>
            </Col>
    </Row>
</div>
  )
}

export default dashPage