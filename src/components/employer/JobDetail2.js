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
import Chip from '@mui/material/Chip';

function JobDetail2() {
  const {authTokens} = useContext(AuthContext)
  const [joba, setJoba] = useState('')
  //for editing
  const [experience_from, setExperience_from] = useState()
  const [experience_to, setExperience_to] = useState()
    const [payscale_from, setPayscale_from] = useState()
    const [payscale_to, setPayscale_to] = useState()
    const [designation, setDesignation] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [workmode, setWorkmode] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')


  //dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  //for getting id from url
  const params = useParams();
  let id=params.id

  useEffect(() => {
    getJobs()
    
  }, [])


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
         getJobs()
         handleClose()
         
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"erorr")
      
     }) 
   
   }



  //api call for getting all jobs of company
  const getJobs=async(e)=>{
     
    await axios.get(`employer/jobs/${id}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
        setJoba(response.data)
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
       <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Update Exprience and Payrange</DialogTitle>
        
        <DialogContent>
        <p>Experience needed (in Years)</p>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="min"
            type="text"
            width='40%'
            float='left'
            variant="standard"
            value={experience_from}
            onChange={(e)=>setExperience_from(e.target.value)}
          />

            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="max"
            type="text"
            width='40%'
            float='right'
            variant="standard"
            value={experience_to}
            onChange={(e)=>setExperience_to(e.target.value)}
          />
          
          <br/><br/>
         

          <p>PayRange (in LPA)</p>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="From"
            type="text"
            width='40%'
            float='left'
            variant="standard"
            value={payscale_from}
            onChange={(e)=>setPayscale_from(e.target.value)}
          />

            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="To"
            type="text"
            width='40%'
            float='right'
            variant="standard"
            value={payscale_to}
            onChange={(e)=>setPayscale_to(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  onClick={editJobs}>Update</Button>
        </DialogActions>
      </Dialog>



      <Row  className='px-5'>
     
        <Col style={{display:'flex',justifyContent:'center'}} className='px-5'>
    

          <Card sx={{ width: '50%',backgroundColor:'#D1DAE5 ' }}>
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <h5 style={{fontWeight:'bolder'}} >Job Experience and PayRange
          <ModeEditOutlineOutlinedIcon  onClick={handleClickOpen}
           style={{float:'right',margin:'10px',cursor:'pointer'}}/></h5>
          <br/>
        {joba &&( <>
        
         <h6><span style={{fontWeight:'bolder'}}>Experience Required : </span> 
         <span style={{color:'green',fontWeight:'bolder'}}>{joba.experience_from}</span> to {' '}
         <span style={{color:'green',fontWeight:'bolder'}}>{joba.experience_to}</span> years</h6>
        
         <h6><span style={{fontWeight:'bolder'}}>PayRange : </span> 
         <span style={{color:'green',fontWeight:'bolder'}}>{joba.payscale_from}</span> to {' '}
         <span style={{color:'green',fontWeight:'bolder'}}>{joba.payscale_to}</span> LPA</h6>
       
       
        </> )} 
        </Typography>
      </CardContent>
    </Card>
    
        
        </Col>
         
      </Row>
    </div>
  )
}

export default JobDetail2