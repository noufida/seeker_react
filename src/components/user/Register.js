import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function BasicExample() {
  const {setMobile,mobile} =useContext(AuthContext)
  const navigate = useNavigate()
  
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')

  //states for form validation
  const [first_nameErr, setFirst_nameErr] = useState({})
  const [last_nameErr, setLast_nameErr] = useState({})
  const [emailErr, setEmailErr] = useState({})
  const [mobileErr, setMobileErr] = useState({})
  const [passwordErr, setPasswordErr] = useState({})
  const [confirm_passwordErr, setConfirm_passwordErr] = useState({})

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [backend, setBackend] = useState([])


  //api call for user registration
  const registerHandler = async(e)=>{
    e.preventDefault()
    const isValid = formValidation()
    console.log(first_name,last_name,email,mobile,password,confirm_password)
    if (isValid){
  
    await axios.post('user/register/',{
      first_name:first_name,
      last_name:last_name,
      email:email,
      mobile:mobile,
      password:password,
      confirm_password:confirm_password

    }).then((response)=>{
      console.log(response.data,'kkkkk')
      if (response.data.mobile){

        navigate('/verify')
      }else if(console.data.detail){
       console.log("detail")
      }

    })  .catch(function (error) {
      if (error.response) {
        setBackend(error.response.data.error)
        handleShow()
        console.log(error.message,'ppp');
        console.log(error,'llll');
        // console.log(error.response.headers);
      }
    }) } 
  }

  //validation of form from frontend
  const formValidation=()=>{    
    
    const first_nameErr={}
    const last_nameErr ={}
    const emailErr={}
    const mobileErr={}
    const passwordErr={}
    const confirm_passwordErr={}
    let isValid = true

    //firstname validation
    if (!first_name){
      first_nameErr.short_fname = '*first name is a required field'
      isValid = false
    }else if(first_name.trim().length <3){
      first_nameErr.short_fname = '*first name is too short'
      isValid = false
    }

    //last name validation
    if (!last_name){
      last_nameErr.short_lname = '*last name is a required field'
      isValid = false
    }else if(last_name.trim().length <1){
      last_nameErr.short_lname = '*last name is too short'
      isValid = false
    }

    //email validation
    if (!email){
      emailErr.short_email= '*email is a required field'
      isValid = false
    }

    //mobile validation
    if (!mobile){
      mobileErr.short_mobile= '*mobile no. is a required field'
      isValid = false
    }else if(mobile.trim().length != 10){
      mobileErr.short_mobile= '*enter a valid mobile no.'
      isValid = false
    }else if( /^[a-zA-Z()]+$/.test(mobile)){
      mobileErr.short_mobile= '*enter a valid mobile no.'
      isValid = false
    }

    //password validation
    if(!password ){
      passwordErr.short_password= '*password is a required field'
      isValid = false
    }else if(password.length <8  ) {
      passwordErr.short_password= '*minimum 8 characters are required for password'
      isValid = false
    }
     if(!confirm_password){
      confirm_passwordErr.short_cpassword= '* required field'
      isValid = false
    }
     else if(password!=confirm_password){
      confirm_passwordErr.password_mismatch= '*passwords does not match'
      isValid = false
    }

    setFirst_nameErr(first_nameErr)
    setLast_nameErr(last_nameErr)
    setEmailErr(emailErr)
    setMobileErr(mobileErr)
    setPasswordErr(passwordErr)
    setConfirm_passwordErr(confirm_passwordErr)

    return isValid
  }

 


  return (
    <div className='box-signup'>



<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Some Error Occured</Modal.Title>
        </Modal.Header>
        <Modal.Body>{backend}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>



      <Row>
        <Col>
        <h2 style={{'textAlign':'center'}}>SIGNUP</h2>
    <Form onSubmit={registerHandler} >
    <Form.Group className="mb-3" controlId="formFname">
      <Form.Label>First name</Form.Label>
      <Form.Control type="text" placeholder="Enter first name" value={first_name} onChange={(e)=>                
              setFirst_name(e.target.value)
              }/>
               {Object.keys(first_nameErr).map((key)=>{
                return <div style={{color:'red'}} >{first_nameErr[key]}</div>
              })}
    </Form.Group>
    

    <Form.Group className="mb-3" controlId="formLname">
      <Form.Label>Last name</Form.Label>
      <Form.Control type="text" placeholder="Enter last name" value={last_name} onChange={(e)=>
              setLast_name(e.target.value)
              }/>
               {Object.keys(last_nameErr).map((key)=>{
                return <div style={{color:'red'}} >{last_nameErr[key]}</div>
              })}
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>
              setEmail(e.target.value)
              }/>
                {Object.keys(emailErr).map((key)=>{
                return <div style={{color:'red'}} >{emailErr[key]}</div>
              })}
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formMobile">
      <Form.Label>Mobile</Form.Label>
      <Form.Control type="text" placeholder="Enter Mobile number" value={mobile} onChange={(e)=>
              setMobile(e.target.value)
              }/>
              {Object.keys(mobileErr).map((key)=>{
                return <div style={{color:'red'}} >{mobileErr[key]}</div>
              })}
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>
              setPassword(e.target.value)
              } />
              {Object.keys(passwordErr).map((key)=>{
                return <div style={{color:'red'}} >{passwordErr[key]}</div>
              })}
    </Form.Group>
    <Form.Group className="mb-3" controlId="formConfirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Confirm your password" value={confirm_password} onChange={(e)=>
              setConfirm_password(e.target.value)
              } />
              {Object.keys(confirm_passwordErr).map((key)=>{
                return <div style={{color:'red'}} >{confirm_passwordErr[key]}</div>
              })}
    </Form.Group>

    <div  style={{'textAlign':'center'}}>
    <Button variant="success" className='sub-button' type="submit" >
      Submit
    </Button>
    </div>
    
    </Form>
        </Col><br/><br/>
      </Row>
   </div>
  );
}

export default BasicExample;





