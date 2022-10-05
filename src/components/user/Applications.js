import React, { useState,useContext,useEffect }  from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios' 
import { useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Applications() {

    const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()

    const [app, setApp] = useState([])

    useEffect(() => {
      getHandler()
    }, [])
    

     //api call for job applications of user
  const getHandler=async(e)=>{
    await axios.get(`application/jobs/${authTokens.user_id}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setApp(response.data)
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

  return (
    <div>
        <Row className='mx-5 px-5'>
            <Col style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             className='m-5 p-5' lg={12}>
                <h3>MY APPLICATIONS</h3><br/>
                {
                    app.map((obj)=>
                    <><Card onClick={()=>navigate(`/jobs/${obj.job.id}`)} sx={{ width: '60%' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {obj.job.designation}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {obj.job.company.company_name}
                        <p>Appleid On: {obj.created.slice(0,10)}</p>
                      </Typography>
                  
                      <Typography variant="body2" >
                    { obj.status==='pending' ? <p>Job Status: <span style={{color:'#D8D809'}} >Application submitted</span></p>
                     : ( obj.status==='Shortlisted' ? <p>Job Status:<span style={{color:'green'}} > Your application has shortlisted</span></p> : 
                     (obj.status === 'on-Hold' ? <p>Job Status:<span style={{color:'orange'}} > Waiting for recruiters action</span></p>: 
                     <p>Job Status:<span style={{color:'red'}} > Your application has rejected </span></p>)  )
                    
                    } </Typography>
                      </CardContent>
                  </Card><br/>
                    </>
                    )
                }
            

            </Col>
        </Row>
        

    </div>
  )
}

export default Applications