import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import Dash from '../../components/admin/Dash'
import SideNav from '../../components/admin/SideBar'
import { Row, Col} from 'react-bootstrap'
import Registrations from '../../components/admin/Registrations'
import User from '../../components/admin/User'

function userPage() {
  return (
    <div>
         <Row>
    <AdminNav/>
    </Row>

    <Row>
        <Col  lg={2} >
        <SideNav/>            
        </Col>
        <Col className='m-5' lg={9}>
            <User/>
            </Col>
    </Row>

    </div>
  )
}

export default userPage