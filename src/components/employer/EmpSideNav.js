import React,{useContext} from 'react'
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function EmpSideNav() {
  return (
    <div>
          <Nav style={{'height':'200vh','width':'25vh'}} className="col-md-1 d-none d-md-block bg-dark sidebar "
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                {/* <div className="sidebar-sticky"></div> */}
                <br></br>
            
            <Nav.Item className='m-4'>
            <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/employer/dashboard">Home</Link>
            </Nav.Item>  
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/employer/myjobs">My Jobs</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            <Nav.Item className='m-4'>
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} to="/employer/postjob">Post New Job</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            </Nav>
    </div>
  )
}

export default EmpSideNav