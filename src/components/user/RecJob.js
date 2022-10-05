import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../../axios'
import AuthContext from '../../context/authContext';
import Button from 'react-bootstrap/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate} from 'react-router-dom'


function RecJob() {
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    const [recJob, setRecJob] = useState([])

    useEffect(() => {
      recommJobHandler()
    }, [])
    

    //api call for getting jobs recommended for a user
   const recommJobHandler=async()=>{
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
        <Row>
            <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            height:'90px',
            width:'100%',
            display:'flex',
            justifyContent:'center',
            color:'grey',
            textAlign:'center',}}>
                <h3>Recommended jobs for you</h3>
            </div>
        </Row>
        <Row className='p-5'>
            <Col  className='p-5' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} lg={12}>
                {
                    recJob.map((obj)=>
                    <Card onClick={()=>navigate(`/jobs/${obj.id}`)} style={{width:'60%'}} className='mx-5 my-2'>
                    <Card.Body>
                    <Card.Title>{obj.designation}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{obj.company.company_name}</Card.Subtitle><br/>
                    <Card.Text>
                    <LocationOnIcon/>
                    {obj.location.location}</Card.Text> 
                    <Card.Text>
                    <BusinessCenterIcon/>  {obj.experience_from}-{obj.experience_to} years
                    </Card.Text>
                    </Card.Body>
                    </Card>
                    )
                }
                
            </Col>
        </Row>
        
    </div>
  )
}

export default RecJob