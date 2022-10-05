import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import JobContext from '../../context/empContext'
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams} from 'react-router-dom';
//card
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

function Candidates() {

    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    const [job, setJob] = useState([])
  
     //for getting id from url
     const params = useParams();
     const [search, setSearch] = useState(params.str)
     const [candidate, setCandidate] = useState([])

     useEffect(() => {
       searchHandler()
     }, [])
     

       //api call for search
       const searchHandler=async()=>{
        await axios.get('user/skill_emp/?search=',{params:{search:search}},
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"qualifications")
            if (response.status === 200) {
                console.log(response.data,"search result")
                setCandidate(response.data)
                
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }
  return (


      
    <div>
        
        <>
        <Row className='mx-5 px-5'>
            <Col style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             className='m-5 p-5' lg={12}>
              <h3>{candidate.length} RESULTS FOUND</h3><br/><br/>
                {search ? 
                    candidate.map((obj)=>
                    <><Card   sx={{ width: '60%',fontSize:'15px' }}>
                    <CardContent>
                      <Typography gutterBottom variant="9" component="div">
                         {obj.user.first_name} {obj.user.last_name}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                      {obj.user.email}
                      </Typography>
                      <Button onClick={()=>navigate(`/employer/job/${obj.user.id}/applicants/${obj.user.id}`)}
                        style={{float:'right'}}>View Candidate</Button>
                  <Typography>
                  </Typography>
                  
                 
                      </CardContent>
                  </Card><br/>
                    </>
                    )
                : <h3>0 RESULTS FOUND</h3>}
            

            </Col>
        </Row>
        </>
    
    </div>
  )
}

export default Candidates