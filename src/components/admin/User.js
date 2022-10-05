import React,{useState,useEffect,useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function User() {
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()

    const [user, setUser] = useState([])
    useEffect(() => {
      getHandler()
    }, [])

      //api call for getting company
 const patchHandler=async(a)=>{
    console.log('kkk')
    await axios.patch(`user/action/${a}/`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            getHandler()
           
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }

    
     //api call for getting company
 const getHandler=async()=>{
    console.log('kkk')
    await axios.get('user/users/',
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
        <Row>
            <Col lg={12}>
            <h1 className='m-5' >All Users</h1>
            <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Full Name</th>
          <th>email</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            user.map((obj,key)=>
            <tr>
            <td>{key+1}</td>
            <td>{obj.first_name }{' '}{obj.last_name}</td>
            <td>{obj.email}</td>
            <td>{obj.last_login}</td>
            {obj.is_active ? <td style={{color:'red',fontStyle:'italic',cursor:'pointer'}} onClick={()=>patchHandler(obj.id)}>Block</td> 
            : <td style={{color:'green',fontStyle:'italic',cursor:'pointer'}} onClick={()=>patchHandler(obj.id)}>Unblock</td>}
          </tr>
            )
        }
      
        
      </tbody>
    </Table>
            </Col>
        </Row>
       
    </div>
  )
}

export default User