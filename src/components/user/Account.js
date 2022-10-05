import React, { useState,useContext,useEffect }  from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import Button from '@mui/material/Button';  
import { useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//card imports 
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import avatar from '../../img/avatar2.png'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
//dialog imports
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//alert
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function Account() {
  const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  const [acc, setAcc] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [resume, setResume] = useState('')

  const [current_password, setCurrent_password] = useState('')
  const [new_password, setNew_password] = useState('')
  const [confirm_password, setConfirm_password] = useState('')

  const [alert, setAlert] = useState('')
  useEffect(() => {
   
    getResumeHandler()
    getHandler()
  }, [])
  
  //alert
  const [opena, setOpena] = React.useState(false);
    //error alert
    const [openb, setOpenb] = React.useState(false);


   //dialog
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };


   //dialog2
   const [openp, setOpenp] = React.useState(false);

  const handleClickOpenp = () => {
    setOpenp(true);
  };

  const handleClosep = () => {
    setOpenp(false);
  };

   //api call for edit acc details of user
  const editHandler=async(e)=>{
    await axios.patch(`user/edit_user/${authTokens.user_id}/`,{fname:fname,lname:lname},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        getHandler()
        handleClose()
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

   //api call for resseting password
   const passwordHandler=async(e)=>{
   
    await axios.post('user/change_password/',{

      current_password:current_password,
      new_password:new_password,
      confirm_password:confirm_password
    },
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"status")
        handleClosep()
        setAlert(response.data.detail)
          setOpena(true);
      
       
      }).catch((err)=>{
        setAlert(err.response.data.detail)
        setOpenb(true);
        handleClosep()
        console.log(err.response.data.detail,"erorr")
        
      })
    
  }


  //api call for getting acc details of user
  const getHandler=async(e)=>{
    await axios.get('user/get_user/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setAcc(response.data)
        setFname(response.data.first_name)
        setLname(response.data.last_name)
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

   //api call for getting resume of a candidate
   const getResumeHandler=async()=>{
    await axios.get(`user/get_resume/${authTokens.user_id}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"resuuumee")
            if(response.data.resume){
              setResume(response.data)
            }
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        setResume('nothing to show')
      })

  }

    //api call to update resume
    const handleSubmission=async(e)=>{
      console.log(selectedFile)
      const formData = new FormData();
      formData.append('resume', selectedFile);
  
      await axios.put('user/update_resume/',
     formData,
      {headers:{Authorization:`Bearer ${authTokens?.token}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
         console.log(response.data)
         if (response.status===200){
          getResumeHandler()
          setSelectedFile()
           console.log("success")
           
         }
       })  
       .catch((err)=>{
         console.log(err.response.data.detail,"erorr")
        console.log(formData)
       }) 
     
     }

       //onchange event 
    const changeHandler = (event) => {
      console.log(event.target.files[0].type,"kkk")
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    };

 //states for onchange event
 const [selectedFile, setSelectedFile] = useState();
 const [isFilePicked, setIsFilePicked] = useState(false)

  return (
    <div>
      <Dialog open={openp} onClose={handleClosep}>
        <DialogTitle>RESET PASSWORD</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e)=>setCurrent_password(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e)=>setNew_password(e.target.value)}
          />

<TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e)=>setConfirm_password(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosep}>CANCEL</Button>
          <Button onClick={passwordHandler}>RESET PASSWORD</Button>
        </DialogActions>
      </Dialog>

<Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        
        <DialogContent>
      
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            width='100%'
            variant="standard"
            label="First Name"
            value={fname}
            onChange={(e)=>setFname(e.target.value)}
          /><br/><br/>
             
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            width='100%'
            variant="standard"
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editHandler} >Update</Button>
        </DialogActions>
      </Dialog>



      <Row align='center' className='py-2 px-5'>
        <Col  style={{display:'flex',justifyContent:'center'}} className='px-5'>
       
        <Card  sx={{width:'50%', backgroundColor:'grey',disply:'flex',justifyContent:'center'}}> 
       
       
      <Box sx={{ width: '100%' }}>
      <Collapse in={opena}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpena(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      </Collapse>
      
    </Box>


    <Box sx={{ width: '100%' }}>
      <Collapse in={openb}>
        <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenb(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      </Collapse>
      
    </Box>

        <ModeEditOutlineOutlinedIcon   onClick={handleClickOpen}
           style={{float:'right',margin:'10px',cursor:'pointer'}}/> 
        <h3 className='mt-5'>PROFILE</h3>
        
         <CardContent>
        
          <div align='center'>
          <img  style={{height:'25%',width:'25%'}} src={avatar} />
          </div><br/><br/>
           <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>First Name:
           <span style={{fontWeight:'bold',color:'green'}} >{acc.first_name}</span>  
           </Typography>
          
           <Typography sx={{ mb: 1.5 }} color="text.secondary">Last Name:
           <span style={{fontWeight:'bold',color:'green'}} >{acc.last_name}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">Email:
           <span style={{fontWeight:'bold',color:'green'}} >{acc.email}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">Mobile:
           <span style={{fontWeight:'bold',color:'green'}} >{acc.mobile}</span> 
           </Typography><br/>
           <Button onClick={handleClickOpenp} style={{color:'rgba(9, 10, 90, 0.979)',border:'1px solid rgba(9, 10, 90, 0.979)'}}>RESET PASSWORD</Button>
         </CardContent>
   
   </Card> </Col> <br/></Row>

   <Row  align='center' className='py-2 px-5'>
   <Col   style={{display:'flex',justifyContent:'center'}} className='px-5'>
        <Card sx={{width:'50%', backgroundColor:'grey',disply:'flex',justifyContent:'center' }}>
        <h3 className='mt-5'>RESUME</h3>   
        <CardContent>{resume &&
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Resume : <span style={{fontWeight:'bold'}}>{resume.resume.slice(13)}</span><br/><br/>
             <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Upload new resume:
          </Typography>
            <Button style={{backgroundColor:'#ffff',color:'black'}} ><input type="file" name='resume' onChange={changeHandler}  required/></Button>
            {selectedFile  && 
        selectedFile.type == 'application/pdf' &&       
        <Button  onClick={handleSubmission} type='submit' variant="primary">Upload Resume</Button>}
          </Typography>}
        </CardContent>
        </Card>
        </Col>
      
      </Row>


      
       
     
     
    </div>
  )
}

export default Account