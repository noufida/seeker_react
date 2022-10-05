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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
//dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
//dropdown
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { CardHeader } from '@mui/material';
//modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid blue',
  boxShadow: 24,
  p: 4,
  outline:0
};
  

function Account2() {

    const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  const [qua, setQua] = useState([])
  const [degree, setDegree] = useState('')
  const [college, setCollege] = useState('')
  const [joining_year, setJoining_year] = useState()
  const [passout_year, setPassout_year] = useState()
  
  //modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = (id) => {
    setDel(id)
    setOpenM(true);}

  const handleCloseM = () => {
    setOpenM(false);
   
  }

  

  //dialog
  const [open, setOpen] = React.useState(false);
  const [del, setDel] = useState('')
  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

useEffect(() => {
    getQHandler()
}, [])


//api call for deleting qualifications  of user
const deleteHandler=async(e)=>{
  await axios.delete(`user/qualification/${del}/`,
  {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
      console.log(response.data,"exp")
      handleCloseM()
      getQHandler()

    }).catch((err)=>{
      console.log(err.response.data.detail,"erorr")
      
    })

}


//api call for adding qualifications  of user
const addHandler=async(e)=>{
  await axios.post('user/qualification/',{
    degree:degree,
    college:college,
    joining_year:joining_year,
    passout_year:passout_year
  },
  {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
      console.log(response.data,"exp")
      handleClose()
      getQHandler()
    }).catch((err)=>{
      console.log(err.response.data.detail,"erorr")
      
    })

}




  //api call for getting qualifications  of user
  const getQHandler=async(e)=>{
    await axios.get('user/get_qualification/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setQua(response.data)
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }


  return (
    <div>


       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD QUALIFICATIONS</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Degree"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setDegree(e.target.value)}
          /><br/><br/>
          
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="College/University"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e)=>setCollege(e.target.value)}
        />
        <br/><br/>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Joining Year"
            type="number"
            variant="standard"
            onChange={(e)=>setJoining_year(e.target.value)}
         style={{float:'left',width:'45%'}} />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Passout Year"
            type="number"
            variant="standard"
            onChange={(e)=>setPassout_year(e.target.value)}
            style={{float:'right',width:'45%'}}  />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addHandler}>Add</Button>
        </DialogActions>
      </Dialog>



         <Modal
        open={openM}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* Text in a modal */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are You Sure to delete?
          </Typography><br/>

          <div style={{float:'right'}}>
          <Button onClick={()=>deleteHandler()} className='mx-3' variant="contained">YES</Button>{' '}
          <Button onClick={handleCloseM} variant="outlined">NO</Button>
          </div>
           
       
        </Box>
      </Modal>


      <Row align='center' className='py-2 px-5'>
        <Col  style={{display:'flex',justifyContent:'center'}} className='px-5'>
        <Card  sx={{width:'50%', backgroundColor:'grey',disply:'flex',justifyContent:'center'}}>   
        <h3 className='mt-5'>QUALIFICATIONS</h3> 
        <AddIcon   
          className='m-3' style={{float:'right',margin:'10px',cursor:'pointer'}} onClick={handleClickOpen}/>    <br/><br/> 
           
         <CardContent>
         {
        qua.map((obj)=><>
        
          
       
         <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>Degree:
           <span style={{fontWeight:'bold',color:'green'}} >{obj.degree}</span>  
           </Typography>

           <Typography sx={{ mb: 1.5}} color="text.secondary" gutterBottom>College/University:
           <span style={{fontWeight:'bold',color:'green'}} >{obj.college}</span>  
           </Typography>
          
           <Typography sx={{ mb: 1.5 }} color="text.secondary">From:
           <span style={{fontWeight:'bold',color:'green'}}  >{obj.joining_year}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">To:
           <span style={{fontWeight:'bold',color:'green'}} >{obj.passout_year}</span> 
           </Typography>
           <DeleteIcon  style={{float:'right',margin:'10px',cursor:'pointer'}} onClick={()=>handleOpenM(obj.id)}/>
           <br/><br/>
           <hr/>
        </>)
       }
          
          
         </CardContent>
   
   </Card> </Col> <br/></Row>


    </div>
  )
}

export default Account2