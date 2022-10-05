import React,{useState,useEffect,useContext} from 'react'
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useParams} from 'react-router-dom';
import { useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './dashboard.css'
import Form from 'react-bootstrap/Form';


function Applicants() {
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()

    const [applicants, setApplicants] = useState([])
    const [resume, setResume] = useState('')

    const Baseurl='http://127.0.0.1:8000'
    useEffect(() => {
        getCandidates()
    }, [])


     //for getting id from url
  const params = useParams();
  let id=params.id


  //api call for filtering with candidate status
  const filterHandler=async(status)=>{
    await axios.get(`application/jobs/${id}/filter/${status}`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
          setApplicants(response.data)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.message,"erorr")
      })

  }

    
  //api call for getting candidates applied for the job 
    const getCandidates=async(e)=>{
     
        await axios.get(`employer/jobs/${id}/applicants/`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             console.log("success")
            setApplicants(response.data)
             
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"erorr")
          
         }) 
       
       }
       const rows = [
        1,2,3
      ];


      const filter=(e)=>{
        console.log(e.target.value,"llll")
        filterHandler(e.target.value)
      }

  return (
    <div>
      <Row className='px-5'>
        <Col lg={12} className='p-5'>
        
        <Form.Group   style={{float:'right'}}>
        <Form.Select onChange={filter} style={{backgroundColor:'grey',borderRadius:'20px'}} >
        <option style={{backgroundColor:'#ffff'}} selected disabled>Filter by status</option>
        <option style={{backgroundColor:'#ffff'}} value='pending'>pending</option>
          <option style={{backgroundColor:'#ffff'}} value='on-Hold'>on_Hold</option>
          <option style={{backgroundColor:'#ffff'}} value='Shortlisted'>Shortlisted</option>
          <option style={{backgroundColor:'#ffff'}} value='Rejected'>Rejected</option>
        </Form.Select>
      </Form.Group>

        </Col>


      </Row>
     
        <Row className='m-5 p-5' align='center'>
            <Col lg={12}    >
            <h2 className='myhead'>APPLICANTS</h2><br/><br/>
          <Table  hover>
                <thead>

                  <tr>
                    <th>Sl. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Application Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {applicants.length>0 ?
                    applicants.map((obj,index)=>
                    <>
                  <tr>
                    <td>{index+1}</td>
                    <td>{ obj.user.first_name}{' '}{obj.user.last_name}</td>
                    <td>{obj.user.email}</td>
                    <td>{obj.user.mobile}</td>
                    <td>{obj.status}</td>
                    <td><Button className='applicants' onClick={()=>navigate(`/employer/job/${id}/applicants/${obj.user.id}`)}>View Details</Button></td>
                  </tr>
                  </>
                    )
                : <p>---------------------no</p>}
                </tbody>
              </Table>
            
           
            </Col>
        </Row>
       
    </div>
  )
}

export default Applicants