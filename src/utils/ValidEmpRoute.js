import {Outlet, Navigate} from 'react-router-dom'
import React, { useContext,useEffect,useState } from 'react';
import AuthContext from '../context/authContext';
import axios from '../axios'

function EmpRoute() {
        const [valid, setValid] = useState('')
        useEffect(() => {
            console.log('emprouting')
            validityHandler()
        }, [])

        let {authTokens}=useContext(AuthContext)    
        
      //api call for checking validity of subscription
      const validityHandler = async(e)=>{
        await axios.get('razorpay/validity/' ,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}}).then((response)=>{
            console.log(response.data,"validity")
            setValid(response.data)
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }
   

    return(
   
        authTokens.is_staff ? ( valid ? <Outlet/> : <Navigate to="/employer/plans" /> ) : 
        (authTokens.is_active ? <Navigate to="/nopermission" /> :  <Navigate to="/login" />)
    )
}

export default EmpRoute;