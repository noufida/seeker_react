import Table from 'react-bootstrap/Table';
import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import JobContext from '../../context/empContext'
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './dashboard.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hire from '../../img/hire.jpg'
import { Container } from '@mui/material';
import Form from 'react-bootstrap/Form';

function Dashboard() {
  let table1=0
    const {authTokens} = useContext(AuthContext)
    const [employer, setEmployer] = useState('')
    const [job, setJob] = useState([])
    const navigate = useNavigate()
    const [valid, setValid] = useState(false)

    const [search, setSearch] = useState('')

    useEffect(() => {
      empHandler()
        getJobs()
        validityHandler()

    }, [])

     

      //api call for checking validity of subscription
      const validityHandler = async(e)=>{
        await axios.get('razorpay/validity/' ,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}}).then((response)=>{
            console.log(response.data,"validity")
            setValid(response.data)
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }


        //api call for getting emp details
        const empHandler=async(e)=>{
          await axios.get('employer/emp/' ,
          {headers:{Authorization:`Bearer ${authTokens?.token}`}}).then((response)=>{
              console.log(response.data,"skills")
              setEmployer(response.data)
              
             
            }).catch((err)=>{
              console.log(err.response.data.detail,"erorr")
              
            })
    
        }
    
    const getJobs=async(e)=>{
     
        await axios.get(`employer/${authTokens.user_id}/jobs/`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             console.log("success")
             setJob(response.data)
             
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"erorr")
          
         }) 
       
       }
    
  return (
    <div>

      {/* <Container> */}


      <Row><Col>
      <Button onClick={()=>{ valid ? navigate('/employer/postjob') : navigate('/employer/plans')} } className='mx-5 mt-5' style={{float:'right'}}>Post New Job</Button>
      </Col></Row>
      {
        valid && 
        <>
        <Row className='px-5 mx-5 py-5'>

        <Col    lg={10} >
        <input onKeyDown={e => e.key === 'Enter' && navigate(`/employer/candidates/${search}`)} 
        onChange={(e)=>setSearch(e.target.value)} type="text" 
        style={{width:'100%',borderRadius:'30px',height:'100%'}}
        placeholder=' Enter a skill...' />

        </Col>
        <Col   lg={2}>
        <Button style={{width:'100%',borderRadius:'30px',height:'100%',backgroundColor:'grey',border:'none'}} 
        onClick={()=>navigate(`/employer/candidates/${search}`)} >Get Candidates</Button>
        </Col>
        </Row>
        </>

      }
      


      { 
        job.length>0 ?
      
        <>
        <Row className='mx-5 px-5'>
        <Col  align='center' lg={12}>
        <h2 className='myhead mx-5 px-5'>JOB APPLICATIONS</h2><br/><br/>
        <Table  style={{width:'100%',fontWeight:'bold'}} striped bordered hover >
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th >Job Title</th>
          <th>Vacancies</th>
          <th>Applicants</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       
            {
                job.map((obj,key)=>
                
                  obj.status === 'Active' &&

                
                 <tr >
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{table1=table1+1}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.designation}</td>
             
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.vacancies}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.applicants}</td>
                {
                  obj.applicants ? <td><Button onClick={()=>navigate(`/employer/job/${obj.id}/applicants`)} className='applicants'>View applicants</Button></td>
                  : <td style={{fontStyle:'italic'}} >No applicants</td>
                }
                
                </tr>
              )
            }
            
         
     
      </tbody>
       </Table>
        </Col>
      </Row>
        
        </>  :

          

        <>
        <Row className='m-5 p-5'>
          {/* <Col lg={6}>
          
            <img style={{width:'100%'}} src={Hire} />
          </Col> */}
          <Col align='center' className='px-5 p-5' lg={12}>
          <h1 style={{color:'rgb(10, 10, 102)'}} >Hire the best candidate...</h1><br/><br/>
          <Button onClick={()=>{ valid ? navigate('/employer/postjob') : navigate('/employer/plans')}} className='applicants2 mx-5' >Post My First Job</Button>
          </Col>
        </Row>
        </>

      }

      {/* </Container>
       */}

      
        
    
    </div>
  )
}

export default Dashboard