import React,{useState,useContext,useEffect} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css'
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/authContext';
import { useNavigate} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import axios from '../../axios'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Im1 from '../../img/im1.jpg'
import Im2 from '../../img/im2.webp'
import Im3 from '../../img/im3.jpg'

function Home() {
  
  const {authTokens} = useContext(AuthContext)
  const [recJob, setRecJob] = useState([])

  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    recommJobHandler()
  },[])
  
   
   //api call for getting jobs recommended for a user
   const recommJobHandler=async(e)=>{
    
    await axios.get('user/match_job/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"recommended jobs")
        if (response.status === 200) {
            console.log(response.data)
            setRecJob(response.data)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })
     
  }

  return (
    <div>

      <Row  > 
        <Col lg={6}>
        <div className='fbox' >
        <Col lg={6}>
        <h1 className='ftext'>What you seek for is what we have... </h1>
        <p style={{color:'rgb(10, 10, 102)'}}>Millions of people are searching for jobs with Seeker and finds thier life !!</p>
       <Button onClick={()=>navigate('/jobs')}>Explore Jobs</Button>
        </Col>
        
        </div> 
        </Col>
       <Col lg={6}>
       <div className='bg ' >
        <input className='search-box' placeholder=' Search a job here...' 
         onKeyDown={e => e.key === 'Enter' && navigate(`/search/${search}`)} 
        onChange={(e)=>setSearch(e.target.value)} type="text" /><br/>
        <Button onClick={()=>navigate(`/search/${search}`)} className='job_button'>Find Jobs</Button>
        </div> 
       </Col>
      </Row>
      <Row className='justify-contents-center'>
      <Col >
      
      </Col>
      </Row>
      {authTokens && 
      <Row className='sec-part'>
        <Col lg={12} >
        
        { 
          recJob.slice(0, 1).map((obj)=><>
                    <h4>Jobs for you</h4>
      
          <Card   className='mt-4 mx-2'>
          <Card.Body>
            <Card.Title style={{color:'rgb(10, 10, 102)',fontSize:'17px'}}>{recJob.length} Recommended Jobs for you</Card.Title><hr/>
            <Card.Subtitle>{obj.designation}</Card.Subtitle><br/>
            <Card.Subtitle className="mb-2 text-muted">{obj.company.company_name}</Card.Subtitle>
            <Card.Text>
              <LocationOnIcon/>
              {obj.location.location}</Card.Text> 
              <Card.Text>
              <BusinessCenterIcon/>  {obj.experience_from}-{obj.experience_to} years
            </Card.Text>
            <a  onClick={()=>navigate('/recommended_jobs')} style={{cursor:'pointer',textDecoration:'none',float:'right'}} className='mx-5 px-5'>VIEW ALL</a>
          </Card.Body>
          
        </Card>
        </>
 )
        }
        </Col>
      </Row>}

      <Row className='sec-part'>
          
          <h4>How we work for you</h4>
          <Col lg={6}><br/><br/><br/>
          <img class='img-bars' src={Im1} />
          </Col>
          <Col lg={6}><br/><br/><br/>
          <Col lg={8}>
          <h3 style={{color:'rgb(10, 10, 102)'}}>Find the Right Job for your career..</h3><br/>
          <p>Start your job search by thinking about the aspects of a role that will appeal to you</p>
          </Col>
          
          </Col>
         
      </Row>

      <Row className='sec-part'>
          
         
          
          <Col lg={6}><br/><br/><br/>
          <Col lg={8}>
          <h3 style={{color:'rgb(10, 10, 102)'}}>Find the Right companies for your career to grow...</h3><br/>
          <p>Start your job search by thinking about the aspects of a role that will appeal to you</p>
          </Col>
          
          </Col>
          <Col lg={6}><br/><br/><br/>
          <img class='img-bars' src={Im2} />
          </Col>
      </Row>

      <Row className='sec-part'>
          
          <Col lg={6}><br/><br/><br/>
          <img class='img-bars' src={Im3} />
          </Col>
          <Col lg={6}><br/><br/><br/>
          <Col lg={8}>
          <h3 style={{color:'rgb(10, 10, 102)'}}>Apply to Jobs which you finds a perfect fit for you</h3><br/>
          <p>Start your job search by thinking about the aspects of a role that will appeal to you</p>
          </Col>
          
          </Col>
        
      </Row>

     
    </div>  
  )
}

export default Home