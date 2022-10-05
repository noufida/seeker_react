import { createContext,useState, useContext } from "react";
import { useNavigate} from 'react-router-dom'
import AuthContext from './authContext';
import axios from '../axios'

const EmpContext = createContext()

export default EmpContext;

export const EmpProvider = ({children})=>{

    const navigate = useNavigate()

    const {authTokens} = useContext(AuthContext)

    
  
    let contextData={
        
       
    }
    return(
        <EmpContext.Provider value={contextData}>
            {children}
        </EmpContext.Provider>
    )
}







