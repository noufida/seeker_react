import React, { useState,useContext,useEffect }  from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios' 
import { useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//card
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

function Save() {

  const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  const [job, setJob] = useState([])

  useEffect(() => {
    getHandler()
  }, [])
  
  //api call for getting acc details of user
  const getHandler=async(e)=>{
    await axios.get('employer/save/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setJob(response.data)
        
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }


  return (
    <div>
      <Row className='mx-5 px-5'>
            <Col style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             className='m-5 p-5' lg={12}>
                <h3>SAVED JOBS</h3><br/>
                {job.length>0 ?
                    job.map((obj)=>
                    <><Card onClick={()=>navigate(`/jobs/${obj.job.id}`)} sx={{ width: '60%' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {obj.job.designation}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                        {obj.job.category.job_category}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                        {obj.job.location.location}
                      </Typography>
                  <Typography>
                  <Chip label={obj.job.payscale_from + '-' + obj.job.payscale_to + 'LPA'}  variant="outlined" />
                  </Typography>
                  
                 
                      </CardContent>
                  </Card><br/>
                    </>
                    )
                : <p>Nothing to show</p> }
            

            </Col>
        </Row>
        



    </div>
  )
}

export default Save