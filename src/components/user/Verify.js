import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import axios from '../../axios'
import AuthContext from '../../context/authContext';
import { useNavigate} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';



function BasicExample() {

  const navigate = useNavigate()

  const [code, setCode] = useState('')
  
  const {mobile} =useContext(AuthContext)

  const [show, setShow] = useState(false);

    //api call for otp verification
    const verifyHandler=async(e)=>{
        e.preventDefault()
        await axios.post('user/verify/',{
            code:code,
            mobile:mobile
          }).then((response)=>{
            console.log(response.data)
            if (response.data.is_active){
              navigate('/path')
            }
      
          }).catch((err)=>{
            setShow(true)
            console.log(err.response.data.detail,"erorr")
            
          })

      }
 
  return (
    
    <div className='box-email'>
      <h2 style={{'textAlign':'center'}}>VERIFY YOUR ACCOUNT</h2><br/>
      { show && <>
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <p>Enter Valid OTP</p>
      </Alert></>}

    <Form onSubmit={verifyHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the code</Form.Label>
        <Form.Control type="text" placeholder="" value={code} onChange={(e)=>
               setCode(e.target.value)
                }/>
      </Form.Group>

    
     
      <div  style={{'textAlign':'center'}}>
      <Button variant="success" className='sub-button' type="submit" >
        Submit
      </Button>
      </div>
    
    </Form></div>
  );
}

export default BasicExample;