import { createContext,useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import axios from '../axios'
import axiosInstance from "../axios";




const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{

    const navigate = useNavigate()

    const [mobile, setMobile] = useState('')

      
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    
    const [values,setValues]= useState({
        email:"",
        password:""
    })
 
    //states for modal
    const [show, setShow] = useState(false);      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
     
  
       //api call for login functionality       
        const userLogin=async(e)=>{
         
          await axios.post('user/login/',{
             ...values
           }).then((response)=>{
             console.log(response.data,"kiki")
            if (response.data.token){
                console.log(response.data,"kiiiiii")
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.token))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                if (response.data.is_superuser==true){
                    navigate('/admin')
                }
                else{
                    navigate('')
                }
            }if (response.data.message){
                console.log(response.data.message)
                handleShow()

             
            }
       
           }) 
                
    }

    
    //api call for user logout
    let logoutUser = async()=>{

        await axiosInstance.post('user/logout/',).then((response)=>{
            console.log(response.data)
                
          }) 

        setAuthTokens(null)           
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

  
    let contextData={
        
        userLogin:userLogin,
        setValues:setValues,        
        logoutUser:logoutUser,        
        setMobile:setMobile,
        handleClose:handleClose,
        handleShow:handleShow,
        mobile:mobile,
        values:values,
        show:show,
        user:user,
        authTokens:authTokens,
       
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}