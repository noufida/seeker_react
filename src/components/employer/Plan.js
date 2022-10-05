import React,{ useState,useContext,useEffect } from 'react';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { Navigate, useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Plan() {
    const navigate = useNavigate()
    const {authTokens} = useContext(AuthContext)
    const [plan, setPlan] = useState([])

    useEffect(() => {
      planHandler()
    }, [])
    
      //api call for getting category
      const planHandler = async(e)=>{     
         
        await axios.get('razorpay/plans',
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             setPlan(response.data)
             console.log("success")
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"error category")
        
         }) 
       
         
       }


        


  return (
    <div>
        <Row className='m-5 p-5'>
            <h3>PLANS</h3><br/><br/><br/><br/>
            {
                plan.map((obj)=>
                <>
                    <Col lg={3} className='mx-5 px-5 pb-5'>

                    <Card sx={{ width:'100%',color:'#ffff',backgroundColor:'rgba(9, 10, 120, 0.979)'}}>

                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    ₹ {obj.amount}
                    </Typography>
                    <Typography variant="body2" >
                    Valid for :  {obj.valid_days} days
                    </Typography>
                    </CardContent>
                    <CardActions>
                    
                    <Button onClick={()=>navigate('/employer/payment',{state:{name:obj.name,amount:obj.amount}})}
                     style={{color:'green',backgroundColor:'#ffff',fontWeight:'bolder'}} size="small">Select</Button>
                 
                    </CardActions>  <br/>
                    </Card>
                    </Col>
                
                
                </>
                )
            }
        
        </Row>
    </div>
  )
}

export default Plan