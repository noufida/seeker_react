import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useContext, useEffect,useState} from 'react'
import AuthProvider from '../../context/authContext'
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './navbar.css'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function NavScrollExample() {
  const {authTokens} = useContext(AuthContext)

 const {logoutUser} = useContext(AuthProvider)
 const navigate = useNavigate()
 const [emp, setEmp] = useState(false)
 useEffect(() => {
  accHandler()
 }, [])
 
   //api call for checking wheter user has registered for employer account
   const accHandler = async(e)=>{   
     
    await axios.get('employer/emp_account/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
       console.log(response.data,'checkkkkkkkkkk')
       if (response.status===200){
         if (response.data===true){
          setEmp(true)
         }
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"error category")
    
     }) 
   
     
   }


 
 
  return (
    <Navbar className='navbar p-3'  expand="lg">
      <Container fluid>
        <Navbar.Brand className='logoz' style={{cursor:'pointer'}} onClick={()=>navigate('/')}>seeKer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
         {/* <Link  className='navlinks' to='/employer/register'>Employer Account</Link> */}
         
         
          
            {/*------------- user details and logout button---------- */}
            { authTokens ? (
              <>
              {authTokens.is_staff ?  <Link className='navlinks' to='/employer/dashboard' >Post Jobs</Link>
              :(  emp ? <Link className='navlinks' to='/employer/home' >Post Jobs</Link> :
              <Link className='navlinks' to='/employer/register' >Post Jobs</Link> )}
             
            <NavDropdown  className='navlinks px-5'  title="user" id="navbarScrollingDropdown">
              
              <NavDropdown.Item  onClick={()=>navigate('/candidate/account')}>Profile</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>navigate('/candidate/profile')}>
                Complete Profile
              </NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>navigate('/candidate/applications')}>
                My Job Applications
              </NavDropdown.Item>
              <NavDropdown.Item   onClick={()=>navigate('/saved')}>
                Saved Jobs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={logoutUser}>
              <AccountCircleIcon/> Signout
              </NavDropdown.Item>
            </NavDropdown></>):
            <>
          
            <Link className='navlinks' to='/login'>Login</Link>
          <p className='navlinks'>|</p>
          <Link className='navlinks' to="/register">Signup</Link>
            </>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;