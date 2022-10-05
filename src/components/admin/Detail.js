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
import { useParams} from 'react-router-dom';


function Detail() {
    const {authTokens} = useContext(AuthContext)

    const [comp, setComp] = useState('')

    useEffect(() => {
        getComHandler()
    }, [])
    
  


    //for getting id from url
  const params = useParams();
  let id=params.id


      //api call for getting company
  const getComHandler=async()=>{
    console.log('kkk')
    await axios.get(`employer/emp_ad/${id}/`,
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
        <Row>
            <Col lg={12} className='m-5' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Card style={{ width: '50%' }}>
      <Card.Body>
        <Card.Title>{comp.company_name}</Card.Title><br/>
        <Card.Subtitle className="mb-2 text-muted">
            <span style={{color:'black'}}>Company Email: </span> {comp.company_email}</Card.Subtitle>
        <Card.Text>
         Company Website: {comp.company_website}
        </Card.Text>
        <Card.Text>
         Company Mobile:  {comp.company_mobile}
        </Card.Text>
        <Card.Text>
         Address:  {comp.company_address}
        </Card.Text>
        <Card.Text>
         Average Employee Count:  {comp.employee_count}
        </Card.Text>
        <Card.Text>
         Description:  {comp.description}
        </Card.Text>
      
        
      </Card.Body>
    </Card>
            </Col>
        </Row>
       

    </div>
  )
}

export default Detail