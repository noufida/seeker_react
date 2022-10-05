import React, {useState, useContext, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useParams} from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
//dialog imports
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//dropdown
import MenuItem from '@mui/material/MenuItem';

function JobDetail() {
  const {authTokens} = useContext(AuthContext)
  const [job, setJob] = useState('')
  
  //for editing
  const [designation, setDesignation] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [workmode, setWorkmode] = useState('')
  const [experience_from, setExperience_from] = useState()
  const [experience_to, setExperience_to] = useState()
  const [payscale_from, setPayscale_from] = useState()
  const [payscale_to, setPayscale_to] = useState()
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  //for category
  const [cat, setCat] = useState([]);
  const [locations, setLocations] = useState([])

  //dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //dialog2
  const [opens, setOpens] = React.useState(false);

  const handleClickOpens = () => {
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };


const optionChange = (event,value) => {
  console.log(cat)
  console.log(event.target.value,'kk')
  setCategory(event.target.value);
}

const optionChangeL = (event,value) => {
  console.log(cat)
  console.log(event.target.value,'kk')
  setLocation(event.target.value);
}
  
  //for getting id from url
  const params = useParams();
  let id=params.id

  useEffect(() => {
    console.log('useffectqq')
    catHandler()
    getJobs()
    getHandler()
    
  }, [])


   //api call for getting category
   const catHandler = async(e)=>{     
         
    await axios.get('employer/job_categories/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
        setCat(response.data)
         console.log("cats")
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"error category")
    
     }) 
   
     
   }



  //api call for editing jobs of company
  const editJobs=async(e)=>{
     console.log('entered')
    await axios.patch(`employer/jobs/${id}/edit/`,{
      designation:designation,
      category:category,
      location:location,
      workmode:workmode,
      experience_from:experience_from,
      experience_to:experience_to,
      payscale_from:payscale_from,
      payscale_to:payscale_to,
      type:type
        
    },
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
         console.log("successsssssssss")
         getJobs()
         handleClose()
         
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"erorr")
      
     }) 
   
   }


   //api call for editing status of job
  const editSJobs=async(e)=>{
    console.log('entered')
   await axios.patch(`employer/jobs/${id}/status/`,{
     status:status
       
   },
   {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
      console.log(response.data)
      if (response.status===200){
        console.log("successsssssssss")
        getJobs()
        handleCloses()
        
      }
    })  
    .catch((err)=>{
      console.log(err.response.data.detail,"erorr")
     
    }) 
  
  }


        //api call for getting rthe job locations
        const getHandler=async()=>{
          console.log('kkk')
          await axios.get('employer/location/',
          {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
              console.log(response.data,"application")
              if (response.status === 200) {
                  console.log(response.data,"application")
                  setLocations(response.data)
                  
              }
              
             
            }).catch((err)=>{
              console.log(err.response.data.detail,"erorr")
            })
      
        }



  //api call for getting all jobs of company
  const getJobs=async(e)=>{
     
    await axios.get(`employer/jobs/${id}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
         console.log("success")
         setJob(response.data)
         setDesignation(response.data.designation)
         setCategory(response.data.category.id)
         setLocation(response.data.location.id)
         setWorkmode(response.data.workmode)
         setType(response.data.type)
         setStatus(response.data.status)
         setExperience_from(response.data.experience_from)
         setExperience_to(response.data.experience_to)
         setPayscale_from(response.data.payscale_from)
         setPayscale_to(response.data.payscale_to)
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"erorr")
      
     }) 
   
   }

  


  return (
    <div>

<Dialog  open={opens} onClose={handleCloses}>
        <DialogTitle>Change Job Status</DialogTitle>
        <DialogContent>

      <br/><p>Status</p>
                  <select variant="standard"
                  label='Workmode'
                  style={{width:'100%',height:'40px',float:'left'}}  value={status}
                onChange={(e)=>setStatus(e.target.value)}>
             
                    <option value='Active'>Active</option>
                    <option value='Paused' >Pause</option>
                    <option value='Closed' >Close</option>
                 </select>
              <br/><br/><br/>
               


        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloses}>Cancel</Button>
          <Button  onClick={editSJobs}>Update</Button>
        </DialogActions>
      </Dialog>


       <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Edit Job Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Job Designation"
            type="text"
            fullWidth
            variant="standard"
            value={designation}
            onChange={(e)=>setDesignation(e.target.value)}
          /><br/><br/><p>Category</p>
         

          <select variant="standard"
          label='Category'
          style={{width:'100%',height:'40px'}} 
        onChange={optionChange} value={category}
        select>
          {cat.map((obj,index) => (
            <option key={obj.id} value={obj.id}>
            {obj.job_category}
            </option>

          ))}</select>
     
         <br/><br/>
         <p>Location</p>
         

         <select variant="standard"
         label='Location'
         style={{width:'100%',height:'40px'}} 
       onChange={optionChangeL} value={location}
       select>
         {locations.map((obj,index) => (
           <option key={obj.id} value={obj.id}>
           {obj.location}
           </option>

         ))}</select>
          

      <br/><br/><p>Workmode</p>
                  <select variant="standard"
                  label='Workmode'
                  style={{width:'100%',height:'40px',float:'left'}}  value={workmode}
                onChange={(e)=>setWorkmode(e.target.value)}>
             
                    <option value='On-Site'>On-Site</option>
                    <option value='Remote' >Remote</option>
                    <option value='Hybrid' >Hybrid</option>
                 </select>
              <br/><br/><br/>
                <p>Type</p>
                <select variant="standard"
                label='Type'
                style={{width:'100%',height:'40px',float:'left'}}  value={type}
              onChange={(e)=>setType(e.target.value)}>
            
                  <option value='Full Time'>Full Time</option>
                  <option value='Part Time' >Part Time</option>
                  <option value='Intern' >Intern</option>
                </select>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  onClick={editJobs}>Update</Button>
        </DialogActions>
      </Dialog>

      <Row  className='px-5'>
     
     <Col style={{display:'flex',justifyContent:'center'}} className='px-5'>
 

       <Card sx={{ width: '50%',backgroundColor:'#738B9D',color:'#ffff' }}>
  
   <CardContent>
     <Typography variant="body2" >
       <h5 style={{fontWeight:'bolder'}} >Job Status
       <ModeEditOutlineOutlinedIcon  onClick={handleClickOpens}
        style={{float:'right',margin:'10px',cursor:'pointer'}}/></h5>
       <br/>
     {job &&( <>
      <h6><span style={{fontWeight:'bolder'}}>Status :</span> {job.status}  </h6>
    
    
    
     </> )} 
     </Typography>
   </CardContent>
 </Card>
 
     
     </Col>
      
   </Row>

      <br/>

      <Row  className='px-5'>
     
        <Col style={{display:'flex',justifyContent:'center'}} className='px-5'>
    

          <Card sx={{ width: '50%',backgroundColor:'#D1DAE5 ' }}>
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <h5 style={{fontWeight:'bolder'}} >Job Details
          <ModeEditOutlineOutlinedIcon  onClick={handleClickOpen}
           style={{float:'right',margin:'10px',cursor:'pointer'}}/></h5>
          <br/>
        {job &&( <>
         <h6><span style={{fontWeight:'bolder'}}>Designation :</span> {job.designation}  </h6>
        <h6><span style={{fontWeight:'bolder'}}>Category :</span> {job.category.job_category}  </h6>
        <h6><span style={{fontWeight:'bolder'}}>Location :</span> {job.location.location}  </h6>
        <h6><span style={{fontWeight:'bolder'}}>workmode :</span> {job.workmode}  </h6>
        <h6><span style={{fontWeight:'bolder'}}>Type :</span> {job.type}  </h6>
       
       
        </> )} 
        </Typography>
      </CardContent>
    </Card>
    
        
        </Col>
         
      </Row>


      
    </div>
  )
}

export default JobDetail