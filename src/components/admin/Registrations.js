import React,{useState,useEffect,useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Card from 'react-bootstrap/Card';

function Registrations() {
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()

    const [user, setUser] = useState([])
    const [comp, setComp] = useState('')

    useEffect(() => {
        getHandler()
    }, [])


       //api call for approving company
  const approveHandler=async(id)=>{
    console.log('kkk')
    await axios.patch(`employer/allow/${id}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            getHandler()
            console.log('success')
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }




    

    //api call for getting rthe job application
  const getHandler=async()=>{
    console.log('kkk')
    await axios.get('employer/regs/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            setUser(response.data)
            
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }


  
  return (
    <div>

<h1 className='m-5' >New Employer Requests</h1>
<Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Company</th>
          <th>Applicant Email</th>
          <th></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        {
            user.map((obj,key)=>
            <tr>
            <td>{key+1}</td>
            <td>{obj.company_name}</td>
            <td>{obj.user.email}</td>
            <td><Button onClick={()=>navigate(`/admin/company/${obj.user.id}`)}>View Details</Button></td>
            <td onClick={()=>approveHandler(obj.user.id)} style={{color:'green',cursor:'pointer'}}>Approve</td>
          </tr>
            )
        }
       
       
      </tbody>
    </Table>
        

    </div>
  )
}

export default Registrations