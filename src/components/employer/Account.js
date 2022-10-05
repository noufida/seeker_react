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


function Account() {
    const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()

    const [company_name, setCompany_name] = useState('')
    const [company_website, setCompany_website] = useState('')
    const [company_email, setCompany_email] = useState('')
    const [company_mobile, setCompany_mobile] = useState('')
    const [company_address, setCompany_address] = useState('')
    const [employee_count, setEmployee_count] = useState()

    const [plan, setPlan] = useState([])
    
    useEffect(() => {
      getHandler()
      planHandler()
    }, [])

     //dialog
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };


    //api call for edit acc details of user
  const editHandler=async(e)=>{
    await axios.patch('employer/emp_edit/',
    {company_name:company_name,
        company_website:company_website,
        company_email:company_email,
        company_mobile:company_mobile,
        company_address:company_address,
        employee_count:employee_count

},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        getHandler()
        handleClose()
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

    
  //api call for getting  details of company
  const getHandler=async(e)=>{
    await axios.get('employer/emp/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setCompany_name(response.data.company_name)
        setCompany_website(response.data.company_website)
        setCompany_email(response.data.company_email)
        setCompany_mobile(response.data.company_mobile)
        setCompany_address(response.data.company_address)
        setEmployee_count(response.data.employee_count)
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }


  //api call for getting  plan
  const planHandler=async(e)=>{
    await axios.get('razorpay/my_plan/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"exp")
        setPlan(response.data)
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

  return (
    <div>
        
        <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        
        <DialogContent>
      
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            label="Company Name"
            value={company_name}
            onChange={(e)=>setCompany_name(e.target.value)}
          /><br/><br/>
             
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company website"
            type="text"
            fullWidth
            variant="standard"
            value={company_website}
            onChange={(e)=>setCompany_website(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            label="Company Email"
            value={company_email}
            onChange={(e)=>setCompany_email(e.target.value)}
          /><br/><br/>
             
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company Mobile"
            type="number"
            fullWidth
            variant="standard"
            value={company_mobile}
            onChange={(e)=>setCompany_mobile(e.target.value)}
          />
            <br/><br/>
             
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company Address"
            type="text"
            fullWidth
            variant="standard"
            value={company_address}
            onChange={(e)=>setCompany_address(e.target.value)}
          />
            <br/><br/>
             
             <TextField
             autoFocus
             margin="dense"
             id="name"
             label="No. of Employees"
             type="number"
             fullWidth
             variant="standard"
             value={employee_count}
             onChange={(e)=>setEmployee_count(e.target.value)}
           />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editHandler} >Update</Button>
        </DialogActions>
      </Dialog>




<Row align='center' className='py-2 px-5 mt-5'>
        <Col  style={{display:'flex',justifyContent:'center'}} className='px-5'>
       
        <Card  sx={{width:'50%', backgroundColor:'grey',disply:'flex',justifyContent:'center'}}> 
       
    

        <ModeEditOutlineOutlinedIcon   onClick={handleClickOpen}
           style={{float:'right',margin:'10px',cursor:'pointer'}}/> 
        <h3 className='mt-5'>COMPANY</h3>
        
         <CardContent>
        
       <br/><br/>
           <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>Company Name : 
           <span style={{fontWeight:'bold',color:'green'}} > {company_name}</span>  
           </Typography>
          
           <Typography sx={{ mb: 1.5 }} color="text.secondary">Company website : 
           <span style={{fontWeight:'bold',color:'green'}} > {company_website}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">Company Email : 
           <span style={{fontWeight:'bold',color:'green'}} > {company_email}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">Company Mobile : 
           <span style={{fontWeight:'bold',color:'green'}} > {company_mobile}</span> 
           </Typography>
           
           <Typography sx={{ mb: 1.5 }} color="text.secondary">Compant Address : 
           <span style={{fontWeight:'bold',color:'green'}} > {company_address}</span> 
           </Typography>
           
           <Typography sx={{ mb: 1.5 }} color="text.secondary">Employee Count : 
           <span style={{fontWeight:'bold',color:'green'}} > {employee_count}</span> 
           </Typography><br/>
         </CardContent>
   
   </Card> </Col> <br/></Row>


 {
    plan.length>0 &&
    <>
    <Row align='center' className='py-2 px-5 mt-5'>
        <Col  style={{display:'flex',justifyContent:'center'}} className='px-5'>
       
        <Card  sx={{width:'50%', backgroundColor:'grey',disply:'flex',justifyContent:'center'}}> 
       
    


        <h3 className='mt-5'>MY PLAN</h3>
        
         <CardContent>
        
       <br/>
           <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>Plan Name :  
           <span style={{fontWeight:'bold',color:'green'}} > {plan.name}</span>  
           </Typography>
          
           <Typography sx={{ mb: 1.5 }} color="text.secondary">Price : 
           <span style={{fontWeight:'bold',color:'green'}} > Rs. {plan.amount}</span> 
           </Typography>

           <Typography sx={{ mb: 1.5 }} color="text.secondary">Validity : 
           <span style={{fontWeight:'bold',color:'green'}} >{plan.valid_days} days</span> 
           </Typography>

          
         </CardContent>
   
   </Card> </Col> <br/></Row>
    </>
 }  


    </div>
  )
}

export default Account