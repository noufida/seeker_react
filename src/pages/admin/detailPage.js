import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import SideNav from '../../components/admin/SideBar'
import Detail from '../../components/admin/Detail'
import { Row, Col} from 'react-bootstrap'

function detailPage() {
  return (
    <div>
         <Row>
    <AdminNav/>
    </Row>

    <Row>
        <Detail/>
    </Row>

    </div>
  )
}

export default detailPage