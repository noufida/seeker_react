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


function JobDetailJd() {



    const {authTokens} = useContext(AuthContext)
    const [jd, setJd] = useState([])
     //for getting id from url
    const params = useParams();
    let id=params.id

    useEffect(() => {
     console.log('hihi')
     getJobs()
    }, [])

   
    //dialog functions
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseD = () => {
        setOpen(false);
    };

    //states for onchange event
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false)
  
    //onchange event 
    const changeHandler = (event) => {
      console.log(event.target.files[0].type,"kkk")
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    };
  
    //api call to update resume
    const handleSubmission=async(e)=>{
      console.log(selectedFile)
      const formData = new FormData();
      formData.append('jd', selectedFile);
  
      await axios.put(`employer/jobs/${id}/update_jd/`,
     formData,
      {headers:{Authorization:`Bearer ${authTokens?.token}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
         console.log(response.data)
         if (response.status===200){

           console.log("successfully apdated jd")
           getJobs()
         }
       })  
       .catch((err)=>{
         console.log(err.response.data.detail,"erorr")
       }) 
     
     }
    
    const getJobs=async(e)=>{
        console.log("hello")
        await axios.get(`employer/jobs/${id}/jd/`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log('here is jd',response.data)
           if (response.status===200){
             setJd(response.data)
           }
         })  
         .catch((err)=>{
            console.log("kkkk")
           console.log(err.response.data.detail,"erorr")
          
         }) 
       
       }
    

  return (
    <div>


    <Row  className='px-5'>
     
     <Col style={{display:'flex',justifyContent:'center'}} className='px-5'>

     <Card sx={{ width: '50%',backgroundColor:'#D1DAE5 ' }}>
     
     <CardContent>
       <Typography variant="body2" color="text.secondary">
         <h5 style={{fontWeight:'bolder'}} >Job Description
         </h5>
         <br/>
        
       {
        jd.map((obj)=>
        <> <p>{obj}</p></>
        )
       }
      
      
      
       </Typography>
       <Button style={{backgroundColor:'#ffff',color:'black'}} ><input type="file" name='resume' onChange={changeHandler}  required/></Button>
       {selectedFile  &&     selectedFile.type=='text/plain'   &&
        <Button  onClick={handleSubmission} type='submit' variant="primary">Update</Button>}
     
     </CardContent>
   </Card>
        
   </Col></Row>


       
    </div>
  )
}

export default JobDetailJd