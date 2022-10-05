import React,{useState,useContext} from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useLocation } from "react-router-dom";
import Rp from '../../img/rp.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Success from '../../img/success.jpeg'
//dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Navigate, useNavigate} from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Payment() {
  const navigate = useNavigate()
    const {authTokens} = useContext(AuthContext)
    const state  = useLocation();

  //dialog
    const [name, setName] = useState(state.state?.name);
  const [amount, setAmount] = useState(state.state?.amount);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /////

  // this function will handel payment when user submit his/her money
  // and it will confim if payment is successfull or not
    const handlePaymentSuccess = async (response) => {
        console.log('enter 2nd round')
      try {
        let bodyData = new FormData();
  
        // we will send the response we've got from razorpay to the backend to validate the payment
        bodyData.append("response", JSON.stringify(response));
  
        await axios({
          url: '/razorpay/payment/success/',
          method: "POST",
          data: bodyData,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization :`Bearer ${authTokens?.token}`
          },
        })
          .then((res) => {
            console.log("Everything is OK!");
            setName("");
            setAmount("");
             setOpen(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(console.error());
      }
    };


     // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };



  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount.toString());
    bodyData.append("name", name);

    const data = await axios.post('razorpay/pay/',
    bodyData,
     {headers:{Authorization:`Bearer ${authTokens?.token}`} } ).then((res) => {
        console.log(res)
      return res;
    })

     // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
        key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
        key_secret: process.env.REACT_APP_SECRET_KEY,
        amount: data.data.payment.amount,
        currency: "INR",
        name: "Org. Name",
        description: "Test teansaction",
        image: "", // add image url
        order_id: data.data.payment.id,
        handler: function (response) {
          // we will handle success by calling handlePaymentSuccess method and
          // will pass the response that we've got from razorpay
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
  }



  
  return (
<>


<Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
         
        </AppBar>
        <List className='mt-5' >
        
          <Divider />
         
            <div align='center' className='mt-5'>
            <img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6za68FJABL7HBvYc9BhHZlbPTC-em4sPFqFr2FSc&s' />
           <br/><br/> <h4 style={{color:'green'}}>Payment was successfull</h4>
           <br/><br/>  <Button onClick={()=>navigate('/employer/postjob')} style={{backgroundColor:'blue',color:'white'}}>Start Posting Jobs</Button>
            
            </div>
        
        </List>
      </Dialog>


    
    <Row  className='m-5 p-5'>
      <Col   lg={12}>
      <div className="container" style={{ marginTop: "15vh",width:'50%' }}>
      <form>
        <h1>Payment Details</h1><br/>
        <div className="form-group">
          <label htmlFor="name">Selected Plan</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={state.state?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div><br/>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Total Amount to pay (in Rs.)</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={state.state?.amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form><br/>
      <button  onClick={showRazorpay} className="btn btn-primary btn-block ">
        Pay with razorpay
      </button><br/><br/><hr style={{color:'black'}}></hr>
    </div>
      </Col>
      <Col  align='center' style={{ display:'flex',justifyContent:'center', alignItems:'center', marginTop: "10vh",width:'100%' }} lg={12}>
      <img src={Rp}/>
      </Col>
    </Row>
    </>
  )
}

export default Payment