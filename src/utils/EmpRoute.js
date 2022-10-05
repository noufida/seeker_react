import {Outlet, Navigate} from 'react-router-dom'
import React, { useContext } from 'react';
import AuthContext from '../context/authContext';

function EmpRoute() {
    let {authTokens}=useContext(AuthContext)    

    return(
        authTokens ?
        (authTokens.is_staff ? <Outlet/> : 
        (authTokens.is_active ? <Navigate to="/nopermission" /> :  <Navigate to="/login" />) )
        :  <Navigate to="/login" />
    )
}

export default EmpRoute;