import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './../user/login.css'
import { useState,useContext,useEffect } from 'react';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { Navigate, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function PostJob() {
  const navigate = useNavigate()

    useEffect(() => {
        catHandler()
        getHandler()
    },[])

    const [selected_category, setSelected_category] = useState('')
    const [designation, setDesignation] = useState('')
    const [vacancy, setVacancy] = useState('')
    const [locations, setLocations] = useState([])
    const [type, setType] = useState('')
    const [workmode, setWorkmode] = useState('')
    const [ex_from, setEx_from] = useState('')
    const [ex_to, setEx_to] = useState('')
    const [jd, setJd] = useState('')
    const [criteria, setCriteria] = useState('')
    const [p_from, setP_from] = useState('')
    const [p_to, setP_to] = useState('')
    
    const {authTokens} = useContext(AuthContext) 
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])

      //api call for post a job
      const postHandler = async(e)=>{
        e.preventDefault()
        // const isValid = formValidation()
    //    
      
       await axios.post('employer/post_job/',{
        category:selected_category,
        designation:designation,
        vacancies:vacancy,
        location:location,
        type:type,
        workmode:workmode,
        experience_from:ex_from,
        experience_to:ex_to,
        job_description:jd,
        criteria:criteria,
        payscale_from:p_from,
        payscale_to:p_to
    
        },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data)
          if (response.status===200){            
            console.log(response.data,"success")
            navigate(`/employer/postjob/${response.data.id}/jd`);
          }
        })  
        .catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          console.log("dfg")
         
        }) 
      
        // 
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
    <div>
      <Row className='m-5'>
        <Col  lg={12}>
        <Form onSubmit={postHandler}>
       <h2 style={{'textAlign':'center'}}>POST A JOB</h2><br/><br/>
      
       
       <Form.Group  className="mb-3">
        <Form.Label>Select Category</Form.Label>
        <Form.Select onChange={(e)=>setSelected_category(e.target.value)}>   
                <option>CHOOSE</option>
                {category.map((obj,key)=>
             
                <option value={obj.id} >{obj.job_category}</option>
                
                )}
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Designation</Form.Label>
        <Form.Control placeholder="Job designation" value={designation} onChange={(e)=>                
                setDesignation(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>No. of vacancies</Form.Label>
        <Form.Control placeholder="no. of vacancies"  onChange={(e)=>
              setVacancy(e.target.value) }  />
      </Form.Group>
     
      <Form.Group style={{float:'left'}}  className="mb-3 col-lg-6 col-sm-12">
        <Form.Label>Job Type</Form.Label>
        <Form.Select onChange={(e)=>setType(e.target.value)} >
        <option>Choose</option>
          <option value='Full time'>Full time</option>
          <option value='Part time'>Part time</option>
        </Form.Select>
      </Form.Group>

      <Form.Group style={{float:'left'}} className="mb-3 col-lg-6 col-sm-12">
        <Form.Label>Workmode</Form.Label>
        <Form.Select  onChange={(e)=>setWorkmode(e.target.value)} >
        <option>Choose</option>
          <option  value="On-site" >On-site</option>
          <option  value='Hybrid'>Hybrid</option>
          <option value='Remote'>Remote</option>
        </Form.Select>
      </Form.Group>
{/* 
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control placeholder="Job location" onChange={(e)=>setLocation(e.target.value)}  />
      </Form.Group> */}
        
      <Form.Group  className="mb-3">
        <Form.Label>Select Location</Form.Label>
        <Form.Select onChange={(e)=>setLocation(e.target.value)}>   
                <option>CHOOSE</option>
                {locations.map((obj,key)=>
             
                <option value={obj.id} >{obj.location}</option>
                
                )}
        </Form.Select>
      </Form.Group>

      <Form.Group style={{float:'left'}} className="mb-3 col-lg-6 col-sm-12">
        <Form.Label>Experience needed: From </Form.Label>
        <Form.Control placeholder="in years" onChange={(e)=>
        setEx_from(e.target.value)} />      
        </Form.Group>

        <Form.Group style={{float:'left'}} className="mb-3 col-lg-6 col-sm-12">
        <Form.Label>to</Form.Label>
        <Form.Control placeholder="in years" onChange={(e)=>
        setEx_to(e.target.value)} />      
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Job Description</Form.Label>
        <Form.Control as="textarea" rows={4} type="text" placeholder="Give a job description" onChange={(e)=>
        setJd(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Qualification needed</Form.Label>
        <Form.Control placeholder="qualification" onChange={(e)=>
        setCriteria(e.target.value)} />
      </Form.Group>

      <Form.Group style={{float:'left'}} className="mb-3 col-lg-6 col-sm-12">
        <Form.Label>Payscale: From </Form.Label>
        <Form.Control placeholder="in LPA" onChange={(e)=>
        setP_from(e.target.value)} />      
        </Form.Group>
        
        <Form.Group style={{float:'left'}} className="mb-3 col-lg-6 col-sm-12">
        <Form.Label>to</Form.Label>
        <Form.Control placeholder="in LPA" onChange={(e)=>
        setP_to(e.target.value)} />  <br/><br/>   
        </Form.Group>
      
        <div  ><br/>
      <Button variant="success" className='sub-button' type="submit" >
        Next
      </Button>
      </div>
      <br/><br/> 
    </Form>
        </Col>
      </Row>
      
  </div>
  )
}

export default PostJob