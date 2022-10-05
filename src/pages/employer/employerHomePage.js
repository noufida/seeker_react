import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerHome  from '../../components/employer/EmployerHome'
import './../user/loginpage.css'
import EmployerNav from '../../components/employer/EmployerNav';

function employerHomePage() {
  return (
   <>
      <EmployerNav/>
              
       <EmployerHome/>
       
 </>
  );
}

export default employerHomePage;