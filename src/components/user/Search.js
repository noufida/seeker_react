import React, { useState,useContext,useEffect }  from 'react'
import AuthContext from '../../context/authContext';
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

function Search() {
    const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  const [job, setJob] = useState([])

   //for getting id from url
   const params = useParams();
   const [search, setSearch] = useState(params.str)

    useEffect(() => {
        console.log(search)
        if (search) {
            console.log('i have')
        searchHandler() }

        else{
            console.log('i dont')
            return;
        }
      }, [])
    
    const searchHandler=async()=>{

   
    console.log(params.str)
     axios.get('employer/job_/?search=',{params:{search:search}},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"search result")
            setJob(response.data)
           
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
                <h3>{job.length} RESULTS FOUND</h3><br/>
                {search ?
                    job.map((obj)=>
                    <><Card onClick={()=>navigate(`/jobs/${obj.id}`)} sx={{ width: '60%' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {obj.designation}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                        {obj.category.job_category}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                        {obj.location.location}
                      </Typography>
                  <Typography>
                  <Chip label={obj.payscale_from + '-' + obj.payscale_to + 'LPA'}  variant="outlined" />
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

export default Search