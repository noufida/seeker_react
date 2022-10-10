import React,{useContext,useState,useEffect} from 'react'
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from '../../context/authContext';
import JobContext from '../../context/empContext'
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'

function EmpSideNav() {
  const {authTokens} = useContext(AuthContext)
  const [valid, setValid] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    validityHandler()
  }, [])
  

  //api call for checking validity of subscription
  const validityHandler = async(e)=>{
    await axios.get('razorpay/validity/' ,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}}).then((response)=>{
        console.log(response.data,"validity")
        setValid(response.data)
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

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
                <Link style={{'textDecoration':'none','color':'#ffff','line_height':'10px'}} 
           to=   { valid ? '/employer/postjob' : '/employer/plans'} >Post New Job</Link>
            </Nav.Item>
            <hr style={{'color':'#ffff'}} />
            </Nav>
    </div>
  )
}

export default EmpSideNav