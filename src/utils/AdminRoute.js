import {Outlet, Navigate} from 'react-router-dom'
import React, { useContext } from 'react';
import AuthContext from '../context/authContext';

function AdminRoute() {
    let {authTokens}=useContext(AuthContext)    

    return(
        authTokens ?
       ( authTokens.is_superuser ? <Outlet/>: 
        (authTokens.is_active ? <Navigate to="/nopermission" /> :  <Navigate to="/login" />) )
        :  <Navigate to="/login" />
    )

}

export default AdminRoute