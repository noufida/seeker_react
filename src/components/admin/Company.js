import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import './../user/login.css'
import React,{useState,useEffect,useContext} from 'react'
import Table from 'react-bootstrap/Table';

function Company() {
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    const [comp, setComp] = useState([])
    
    useEffect(() => {
        getComHandler()
    }, [])


     //api call for getting company
 const patchHandler=async(a)=>{
    console.log('kkk')
    await axios.patch(`user/action/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            getComHandler()
           
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }


    
 //api call for getting company
 const getComHandler=async()=>{
    console.log('kkk')
    await axios.get('user/staff/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            setComp(response.data)
           
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }
  return (
    <div>
        <h1 className='m-5' >Employer Accounts</h1>
        <Table className='m-5' striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Registred email</th>
          <th>Registered mobile</th>
          <th>Last login</th>
          <th></th>
          <th>Take Action</th>
        </tr>
      </thead>
      <tbody>
        {
            comp.map((obj,key)=>
            <tr>
            <td>{key+1}</td>
            <td>{obj.email}</td>
            <td>{obj.mobile}</td>
            <td>{obj.last_login}</td>
            <td><Button onClick={()=>navigate(`/admin/company/${obj.id}`)}>View</Button></td>
            { obj.is_active ?  <td style={{color:'red',fontStyle:'italic',cursor:'pointer'}} onClick={()=>patchHandler(obj.id)}>Block</td> : 
             <td style={{color:'green',fontStyle:'italic',cursor:'pointer'}} onClick={()=>patchHandler(obj.id)}>Unblock</td>
            }
          </tr>
            )
        }
      
       
      </tbody>

    </Table>

    </div>
  )
}

export default Company