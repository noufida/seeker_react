import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './../user/login.css'
import { useState,useContext,useEffect } from 'react';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { Navigate, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';

function Jd() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline:0
      };

     //for getting id from url
  const params = useParams();
  let id=params.id

    const navigate = useNavigate()
  const {authTokens} =useContext(AuthContext)

  //states for onchange event
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false)

  //onchange event 
  const changeHandler = (event) => {
    console.log(event.target.files[0].type,"kkk")
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    //modal
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //api call to upload resume
  const handleSubmission=async(e)=>{
    console.log(selectedFile)
    const formData = new FormData();
		formData.append('jd', selectedFile);

    await axios.put(`employer/jobs/${id}/update_jd/`,
   formData,
    {headers:{Authorization:`Bearer ${authTokens?.token}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
         console.log("success")
         setOpen(true);
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"erorr")
      console.log(formData)
     }) 
   
   }


  return (
    <div>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Job Posted Successfully!!
          </Typography>
          <Button onClick={()=>navigate('/employer/myjobs')}>Go to Dashboard</Button>
        </Box>
      </Modal>


        <Row>
            <Col className='my-5' align='center' lg={12}>
            
            <Card className='m-5' style={{ width: '28rem',backgroundColor:'' }}>
       
      <Card.Body>
        <Card.Title>Upload a Job Description file </Card.Title><br/><br/>
        <Card.Text>
        <input type="file" name='resume' onChange={changeHandler}  required/>
        { isFilePicked ? (
            selectedFile.type !== 'text/plain' &&
            <div>
              <p style={{color:'red'}}>*upload a file in txt or plain format</p>
            </div>
        

          ) : (
          <p>Select a file to show details</p>
          )}
        </Card.Text>
        {selectedFile  && 
        selectedFile.type == 'text/plain' &&       
        <Button  onClick={handleSubmission} type='submit' variant="primary">Upload JD</Button>}
      </Card.Body>
      {selectedFile  && 
        selectedFile.type == 'application/pdf' &&  <Button style={{margin:'15px'}} onClick={()=>navigate('/jobs')} >Explore Jobs</Button>}
    </Card>

            </Col>
        </Row>
    </div>
  )
}

export default Jd