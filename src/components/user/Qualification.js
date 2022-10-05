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
  const [degree, setDegree] = useState('')
  const [college, setCollege] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  //states for form validation
  const [degErr, setDegErr] = useState('')
  const [collErr, setCollErr] = useState('')
  const [fromErr, setFromErr] = useState('')
  const [toErr, setToErr] = useState('')

  const [qual, setQual] = useState([])
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
    
        const degErr={}
        const collErr ={}
        const fromErr={}
        const toErr={}
        let isValid = true
    
        //degree validation
        if (!degree){
          degErr.short_fname = '*required field'
          isValid = false}
    
        //college validation
        if (!college){
          collErr.short_lname = '*required field'
          isValid = false}
    
        //from validation
        if (!from){
          fromErr.short_email= '*required field'
          isValid = false
        }

        //to validation
        if (!to){
          toErr.short_email= '*required field'
          isValid = false
        }
    
        
    
        setDegErr(degErr)
        setCollErr(collErr)
        setFromErr(fromErr)
        setToErr(toErr)
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


         

    //api call for adding qualification
    const qualificationHandler=async(e)=>{
      e.preventDefault()
      const isValid = formValidation()  
        if (isValid){
      await axios.post('user/qualification/',{
          degree:degree,
          college:college,
          joining_year:from,
          passout_year:to
        },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"ok")
          getHandler()
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })}

    }


     //api call for getting qualifications of candidate
    const getHandler=async(e)=>{
      await axios.get('user/get_qualification/',
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"qualifications")
          setQual(response.data)
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
          
        })

    }


    //api call for deleting particular qualification
    const deleteHandler=async(id)=>{
    await axios.delete(`user/qualification/${id}`,
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
          <Stepper activeStep={1} alternativeLabel>
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
              <h5 style={{backgroundColor:'rgba(15, 15, 121, 0.363)',paddingLeft:'4px',lineHeight:'60px'}}>Qualifications</h5>
                <TextField id="outlined-basic" label="Degree" variant="standard" onChange={(e)=>setDegree(e.target.value)} />
                {Object.keys(degErr).map((key)=>{
                  return <div style={{color:'red'}} >{degErr[key]}</div>
                })}
                
                <TextField id="outlined-basic" label="College/University" variant="standard" onChange={(e)=>setCollege(e.target.value)}/>
                {Object.keys(collErr).map((key)=>{
                  return <div style={{color:'red'}} >{collErr[key]}</div>
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
          onChange={(e)=>setFrom(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {arr.map((elevation) => (
               
                  <MenuItem value={elevation} elevation={elevation}>
                  {elevation}</MenuItem>
             
              ))}
        </Select>
        {Object.keys(fromErr).map((key)=>{
                  return <div style={{color:'red'}} >{fromErr[key]}</div>
                })}
      </FormControl>


      <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year of passing</InputLabel>
        <Select 
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-label"
          onChange={(e)=>setTo(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {arr.map((elevation) => (
               
                  <MenuItem value={elevation} elevation={elevation}>
                  {elevation}</MenuItem>
             
              ))}
        </Select>
        {Object.keys(toErr).map((key)=>{
                  return <div style={{color:'red'}} >{toErr[key]}</div>
                })}
      </FormControl>
                
            </Box><br/>
            <Button onClick={qualificationHandler} style={{float:'right'}} variant="outlined">Add</Button>
          </ThemeProvider>
        </Grid>
        
      ))}


 {/*----- for displaying added qualification details -----  */}

<Grid  style={{margin:'auto',marginTop:'50px'}} item xs={7} >

  {
          qual.map((obj)=>
            <>
            
            <Card sx={{ minWidth: 275,backgroundColor:'grey' }}>
            <CloseButton aria-label="Hide" onClick={()=>deleteHandler(obj.id)} style={{float:'right'}} className='m-3' />
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
        <span style={{fontWeight:'bold',color:'green'}} >Degree:</span>  {obj.degree}
        </Typography>
       
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <span style={{fontWeight:'bold',color:'green'}} >College/University:</span> {obj.college}
        </Typography>
        <Typography variant="body2">
         Year of joining: {obj.joining_year}
          <br />
          Year of joining: {obj.passout_year}
        </Typography>
      </CardContent>

</Card><br/>
            </>
          )
        }

<Button onClick={()=>navigate('/candidate/profile')} style={{margin:'15px'}} variant="outlined">Previous</Button>
<Button onClick={()=>navigate('/candidate/experience')} style={{backgroundColor:'green',float:'right',margin:'15px'}} variant="contained">Next</Button>
  </Grid>
  
   </React.Fragment>
    
    </Grid>
    </div>
  )
}

export default Qualification