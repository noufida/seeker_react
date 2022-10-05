import { createContext,useState, useEffect,useContext } from "react";
import { useNavigate} from 'react-router-dom'
import axios from '../axios'
import AuthContext from './authContext';

const JobContext = createContext()

export default JobContext;

export const JobProvider = ({children})=>{

    const {authTokens} = useContext(AuthContext)


    const [job, setJob] = useState([])
    

 
    
     //api call for getting skills of candidate
     const getJobHandler=async(e)=>{
        await axios.get('employer/jobs/').then((response)=>{
            console.log(response.data,"skills")
            setJob(response.data)
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }

       //api call for search
     const searchHandler=async(search)=>{
        await axios.get('employer/job_/?search=',{params:{search:search}},
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"qualifications")
            if (response.status === 200) {
                console.log(response.data,"search result")
                setJob(response.data)
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }

      

  
    let contextData={
        setJob:setJob,
        getJobHandler:getJobHandler,
        job:job,
       
    }
    return(
        <JobContext.Provider value={contextData}>
            {children}
        </JobContext.Provider>
    )
}