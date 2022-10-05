import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import './../user/login.css'
import React,{useState,useEffect,useContext} from 'react'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//dialog
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline:0
  };

function Category() {

    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    const [location, setLocation] = useState([])
    const [locan, setLocan] = useState('')
    const [id, setId] = useState('')
    const [idd, setIdd] = useState()
    const [lo, setLo] = useState('')
    useEffect(() => {
      getHandler()
    }, [])

    //dialog2
    const [opend, setOpend] = React.useState(false);

    const handleClickOpend = () => {
      setOpend(true);
    };
  
    const handleClosed = () => {
      setOpend(false);
    };
  
    

    //dialog
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (obj) => {
    setId(obj.id)
    setLocan(obj.job_category)
    setOpen(true);
  };

  const handleClose = () => {
   
    getHandler()
    setOpen(false);
  };

  //modal
  const [openm, setOpenm] = React.useState(false);
  const handleOpenm = (id) => {
    setIdd(id)
    setOpenm(true);}
  const handleClosem = () => setOpenm(false);

  


        //api call for getting rthe job application
  const getHandler=async()=>{
    console.log('kkk')
    await axios.get('employer/category/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            setLocation(response.data)
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }


       //api call for adding loxation
       const addHandler=async()=>{
        console.log('kkk')
        await axios.post(`employer/category/`,{job_category:lo},
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"application")
          
                getHandler()
                handleClosed()
        
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
          })
    
      }



     //api call for editing loxation
     const editHandler=async()=>{
        console.log('kkk')
        await axios.patch(`employer/category/${id}/`, {job_category:locan},
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"application")
            if (response.status === 200) {
                console.log(response.data,"application")
                getHandler()
                handleClose()
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
          })
    
      }


         //api call for deleting loxation
     const deleteHandler=async(idd)=>{
        console.log('kkk')
        await axios.delete(`employer/category/${idd}/`, 
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"application")
      
                console.log(response.data,"application")
                getHandler()
                handleClosem()
         
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
          })
    
      }



  return (
    <div>
        
        <Dialog open={opend} onClose={handleClosed}>
        <DialogTitle>Add New</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Job Category"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setLo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosed}>Cancel</Button>
          <Button onClick={()=>addHandler()}>Add</Button>
        </DialogActions>
      </Dialog>



<Modal
        open={openm}
        onClose={handleClosem}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are you sure to delete?
          </Typography >
          <div style={{float:'right'}}>
          <Button className='m-3' onClick={()=>handleClosem()}>Cancel</Button>
          <Button className='m-3' onClick={()=>deleteHandler(idd)}>Delete</Button>
          </div>
      
        </Box>
      </Modal>


<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Job Category"
            type="text"
            fullWidth
            variant="standard"
            value={locan}
            onChange={(e)=>setLocan(e.target.value)}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>editHandler()}>Update</Button>
        </DialogActions>
      </Dialog>


        <Row>
            <Col>
            <h1 className='m-5' > Job Categories</h1>
            </Col>
        </Row>

        <Row>

            <Col  lg={10}>
                 <p onClick={()=>handleClickOpend()} style={{float:'right',cursor:'pointer'}}><AddCircleIcon/>{' '}Add New</p>
        <Table className='m-5' striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Location</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
            location.map((obj,key)=>
            <tr>
            <td>{key+1}</td>
            <td>{obj.job_category}</td>
            <td><EditIcon  onClick={()=>handleClickOpen(obj)} style={{color:'green',cursor:'pointer',fontSize:'medium'}}/></td>
            <td ><DeleteIcon onClick={()=>handleOpenm(obj.id)} style={{color:'red',fontSize:'medium'}}/></td>
          
          </tr>
            )
        }
      
       
      </tbody>

    </Table>
            </Col>
        </Row>

    </div>
  )
}

export default Category