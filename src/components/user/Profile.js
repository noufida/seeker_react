import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import { useNavigate} from 'react-router-dom'
//stepper imports
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';

function Profile() {

    const navigate = useNavigate()

    const [experienced, setExperienced] = useState('')
    const [desired_job, setdesired_job] = useState('')
    const [desired_location, setDesired_location] = useState('')

    const {authTokens} = useContext(AuthContext) 
    const [category, setCategory] = useState([]) //state for job categories
    const [locations, setLocations] = useState([])

    const [expErr, setExpErr] = useState('')
    const [jobErr, setJobErr] = useState('')
    const [locErr, setLocErr] = useState('')

    useEffect(() => {
        catHandler()
        getHandler()
    },[])

    const steps = [
      'Basic Details',
      'Add Qualifications',
      'Add Experiences',
      'Add Skills',
    ];

    //validation of form from frontend
  const formValidation=()=>{    
    
    const expErr={}
    const jobErr ={}
    const locErr={}
    let isValid = true

    //experience validation
    if (!experienced){
      expErr.short_fname = '*required field'
      isValid = false}

    //job validation
    if (!desired_job){
      jobErr.short_lname = '*required field'
      isValid = false}

    //location validation
    if (!desired_location){
      locErr.short_email= '*required field'
      isValid = false
    }

    

    setExpErr(expErr)
    setJobErr(jobErr)
    setLocErr(locErr)

    return isValid
  }

     //api call for getting category
     const catHandler = async(e)=>{   
     
        await axios.get('employer/job_categories/',
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             setCategory(response.data)
             console.log("success")
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"error category")
        
         }) 
       
         
       }

     //api call for creating profile
     const profileHandler=async(e)=>{
        e.preventDefault()
        const isValid = formValidation()  
        if (isValid){
        await axios.post('user/profile/',{
            experienced:experienced,
            desired_job:desired_job,
            desired_location:desired_location
          },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"ok")
            navigate('/candidate/qualification')
           
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            console.log(experienced,desired_job,desired_location)
            
          })}

      }


      //api call for getting rthe job locations
      const getHandler=async()=>{
        console.log('kkk')
        await axios.get('employer/location/',
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"application")
            if (response.status === 200) {
                console.log(response.data,"application")
                setLocations(response.data)
                
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
          })
    
      }


  return (
    <div >        
       <Box  sx={{ width: '100%',marginBottom:'40px'}}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step  key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box> <br/><br/>
      <h2 style={{'textAlign':'center'}}>COMPLETE YOUR PROFILE</h2><br/><br/>
    <Form onSubmit={profileHandler}>
     <Form.Group className="mb-3" controlId="formLname">
         <Form.Label >Select </Form.Label>

            <div onChange={(e)=>setExperienced(e.target.value)}>

            <input type="radio" value='False' name="exp" /> Fresher <br/>
            <input type="radio" value='True' name="exp" /> Experienced

            </div>

                 {Object.keys(expErr).map((key)=>{
                  return <div style={{color:'red'}} >{expErr[key]}</div>
                })}
      </Form.Group>

     
      <Form.Group  className="mb-3">
        <Form.Label>Your desired job</Form.Label>
        <Form.Select onChange={(e)=>setdesired_job(e.target.value)}>   
                <option>CHOOSE</option>
                {category.map((obj,key)=>
             
                <option value={obj.id} >{obj.job_category}</option>
                
                )}
        </Form.Select>
                 {Object.keys(jobErr).map((key)=>{
                  return <div style={{color:'red'}} >{jobErr[key]}</div>
                })}
      </Form.Group>
       
           
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Desired location</Form.Label>
        <Form.Select onChange={(e)=>setDesired_location(e.target.value)}>   
                <option>CHOOSE</option>
                {locations.map((obj,key)=>
             
                <option value={obj.id} >{obj.location}</option>
                
                )}
        </Form.Select>
                  {Object.keys(locErr).map((key)=>{
                  return <div style={{color:'red'}} >{locErr[key]}</div>
                })}
      </Form.Group>
     
  
      <div  style={{'textAlign':'center','paddingBottom':'100px','paddingTop':'70px'}}>
      <Button style={{float:'right'}} variant="success" className='sub-button' type="submit" >
        Next
      </Button>
      </div>
      
      </Form>

    </div>
  )
}

export default Profile