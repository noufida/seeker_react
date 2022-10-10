import React,{useEffect,useContext,useState} from 'react'
import {useParams} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from '../../axios'
import AuthContext from '../../context/authContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate} from 'react-router-dom'
//dialog import
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './home.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';

function SingleJob() {
  const navigate = useNavigate()

  const {authTokens} = useContext(AuthContext)
  const [jobDetail, setJobDetail] = useState('')
  const [skill, setSkill] = useState([])
  const [check, setCheck] = useState(false)
  const [jd, setJd] = useState([])
  const [show, setShow] = useState(false);
  const [showW, setShowW] = useState(false);
  const [resume, setResume] = useState('')

  const [fav, setFav] = useState(false)

  const handleClose = () => {
    setShow(false);
   
  }
  const handleShow = () => setShow(true);
   

  const handleCloseW = () => {
    checkFavHandler()
    setShowW(false);
   
  }
  const handleShowW = () => setShowW(true);
   

  useEffect(() => {
   
    console.log("usefeffee")
    getDetailHandler()
    skillHandler()
    checkHandler()
    getResumeHandler()
    getJdHandler()
    checkFavHandler()
  }, [])

  //dialog functions
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseD = () => {
    setOpen(false);
  };
  
  //for getting id from url
  const params = useParams();
  let a=params.id

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


      //api call for getting jd of a job
      const getJdHandler=async()=>{
        console.log('ahooooooooy')
        await axios.get(`employer/jobs/${a}/jd/`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"qualifications")
            if (response.status === 200) {
              console.log('hello jd',response.data)
                setJd(response.data)
                
            }
            
           
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

  //api call for getting details about a job
  const getDetailHandler=async()=>{
    await axios.get(`employer/jobs/${a}`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"dhgtfhrjyhyjtd")
            setJobDetail(response.data)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

  //api call for checking whether appleid
  const checkHandler=async()=>{
    await axios.get(`user/job_appleid_or_not/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
      
        if (response.status === 200) {
            console.log(response.data,"check result")
            setCheck(response.data.appleid)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

    //api call for checking whether saved or not
    const checkFavHandler=async()=>{
      await axios.get(`user/job_fav_or_not/${a}/`,
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        
          if (response.status === 200) {
              console.log(response.data,"check result")
              setFav(response.data.appleid)
          }
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })
  
    }


  //api call for getting skills for a job
  const skillHandler=async()=>{
    await axios.get(`employer/jobs/${a}/skills`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"skillssss")
            setSkill(response.data)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

  //api call for applying for a job
  const applyHandler=async()=>{
    await axios.post(`user/apply_job/${a}/`,{},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"job appleid")
            handleShow()
            checkHandler()
            handleCloseD()
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        handleCloseD()
      })

  }

  

  //api call for fav a job
  const favHandler=async()=>{
    await axios.post(`user/fav_job/${a}/`,{},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"job fav")
            handleShowW()
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }
  return (
    <div>
       <Dialog 
        open={open}
        onClose={handleCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Contact Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Email : {authTokens.email}<br/>
            Phone : {authTokens.mobile}<hr/>
          </DialogContentText>
        </DialogContent>
        <DialogTitle id="alert-dialog-title">
          {"Resume"}
        </DialogTitle>
        <DialogContent>{resume &&
          <DialogContentText id="alert-dialog-description">
             Resume : {resume.resume.slice(13)}<br/>
             <DialogContentText style={{color:'black',fontWeight:'bold'}} id="alert-dialog-description">
            Upload new resume:
          </DialogContentText>
            <Button style={{backgroundColor:'#ffff',color:'black'}} ><input type="file" name='resume' onChange={changeHandler}  required/></Button>
            {selectedFile  && 
        selectedFile.type == 'application/pdf' &&       
        <Button  onClick={handleSubmission} type='submit' variant="primary">Upload Resume</Button>}
          </DialogContentText>}
        </DialogContent>
        <DialogActions className='m-2'>
          
          <Button onClick={handleCloseD} autoFocus>
            Cancel
          </Button>
          <Button  onClick={applyHandler}>Apply</Button>
        </DialogActions>
      </Dialog>

      <Modal show={showW} onHide={handleCloseW}>
       
        <Modal.Body>Saved Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseW}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congrats!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your application was sent to { jobDetail && jobDetail.company.company_name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col style={{display:'flex', flexDirection:'column',alignItems:'center'}} className='mt-5 mb-2 mx-5 px-5' >
        <Card  style={{border:'none',width:'60%'}}>
          <Card.Body>
            <Card.Title>{jobDetail.designation}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ jobDetail && jobDetail.category.job_category}</Card.Subtitle>
            <Card.Text>
            { jobDetail && jobDetail.company.company_name}
            </Card.Text>
            <Card.Text style={{color:'green'}}>
            Payscale: { jobDetail.payscale_from}-{ jobDetail.payscale_to} LPA
            </Card.Text>
            <Card.Text>
              {jobDetail && jobDetail.location.location}, {jobDetail.type}
            </Card.Text>
            
            {check ? <p style={{color:'blue'}}><FactCheckTwoToneIcon/> Resume Submitted</p> : <>
            <Button className='apply m-2' onClick={handleClickOpen}>Apply</Button>
            {fav ? 
            <Button className='save m-2'><BookmarkBorderIcon/>Saved</Button>
             : 
             <Button className='save m-2' onClick={favHandler}><BookmarkBorderIcon/>Save</Button>}
            
            </>}

          </Card.Body>
        </Card>
        </Col>
      </Row>

      <Row>
        <Col style={{display:'flex', flexDirection:'column',alignItems:'center'}} className='mx-5 px-5' >
        <Card  style={{border:'none',width:'60%'}}>
          <Card.Body>
            <Card.Title>Job Description</Card.Title>
           
            {
              jd.map((obj)=>
              <p>{obj}</p>
              )
            }
           

          </Card.Body>
        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SingleJob