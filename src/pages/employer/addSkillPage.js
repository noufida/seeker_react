import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import AddSkill from '../../components/employer/AddSkill';

function AddSkillPage() {
  return (
   <>
      <EmployerNav/>
      <Row className='mt-5 pt-5 mx-2' >
       <Col lg={7}>        
       <AddSkill/>
       </Col>

      </Row>
 </>
  );
}

export default AddSkillPage;