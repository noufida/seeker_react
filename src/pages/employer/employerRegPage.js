import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerReg  from '../../components/employer/EmployerReg'
import './../user/loginpage.css'

function employerReg() {
  return (
   <>
      
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={4}>        
       <EmployerReg/>
       </Col>

      </Row>
 </>
  );
}

export default employerReg;