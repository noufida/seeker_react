import React,{useContext} from 'react'
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function SideNav() {

  return (
    <div>
        

        <Nav style={{'height':'200vh','width':'25vh'}} className="col-md-1 d-none d-md-block bg-dark sidebar "
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                {/* <div className="sidebar-sticky"></div> */}
                <br></br>
            
            <Nav.Item className='m-4'>
            <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/admin/registrations">New Employer Requests</Link>
            </Nav.Item>  
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/admin/users">Users</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/admin/companies">Employer Accounts</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/admin/locations">Location Management</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/admin/categories">Category Management</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/admin/plans">Plan Management</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff','cursor':'pointer'}} />
            {/* <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item> */}
            </Nav>
    </div>
  )
}

export default SideNav