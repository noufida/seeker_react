import React, { useState,useContext,useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
//card imports 
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
//dropdown imports
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
//stepper imports
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
//close button
import CloseButton from 'react-bootstrap/CloseButton';
//chip imports
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import AuthContext from '../../context/authContext';
import axios from '../../axios'
import Button from '@mui/material/Button';  
import { useNavigate} from 'react-router-dom'


function Qualification() {
  const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  
  //states for onchange events
  const [skill, setSkill] = useState('')

  //state for form validation
  const [skillErr, setSkillErr] = useState('')

  const [skillset, setSkillset] = useState([])
  useEffect(() => {
    getHandler()
  }, [])
  
  const steps = [
    'Basic Details',
    'Add Qualifications',
    'Add Experiences',
    'Add Skills',
  ];

  //validation of form from frontend
  const formValidation=()=>{    
    
      const skillErr={}
      let isValid = true
  
      //designation validation
      if (!skill){
        skillErr.short_fname = '*add a skill'
        isValid = false}
 
  
        setSkillErr(skillErr)
  
      return isValid
    }

  //material ui for paper
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
      }));      
      const lightTheme = createTheme({ palette: { mode: 'light' } });


         

    //api call for adding skill
    const skillHandler=async(e)=>{
      e.preventDefault()
      const isValid = formValidation()  
        if (isValid){
      await axios.post('user/skill/',{
          skill:skill
        },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"ok")
          if (response.status===200){
            console.log("success")            
            getHandler()
          
          }
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })}

    }


     //api call for getting skills of candidate
    const getHandler=async(e)=>{
      await axios.get('user/get_skill/',
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"skills")
          setSkillset(response.data)
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })

    }


    //api call for deleting particular skill
    const deleteHandler=async(id)=>{
    await axios.delete(`user/skill/${id}`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
      if (response.status===200){
        console.log("deleted successfully")
        getHandler()
      }
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

  return (
    <div>
       

        <Grid  container spacing={2}><React.Fragment> 
      {[lightTheme].map((theme, index) => (
        <Grid  style={{margin:'auto',marginTop:'100px'}} item xs={7} key={index}>
          <ThemeProvider theme={theme}>
            
            {/*---- stepper ----*/}
          <Box sx={{ width: '100%',marginBottom:'40px'}}>
          <Stepper activeStep={3} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
     
            <Box
            
              sx={{
                p: 1,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '5fr ' },
                gap: 3,
              }}
            >
              <h5 style={{backgroundColor:'rgba(15, 15, 121, 0.363)',paddingLeft:'4px',lineHeight:'60px'}}>Skills</h5>
              
                <TextField id="outlined-basic" label="Skill" variant="outlined" onChange={(e)=>setSkill(e.target.value)} />
                {Object.keys(skillErr).map((key)=>{
                  return <div style={{color:'red'}} >{skillErr[key]}</div>
                })}
              
            </Box>
           <br/>
            <Button onClick={skillHandler} style={{float:'right'}} variant="outlined">Add</Button>
          
          </ThemeProvider>
        </Grid>
        
      ))}


 {/*----- for displaying added qualification details -----  */}

<Grid  style={{margin:'auto',marginTop:'50px'}} item xs={7} >

  {
          skillset.map((obj)=>
            <>
          
            <Chip label={obj.skill}/>
            <CloseButton aria-label="Hide" onClick={()=>deleteHandler(obj.id)} className='m-3' />
        <br/>
            </>
          )
        }

<Button onClick={()=>navigate('/candidate/experience')} style={{margin:'15px'}} variant="outlined">Previous</Button>
<Button onClick={()=>navigate('/candidate/resume')} style={{backgroundColor:'green',float:'right',margin:'15px'}} variant="contained">Next</Button>
  </Grid>
  
   </React.Fragment>
    
    </Grid>
    </div>
  )
}

export default Qualification