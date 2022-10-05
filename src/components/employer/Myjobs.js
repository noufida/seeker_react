import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import JobContext from '../../context/empContext'
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
//tabs
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
function Myjobs() {
    let table1=0
    let table2=0
    let table3=0

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    const {authTokens} = useContext(AuthContext)
    const [job, setJob] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getJobs()
    }, [])
    
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
         <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="ACTIVE JOBS" {...a11yProps(0)} />
          <Tab label="PAUSED JOBS" {...a11yProps(1)} />
          <Tab label="CLOSED JOBS" {...a11yProps(2)} />
        </Tabs>
      </Box>


      <TabPanel value={value} index={0}>
        <Row>
            <Col>
            <Table  style={{width:'100%',fontWeight:'bold'}} striped bordered hover >
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th >Job Title</th>
          <th>Posted on</th>
          <th>Vacancies</th>
         
        </tr>
      </thead>
      <tbody>
       
            {
                job.map((obj,key)=>
                
                  obj.status === 'Active' &&

                
                 <tr >
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{table1=table1+1}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.designation}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.created_on}</td>
                
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.vacancies}</td>
              
                </tr>
              )
            }
            
         
     
      </tbody>
       </Table>
            </Col>
            </Row>
      </TabPanel>


      <TabPanel value={value} index={1}>
      <Row>
            <Col>
            <Table  style={{width:'100%',fontWeight:'bold'}} striped bordered hover >
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th >Job Title</th>
          <th>Posted on</th>
          <th>Vacancies</th>
         
        </tr>
      </thead>
      <tbody>
       
            {
                job.map((obj,key)=>
                
                  obj.status === 'Paused' &&

                
                 <tr >
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{table2=table2+1}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.designation}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.created_on}</td>
                
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.vacancies}</td>
              
                </tr>
              )
            }
            
         
     
      </tbody>
       </Table>
            </Col>
            </Row>
      </TabPanel>

      <TabPanel value={value} index={2}>
          <Row>
            <Col>
            <Table  style={{width:'100%',fontWeight:'bold'}} striped bordered hover >
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th >Job Title</th>
          <th>Posted on</th>
          <th>Vacancies</th>
         
        </tr>
      </thead>
      <tbody>
       
            {
                job.map((obj,key)=>
                
                  obj.status === 'Closed' &&

                
                 <tr >
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{table3=table3+1}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.designation}</td>
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.created_on}</td>
                
                <td style={{cursor:'pointer'}} onClick={()=>navigate(`/employer/job/${obj.id}`)}>{obj.vacancies}</td>
              
                </tr>
              )
            }
            
         
     
      </tbody>
       </Table>
            </Col>
            </Row>
      </TabPanel>
    </Box>
    </div>
  )
}

export default Myjobs