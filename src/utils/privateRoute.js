
import {Outlet, Navigate} from 'react-router-dom'
import React, { useContext } from 'react';
import AuthContext from '../context/authContext';



const PrivateRoute = () => {
    let {authTokens}=useContext(AuthContext)    

    return(
   
        authTokens ? <Outlet/>: <Navigate to="/login" />
    )
}
export default PrivateRoute;