import React,{useState,useEffect,useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useParams} from 'react-router-dom';
import { useNavigate} from 'react-router-dom'
import Chip from '@mui/material/Chip';
//card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Form from 'react-bootstrap/Form';
//icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

function ApplicantProfile() {
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()

    const Baseurl = 'https://seeker.savebox.ae/'


    const [resume, setResume] = useState('')
    const [contact, setContact] = useState('')
    const [qual, setQual] = useState([])
    const [exp, setExp] = useState([])
    const [skill, setSkill] = useState([])

    const [application, setApplication] = useState('')
    //for getting id from url
    const params = useParams();
    let id=params.id
    let a=params.aid    

    useEffect(() => {
        getResumeHandler()
        getContactHandler()
        getQualHandler()
        getExpHandler()
        getSkillHandler()
        getJobAppHandler()
    }, [])

  
    

    //api call for changing status of job application
  const changeJobAppHandler=async(v)=>{
    await axios.put(`application/jobs/${application.id}/update_app_status/`,{status:v},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            getJobAppHandler()
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

     //api call for getting rthe job application
  const getJobAppHandler=async()=>{
    await axios.get(`application/jobs/${id}/jobapplication/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            setApplication(response.data)
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

      //api call for getting resume of a candidate
  const getResumeHandler=async()=>{
    await axios.get(`user/get_resume/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"resuuumee")
        if (response.status === 200) {
            console.log(response.data,"resuuumee")
            if(response.data.resume){
              setResume(response.data)
           
            }
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        setResume('nothing to show')
      })

  }

  //api call for getting contact details of a candidate
  const getContactHandler=async()=>{
    await axios.get(`employer/applicants/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"contact")
        if (response.status === 200) {
            console.log(response.data,"contact")
           
                setContact(response.data)
           
            
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

  //api call for getting qualification details of a candidate
  const getQualHandler=async()=>{
    await axios.get(`employer/app_qual/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualification")
        if (response.status === 200) {
            console.log(response.data,"qualification")
           
            setQual(response.data)
           
            
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

  //api call for getting experiences details of a candidate
  const getExpHandler=async()=>{
    await axios.get(`employer/app_exp/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"experiences")
        if (response.status === 200) {
            console.log(response.data,"experiences")
           
            setExp(response.data)
           
            
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

  //api call for getting skills of a candidate
  const getSkillHandler=async()=>{
    await axios.get(`employer/app_skills/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"skills")
        if (response.status === 200) {
            console.log(response.data,"skills")
           
            setSkill(response.data)
           
            
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

  const handler=(e)=>{
    console.log(e.target.value)
    changeJobAppHandler(e.target.value)
    
  }


  return (
    <div>
      
          <Row className='m-5'>
            <Col className='mx-3' >
            <div >
            <ArrowBackIosNewRoundedIcon style={{border:'1px solid grey' , borderRadius:'30px',width:'3%',height:'3%',cursor:'pointer'}} 
            onClick={()=>navigate(-1)}/>
            </div>
            </Col>
          </Row>
      
        <Row className='m-5' >
            <Col className='m-3' lg={3}>
            <Card sx={{ maxWidth: '100%',backgroundColor:'#D1DAE5 ' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
          <h5 style={{color:'#505152 '}}>{contact.first_name} {contact.last_name}</h5> <br/>
          {application  && <><p>Application Status :<Chip label={application.status} ></Chip></p>
            
          
          <Form.Group >
        
        <Form.Select onChange={handler} >
        <option style={{color:'red'}} selected disabled>CHANGE APPLICATION STATUS</option>
          <option value='on-Hold'>Hold</option>
          <option value='Shortlisted'>Short List</option>
          <option value='Rejected'>Reject</option>
        </Form.Select>
      </Form.Group> </> }
      
           <br/><br/>
            
       

 
         <hr/>
         <br/>
          <h5 style={{color:'green'}}>CONTACT DETAILS</h5>
                  <p>Email:{contact.email}</p>
                  <p>Mobile: {contact.mobile}</p> <br/><hr/> <br/>
                  <h5 style={{color:'green'}}>RESUME</h5>
                  <a href={ resume.resume} rel="noreferrer"  target="_blank">download resume</a> <br/><hr/>
                  <br/> <h5 style={{color:'green'}}>SKILLS</h5><br/>
          {
            skill.map((obj)=><>
            <Chip label={obj.skill}/><br/><br/></>
            )
          }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

          

             

            </Col>
            <Col className='m-3' lg={8}>

            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  style={{color:'green',fontWeight:'bold'}}>EXPERIENCES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
         
        
          {
            exp.map((obj,index)=><>
            <h5 style={{color:'green'}}>{index+1}.{obj.designation}</h5><br/>
            <h6>Company: {obj.company}</h6>
            <p>from:  <Chip label={obj.start}/>to: <Chip label={obj.end}/></p>
            <p>{obj.description}</p>
           <br/><hr/><br/> </>
            )
          }
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card> 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography  style={{color:'green',fontWeight:'bold'}}>QUALIFICATIONS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
         
        
          {
            qual.map((obj,index)=><>
            <h5 style={{color:'green'}}>{index+1}.{obj.degree}</h5><br/>
            <h6>College/University: {obj.college}</h6>
            <p>from:  <Chip label={obj.joining_year}/>to: <Chip label={obj.passout_year}/></p>
            <p>{obj.description}</p>
           <br/><hr/><br/> </>
            )
          }
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card> 
          </Typography>
        </AccordionDetails>
      </Accordion>
     


          
            
            </Col>
        </Row>

        
    </div>
  )
}

export default ApplicantProfile