import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import SideNav from '../../components/admin/SideBar'
import { Row, Col} from 'react-bootstrap'
import Company from '../../components/admin/Company'


function companyPage() {
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
            <Company/>
            </Col>
    </Row>
    </div>
  )
}

export default companyPage