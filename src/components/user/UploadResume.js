import React, { useState,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UploadResume() {
  const navigate = useNavigate()
  const {authTokens} =useContext(AuthContext)

  //states for onchange event
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false)
  const [completed, setCompleted] = useState(false)

  //onchange event 
  const changeHandler = (event) => {
    console.log(event.target.files[0].type,"kkk")
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

  //api call to upload resume
  const handleSubmission=async(e)=>{
    console.log(selectedFile)
    const formData = new FormData();
		formData.append('resume', selectedFile);

    await axios.post('user/resume/',
   formData,
    {headers:{Authorization:`Bearer ${authTokens?.token}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
       console.log(response.data)
       if (response.status===200){
         console.log("success")
         setCompleted(true)
         
       }
     })  
     .catch((err)=>{
       console.log(err.response.data.detail,"erorr")
      console.log(formData)
     }) 
   
   }
  return (
    <div>
       <Row>
        <Col className='p-3'  lg={12}>
        <h2 style={{ color:'rgba(9, 10, 90, 0.979)' }}>You are almost there...</h2><br/>
        <Card style={{ width: '100%',backgroundColor:'' }}>
       
      <Card.Body>
        
        <Card.Title>Upload Your Resume</Card.Title><br/>
        <Card.Text>
        <input type="file" name='resume' onChange={changeHandler}  required/>
        { isFilePicked ? (
            selectedFile.type !== 'application/pdf' &&
            <div>
              <p style={{color:'red'}}>*only pdf format is supported</p>
            </div>
          // <div>
          //   <p>Filename: {selectedFile.name}</p>
          //   <p>Filetype: {selectedFile.type}</p>
          //   <p>Size in bytes: {selectedFile.size}</p>
          //   <p>
          //     lastModifiedDate:{' '}
          //     {selectedFile.lastModifiedDate.toLocaleDateString()}
          //   </p>
          //</div>

          ) : (
          <p style={{color:'grey'}}>*Select a file to show details</p>
          )}
        </Card.Text>
        {selectedFile  && 
        selectedFile.type == 'application/pdf' &&       
        <Button  onClick={handleSubmission} type='submit' variant="primary">Upload Resume</Button>}
      </Card.Body>
      {completed  && 
        
        <Button style={{margin:'15px'}} onClick={()=>navigate('/jobs')} >Start Exploring Jobs</Button>}
    </Card>
    <Button onClick={()=>navigate('/candidate/skill')} style={{margin:'15px'}} variant="dark">Previous</Button>

        </Col>
       </Row>
    </div>
  )
}

export default UploadResume