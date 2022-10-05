import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import SideNav from '../../components/admin/SideBar'
import { Row, Col} from 'react-bootstrap'
import Category from '../../components/admin/Category'
function categoryPage() {
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
            <Category/>
            </Col>
    </Row>
    </div>
  )
}

export default categoryPage