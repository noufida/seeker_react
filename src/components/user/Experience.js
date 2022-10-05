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

import AuthContext from '../../context/authContext';
import axios from '../../axios'
import Button from '@mui/material/Button';  
import { useNavigate} from 'react-router-dom'

function Qualification() {
  const {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  
  //states for onchange events
  const [designation, setDesignation] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const [exp, setExp] = useState([])

  //states for form validation
  const [desigErr, setDesigErr] = useState('')
  const [companyErr, setCompanyErr] = useState('')
  const [descErr, setDescErr] = useState('')
  const [startErr, setStartErr] = useState('')
  const [endErr, setEndErr] = useState('')
  useEffect(() => {
    getHandler()
  }, [])
  
  const steps = [
    'Basic Details',
    'Add Qualifications',
    'Add Experiences',
    'Add Skills',
  ];

  //material ui for paper
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
      }));      
      const lightTheme = createTheme({ palette: { mode: 'light' } });

    
  //validation of form from frontend
  const formValidation=()=>{    
    
    const desigErr={}
    const companyErr ={}
    const descErr={}
    const startErr ={}
    const endErr={}
    let isValid = true

    //designation validation
    if (!designation){
      desigErr.short_fname = '*required field'
      isValid = false}

    //company validation
    if (!company){
      companyErr.short_lname = '*required field'
      isValid = false}

    //description validation
    if (!description){
      descErr.short_email= '*required field'
      isValid = false
    }

     //start validation
     if (!start){
      startErr.short_email= '*required field'
      isValid = false
    }

     //end validation
     if (!end){
      endErr.short_email= '*required field'
      isValid = false
    }

    

    setDesigErr(desigErr)
    setCompanyErr(companyErr)
    setDescErr(descErr)
    setStartErr(startErr)
    setEndErr(endErr)

    return isValid
  }
         

    //api call for adding experience
    const experienceHandler=async(e)=>{
      e.preventDefault()
      const isValid = formValidation()  
        if (isValid){
      await axios.post('user/experience/',{
        designation:designation,
        company:company,
        start:start,
        end:end,
        description:description
        },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"ok")
          getHandler()
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })}

    }


     //api call for getting experiences of candidate
    const getHandler=async(e)=>{
      await axios.get('user/get_experience/',
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"exp")
          setExp(response.data)
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })

    }


    //api call for deleting particular experience
    const deleteHandler=async(id)=>{
    await axios.delete(`user/experience/${id}`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
      if (response.status===200){
        console.log("deleted successfully")
        getHandler()
      }
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }
  var arr=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023]

  return (
    <div>
       

        <Grid  container spacing={2}><React.Fragment> 
      {[lightTheme].map((theme, index) => (
        <Grid  style={{margin:'auto',marginTop:'100px'}} item xs={7} key={index}>
          <ThemeProvider theme={theme}>
            
            {/*---- stepper ----*/}
          <Box sx={{ width: '100%',marginBottom:'40px'}}>
          <Stepper activeStep={2} alternativeLabel>
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
              <h5 style={{backgroundColor:'rgba(15, 15, 121, 0.363)',paddingLeft:'4px',lineHeight:'60px'}}>Experiences</h5>
                <TextField id="outlined-basic" label="Desination" variant="standard" onChange={(e)=>setDesignation(e.target.value)} />
                {Object.keys(desigErr).map((key)=>{
                  return <div style={{color:'red'}} >{desigErr[key]}</div>
                })}

                <TextField id="outlined-basic" label="Company" variant="standard" onChange={(e)=>setCompany(e.target.value)}/>
                {Object.keys(companyErr).map((key)=>{
                  return <div style={{color:'red'}} >{companyErr[key]}</div>
                })}
                
                <TextField id="outlined-basic" label="Description" variant="standard" onChange={(e)=>setDescription(e.target.value)}/>
                {Object.keys(descErr).map((key)=>{
                  return <div style={{color:'red'}} >{descErr[key]}</div>
                })}

            </Box>
            <Box
              sx={{
                p: 1,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '5fr 5fr' },
                gap: 3,
              }}
            >
             
        
         <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year of joining</InputLabel>
        <Select 
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-label"
          onChange={(e)=>setStart(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {arr.map((elevation) => (
               
                  <MenuItem value={elevation} elevation={elevation}>
                  {elevation}</MenuItem>
             
              ))}
        </Select>
        {Object.keys(startErr).map((key)=>{
                  return <div style={{color:'red'}} >{startErr[key]}</div>
                })}
      </FormControl>


      <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year of leaving</InputLabel>
        <Select 
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-label"
          onChange={(e)=>setEnd(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {arr.map((elevation) => (
               
                  <MenuItem value={elevation} elevation={elevation}>
                  {elevation}</MenuItem>
             
              ))}
        </Select>
        {Object.keys(endErr).map((key)=>{
                  return <div style={{color:'red'}} >{endErr[key]}</div>
                })}
      </FormControl>
                
            </Box><br/>
            <Button onClick={experienceHandler} style={{float:'right'}} variant="outlined">Add</Button>
          </ThemeProvider>
        </Grid>
        
      ))}


 {/*----- for displaying added qualification details -----  */}

<Grid  style={{margin:'auto',marginTop:'50px'}} item xs={7} >

  {
          exp.map((obj)=>
            <>
            
            <Card sx={{ minWidth: 275,backgroundColor:'grey' }}>
            <CloseButton aria-label="Hide" onClick={()=>deleteHandler(obj.id)} style={{float:'right'}} className='m-3' />
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
        <span style={{fontWeight:'bold',color:'green'}} >Designation:</span>  {obj.designation}
        </Typography>
       
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <span style={{fontWeight:'bold',color:'green'}} >Company:</span> {obj.company}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <span style={{fontWeight:'bold'}} >Description:</span> {obj.description}
        </Typography>
        <Typography variant="body2">
         Year of joining: {obj.start}
          <br />
          Year of leaving: {obj.end}
        </Typography>
      </CardContent>

</Card><br/>
            </>
          )
        }

<Button onClick={()=>navigate('/candidate/qualification')} style={{margin:'15px'}} variant="outlined">Previous</Button>
<Button onClick={()=>navigate('/candidate/skill')} style={{backgroundColor:'green',float:'right',margin:'15px'}} variant="contained">Next</Button>
  </Grid>
  
   </React.Fragment>
    
    </Grid>
    </div>
  )
}

export default Qualification