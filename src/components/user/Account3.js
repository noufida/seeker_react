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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
//dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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
  

function Account3() {

    const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  const [exp, setExp] = useState([])

  const [designation, setDesignation] = useState('')
  const [company, setCompany] = useState('')
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [desc, setDesc] = useState('')
  //modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = (id) => {
    setD(id)
    setOpenM(true);}

  const handleCloseM = () => {
    setOpenM(false);
   
  }

  

  //dialog
  const [open, setOpen] = React.useState(false);
  const [d, setD] = useState('')
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
  await axios.delete(`user/experience/${d}/`,
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
  await axios.post('user/experience/',{
    designation:designation,
    company:company,
    start:start,
    end:end,
    description:desc
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
    await axios.get('user/get_experience/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setExp(response.data)
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }


  return (
    <div>


       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD EXPERIENCE</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designation"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setDesignation(e.target.value)}
          /><br/><br/>
          
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Company"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e)=>setCompany(e.target.value)}
        />
        <br/><br/>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Joining Year"
            type="number"
            variant="standard"
            onChange={(e)=>setStart(e.target.value)}
         style={{float:'left',width:'45%'}} />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Leaving Year"
            type="number"
            
            variant="standard"
            onChange={(e)=>setEnd(e.target.value)}
            style={{float:'right',width:'45%'}}  /><br/><br/><br/><br/>
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            variant="standard"
            fullWidth
            onChange={(e)=>setDesc(e.target.value)}
            /><br/><br/>
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
        <h3 className='mt-5'>EXPERIENCE</h3> 
        <AddIcon   
          className='m-3' style={{float:'right',margin:'10px',cursor:'pointer'}} onClick={handleClickOpen}/>    <br/><br/> 
           
         <CardContent>
         {
        exp.map((obj)=><>
        
           
       
         <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>Designation:
           <span style={{fontWeight:'bold',color:'green'}} >{obj.designation}</span>  
           </Typography>

           <Typography sx={{ mb: 1.5}} color="text.secondary" gutterBottom>Company:
           <span style={{fontWeight:'bold',color:'green'}} >{obj.company}</span>  
           </Typography>
          
           <Typography sx={{ mb: 1.5 }} color="text.secondary">From:
           <span style={{fontWeight:'bold',color:'green'}}  >{obj.start}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">To:
           <span style={{fontWeight:'bold',color:'green'}} >{obj.end}</span> 
           </Typography>
           <DeleteIcon  style={{float:'right',margin:'10px',cursor:'pointer'}} onClick={()=>handleOpenM(obj.id)}/>
 <br/><br/><hr/>
        </>)
       }
          
          
         </CardContent>
   
   </Card> </Col> <br/></Row>


    </div>
  )
}

export default Account3